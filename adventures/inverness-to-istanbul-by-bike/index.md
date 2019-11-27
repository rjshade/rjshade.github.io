---
layout: default
title: Inverness to Istanbul by bike
---

# {{ page.title }}

In 2012 I was in work visa limbo. I had accepted an offer to [work at
Google](/work), but my H1-B visa only became valid in October of that year. To
pass the time before I could ship up to Boston, I decided to get on my bike and
see how far I could cycle. Ultimately I made it from Inverness, Scotland, to
Istanbul, Turkey, over 100 days.

<ul>
{% for post in site.categories.inverness-to-istanbul-by-bike %}
<li><a href="{{ post.url }}">{{ post.date | date: '%B %d, %Y' }} &raquo; {{ post.title }}</a></li>
{% endfor %}
</ul>
