---
layout: post
title: Thinkpad x100e webcam in Linux
---

So it seems that x100e webcam is a 0.3 megapixel USB connected camera, that can
be read from using the v4l2 api:
<a href="http://www.thinkwiki.org/wiki/Integrated_camera"> http://www.thinkwiki.org/wiki/Integrated_camera</a>

To get up and running you'll need to install libv4l and a program for capturing
video, such as mplayer.  Use your favourite package manager:

{% highlight bash %}
pacman -S libv4l mplayer
{% endhighlight %}

The webcam appears on my machine as `/dev/video0` and the output can be viewed
using mplayer as follows: 

{% highlight bash %}
sudo mplayer tv:// -tv driver=v4l2:device=/dev/video0 
{% endhighlight %}

and to record video:
{% highlight bash %}
sudo mencoder tv:// -tv driver=v4l2:device=/dev/video0 -nosound -ovc lavc -o blah.avi
{% endhighlight %}

