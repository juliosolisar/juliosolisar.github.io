class CvViewTabs {
  constructor(root) {
    this.root = root;
    this.tabs = [...root.querySelectorAll("[data-cv-tab]")];
    this.panels = [...root.querySelectorAll("[data-cv-panel]")];

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => this.activate(tab.dataset.cvTab));
      tab.addEventListener("keydown", (event) => this.handleKeydown(event));
    });

    document.addEventListener("click", (event) => {
      const link = event.target instanceof Element ? event.target.closest('#toc-sidebar a[href^="#"]') : null;
      if (link) this.activateForHash(link.hash);
    });

    window.addEventListener("hashchange", () => this.activateForHash(window.location.hash));
    this.activateForHash(window.location.hash);
  }

  activate(name, { focus = false } = {}) {
    this.tabs.forEach((tab) => {
      const selected = tab.dataset.cvTab === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });

    this.panels.forEach((panel) => {
      panel.hidden = panel.dataset.cvPanel !== name;
    });
  }

  activateForHash(hash) {
    if (!hash || hash === "#") return;

    let target;
    try {
      target = document.querySelector(hash);
    } catch (_error) {
      return;
    }

    if (target && this.root.querySelector('[data-cv-panel="html"]')?.contains(target)) {
      this.activate("html");
    }
  }

  handleKeydown(event) {
    const currentIndex = this.tabs.indexOf(event.currentTarget);
    let nextIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % this.tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = this.tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.activate(this.tabs[nextIndex].dataset.cvTab, { focus: true });
  }
}

document.querySelectorAll("[data-cv-tabs]").forEach((root) => new CvViewTabs(root));
