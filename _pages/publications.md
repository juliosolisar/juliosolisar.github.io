---
layout: page
permalink: /publications/
title: research
nav: true
nav_order: 2
---
<!-- _pages/research.md -->
<div class="publications">

<h1>Work in Progress</h1>

{% bibliography -f papers -q @misc %}

<h1>Published papers</h1>

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @article[year={{y}}]* %}
{% endfor %}


</div>
