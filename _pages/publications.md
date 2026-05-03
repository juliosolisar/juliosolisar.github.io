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

<h2 class="bibliography">Working Papers</h2>

{% bibliography --query @*[status=wp] %}

<h2 class="bibliography">Publications</h2>

{% bibliography --query @*[status=published] %}

</div>
