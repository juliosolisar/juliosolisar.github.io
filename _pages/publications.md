---
layout: page
permalink: /research/
title: research
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

<h2 class="bibliography">Work in Progress</h2>

{% bibliography --query @*[status=wip] %}

<h2 class="bibliography">Project Development</h2>

{% bibliography --query @*[status=pd] %}

<h2 class="bibliography">COVID-19 Collaborative Projects</h2>

{% bibliography --query @*[status=published] %}

{% bibliography --query @*[status=wp] %}

</div>
