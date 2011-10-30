---
layout: post
title: Reading events from Google Calendar with Ruby
---

The problem: We have a load of scheduled events which are currently duplicated
in two places. They are first entered in the shared Google calendar, and
secondly manually added to the events page at
[highimpactcareers.org/events](http://www.highimpactcareers.org/events). Additionally, past events must be
manually moved to the [highimpactcareers.org/events/past-events](http://www.highimpactcareers.org/events/past-events) page.
Sad times.

The solution: Enter events once in Google calendar and use the API to retrieve
events and wrap them in appropriate HTML containers.

The Google calendar API provides [detailed
documentation](http://code.google.com/apis/calendar/) but our requirements are
pretty simple.  We don't need fancy authentication as we're parsing events from
a publicly available calendar, and we don't need to worry about creating,
updating, or deleting records. We just need to retrieve two sets of events:

* All events in the past for the past events page 
* All events in the future for the main events page

First thing to do, grab the URL of the public feed for the calendar
from the calendar settings page. This will be something similar to

{% highlight bash %}
http://www.google.com/calendar/feeds/calendar_name/public/full
{% endhighlight %}

If you send an HTTP GET request to this URL you get XML returned containing
every event ever on your calendar:

{% highlight bash %}
curl -s http://www.google.com/calendar/feeds/highimpactcareers.org_qcqkfcstjrlomg5qdtf48vag8c%40group
        .calendar.google.com/public/full
{% endhighlight %}

An example feed is given in the [Google calendar API reference](http://code.google.com/apis/calendar/data/2.0/developers_guide_protocol.html#RetrievingEvents).

By specifying parameters in the URL you can specify which events you
want to be returned.  For example, to get all future events, add the string
"?futureevents=true" to the end of the URL.  Many more examples are given in
the [Google calendar
documentation](http://code.google.com/apis/calendar/data/2.0/reference.html#Parameters).

{% highlight bash %}
curl -s http://www.google.com/calendar/feeds/highimpactcareers.org_qcqkfcstjrlomg5qdtf48vag8c%40group
        .calendar.google.com/public/full?futureevents=true
{% endhighlight %}

We want to parse the XML output of this call, pull out pertinent event details,
and display them. We're going to use components of the Ruby standard library to
do this, namely
[net/http](http://ruby-doc.org/stdlib-1.9.2/libdoc/net/http/rdoc/Net/HTTP.html)
to communicate with Google calendar, and
[REXML](http://www.germane-software.com/software/rexml/docs/tutorial.html)
to do the XML parsing.

{% highlight ruby %}
require 'net/http'
require 'rexml/document'

url = 'http://www.google.com/calendar/feeds/highimpactcareers.org_qcqkfcstjrlomg5qdtf48vag8c%40group
       .calendar.google.com/public/full'

# get all future events, ordered by start time
url = url + "?futureevents=true&orderby=starttime"

xml_data = Net::HTTP.get_response(URI.parse(url)).body
doc = REXML::Document.new( xml_data )

titles = []
content = []
doc.elements.each('feed/entry/title'){ |e| titles << e.text }
doc.elements.each('feed/entry/content'){ |e| content << e.text }

#print all events
titles.each_with_index do |title, idx|
  puts "Title: " + title + "\n\n"
  puts content[idx]
  puts "\n----\n\n"
end
{% endhighlight %}

Job done. If you want to display all past events, then you need to set the "start-max" parameter to be today's date:

{% highlight ruby %}
d = Date.today.rfc3339
url = url + '?start-max=' + d
{% endhighlight %}

