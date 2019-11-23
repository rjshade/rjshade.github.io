---
layout: default
title: chromecast
---

# Chromecast photos
A handful of my photos are periodically displayed on Chromecast's default
background slideshow mode (it cycles through photos when not actively in use).
They also appear on Google/Nest Home Hub devices.

Below are the photos which I believe are in the Chromecast screensaver rotation
as of 2019:

<div class="post">
  <div class="photo-grid" id="photo-grid">
    {% assign chromecast_photos = site.photos | where: "chromecast-2019", "true" %}
    {% for photo in chromecast_photos %}
      {% include photo_thumbnail.html photo=photo %}
    {% endfor %}
  </div>
</div>

These photos used to be displayed but I haven't seen them appear for a while:

<div class="post">
  <div class="photo-grid" id="photo-grid">
    {% assign chromecast_photos = site.photos | where: "chromecast-archive", "true" %}
    {% for photo in chromecast_photos %}
      {% include photo_thumbnail.html photo=photo %}
    {% endfor %}
  </div>
</div>
