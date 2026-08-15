import { GlobalWorkerOptions, RenderingCancelledException, getDocument } from "../pdfjs/pdf.min.mjs";

GlobalWorkerOptions.workerSrc = new URL("../pdfjs/pdf.worker.min.mjs", import.meta.url).href;

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

class CvPdfViewer {
  constructor(root) {
    this.root = root;
    this.pdfUrl = root.dataset.pdfUrl;
    this.pdfjsBaseUrl = root.dataset.pdfjsBaseUrl;
    this.viewport = root.querySelector("[data-pdf-viewport]");
    this.pagesContainer = root.querySelector("[data-pdf-pages]");
    this.loading = root.querySelector("[data-pdf-loading]");
    this.loadingText = root.querySelector("[data-pdf-loading-text]");
    this.error = root.querySelector("[data-pdf-error]");
    this.pageStatus = root.querySelector("[data-pdf-page-status]");
    this.controls = [...root.querySelectorAll("[data-pdf-action]")];
    this.zoomMultiplier = 1;
    this.currentPage = 1;
    this.renderGeneration = 0;
    this.renderTasks = [];
    this.resizeTimer = null;
    this.lastViewportWidth = 0;

    this.root.querySelector('[data-pdf-action="zoom-out"]').addEventListener("click", () => this.changeZoom(-0.15));
    this.root.querySelector('[data-pdf-action="zoom-in"]').addEventListener("click", () => this.changeZoom(0.15));
    this.root.querySelector('[data-pdf-action="fit"]').addEventListener("click", () => this.fitWidth());
    this.viewport.addEventListener("scroll", () => this.updateCurrentPage(), { passive: true });

    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        if (width === this.lastViewportWidth) return;
        this.lastViewportWidth = width;
        this.scheduleRender();
      });
    } else {
      window.addEventListener("resize", () => this.scheduleRender(), { passive: true });
    }

    this.load();
  }

  async load() {
    try {
      const loadingTask = getDocument({
        url: this.pdfUrl,
        cMapUrl: `${this.pdfjsBaseUrl}cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `${this.pdfjsBaseUrl}standard_fonts/`,
        // Safari has had intermittent OffscreenCanvas PDF rendering defects.
        // This viewer only renders three pages, so the main-thread canvas path
        // is a small and worthwhile compatibility tradeoff.
        isOffscreenCanvasSupported: false,
        isEvalSupported: false,
      });

      loadingTask.onProgress = ({ loaded, total }) => {
        if (total > 0) {
          this.loadingText.textContent = `Loading CV… ${Math.round((loaded / total) * 100)}%`;
        }
      };

      this.pdf = await loadingTask.promise;
      this.controls.forEach((control) => {
        control.disabled = false;
      });
      this.lastViewportWidth = Math.round(this.viewport.getBoundingClientRect().width);
      this.resizeObserver?.observe(this.viewport);
      await this.renderDocument();
    } catch (error) {
      console.error("Unable to initialize the CV PDF viewer", error);
      this.showError();
    }
  }

  async renderDocument({ preservePage = false } = {}) {
    if (!this.pdf || this.viewport.clientWidth === 0) return;

    const pageToRestore = preservePage ? this.currentPage : 1;
    const generation = ++this.renderGeneration;

    this.renderTasks.forEach((task) => task.cancel());
    this.renderTasks = [];
    this.pagesContainer.replaceChildren();
    this.pagesContainer.hidden = false;
    this.loading.hidden = false;
    this.error.hidden = true;

    try {
      const horizontalPadding = 32;
      const availableWidth = Math.max(this.viewport.clientWidth - horizontalPadding, 100);

      for (let pageNumber = 1; pageNumber <= this.pdf.numPages; pageNumber += 1) {
        if (generation !== this.renderGeneration) return;
        const page = await this.pdf.getPage(pageNumber);
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = (availableWidth / unscaledViewport.width) * this.zoomMultiplier;
        await this.renderPage(page, pageNumber, scale, generation);
      }

      if (generation !== this.renderGeneration) return;

      this.loading.hidden = true;
      this.root.dataset.pdfState = "ready";
      this.currentPage = pageToRestore;
      this.updateStatus();

      if (preservePage && pageToRestore > 1) {
        const restoredPage = this.pagesContainer.querySelector(`[data-page-number="${pageToRestore}"]`);
        if (restoredPage) this.viewport.scrollTop = restoredPage.offsetTop - 16;
      }
    } catch (error) {
      if (error instanceof RenderingCancelledException || generation !== this.renderGeneration) return;
      console.error("Unable to render the CV PDF", error);
      this.showError();
    }
  }

  async renderPage(page, pageNumber, scale, generation) {
    const pageViewport = page.getViewport({ scale });
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    const pageElement = document.createElement("div");
    const canvas = document.createElement("canvas");
    const annotationLayer = document.createElement("div");
    const accessibleText = document.createElement("span");

    pageElement.className = "cv-pdf-page";
    pageElement.dataset.pageNumber = pageNumber;
    pageElement.setAttribute("role", "group");
    pageElement.setAttribute("aria-label", `Page ${pageNumber} of ${this.pdf.numPages}`);
    pageElement.style.width = `${Math.floor(pageViewport.width)}px`;
    pageElement.style.height = `${Math.floor(pageViewport.height)}px`;

    canvas.width = Math.floor(pageViewport.width * outputScale);
    canvas.height = Math.floor(pageViewport.height * outputScale);
    canvas.style.width = `${Math.floor(pageViewport.width)}px`;
    canvas.style.height = `${Math.floor(pageViewport.height)}px`;
    canvas.setAttribute("aria-hidden", "true");

    annotationLayer.className = "cv-pdf-annotation-layer";
    annotationLayer.setAttribute("aria-label", `Links on page ${pageNumber}`);

    accessibleText.className = "sr-only";
    accessibleText.textContent = (await page.getTextContent()).items.map((item) => ("str" in item ? item.str : "")).join(" ");

    pageElement.append(accessibleText, canvas, annotationLayer);
    this.pagesContainer.append(pageElement);

    const renderTask = page.render({
      canvasContext: canvas.getContext("2d", { alpha: false }),
      transform: outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0],
      viewport: pageViewport,
    });
    this.renderTasks.push(renderTask);
    await renderTask.promise;

    if (generation !== this.renderGeneration) return;
    const annotations = await page.getAnnotations({ intent: "display" });
    this.renderLinks(annotations, annotationLayer, pageViewport);
  }

  renderLinks(annotations, layer, pageViewport) {
    annotations.forEach((annotation) => {
      if (annotation.subtype !== "Link" || !annotation.url || !annotation.rect) return;

      const [x1, y1] = pageViewport.convertToViewportPoint(annotation.rect[0], annotation.rect[1]);
      const [x2, y2] = pageViewport.convertToViewportPoint(annotation.rect[2], annotation.rect[3]);
      const link = document.createElement("a");
      link.href = annotation.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", annotation.titleObj?.str || `Open ${annotation.url}`);
      link.style.left = `${Math.min(x1, x2)}px`;
      link.style.top = `${Math.min(y1, y2)}px`;
      link.style.width = `${Math.abs(x2 - x1)}px`;
      link.style.height = `${Math.abs(y2 - y1)}px`;
      layer.append(link);
    });
  }

  changeZoom(delta) {
    this.zoomMultiplier = clamp(Number((this.zoomMultiplier + delta).toFixed(2)), 0.55, 2.5);
    this.renderDocument({ preservePage: true });
  }

  scheduleRender() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.renderDocument({ preservePage: true }), 180);
  }

  fitWidth() {
    if (this.zoomMultiplier === 1) return;
    this.zoomMultiplier = 1;
    this.renderDocument({ preservePage: true });
  }

  updateCurrentPage() {
    const viewportCenter = this.viewport.scrollTop + this.viewport.clientHeight / 2;
    const pages = [...this.pagesContainer.querySelectorAll("[data-page-number]")];
    if (pages.length === 0) return;

    const nearestPage = pages.reduce(
      (nearest, page) => {
        const center = page.offsetTop + page.offsetHeight / 2;
        return Math.abs(center - viewportCenter) < Math.abs(nearest.center - viewportCenter)
          ? { center, number: Number(page.dataset.pageNumber) }
          : nearest;
      },
      { center: Number.POSITIVE_INFINITY, number: 1 }
    );

    if (nearestPage.number !== this.currentPage) {
      this.currentPage = nearestPage.number;
      this.updateStatus();
    }
  }

  updateStatus() {
    const zoomPercent = Math.round(this.zoomMultiplier * 100);
    this.pageStatus.textContent = `Page ${this.currentPage} of ${this.pdf.numPages} · ${zoomPercent}%`;
  }

  showError() {
    this.root.dataset.pdfState = "error";
    this.loading.hidden = true;
    this.pagesContainer.hidden = true;
    this.error.hidden = false;
    this.pageStatus.textContent = "Viewer unavailable";
    this.controls.forEach((control) => {
      control.disabled = true;
    });
  }
}

document.querySelectorAll(".cv-pdf-viewer[data-pdf-url]").forEach((root) => new CvPdfViewer(root));
