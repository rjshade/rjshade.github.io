---
layout: post
title: GNU screen
---

<div class="img_shadow">
<a href="/content/files/blog/2010/03/24/full/gnu_screen.png">
<img class="page_width" src="/content/files/blog/2010/03/24/gnu_screen.png" />
</a>
</div>


GNU screen is essentially a terminal window-manager, allowing you to run multiple shells inside one process, and to switch between them.
A running screen session can be detached from a given terminal session, and reattached elsewhere, maintaining the state of the shells contained within it (and any processes running inside these shells continue to run while detached). 
Imagine ssh-ing to a remote machine, starting an expensive process, getting 90% done and then your connection dies.
A standard process will die when the connection is severed but if you were running inside screen it would happily continue, allowing you to reattach the screen session when you are next connected.
One use of this is to run a command line bittorrent client, rtorrent for example, inside a screen session on a remote machine. You can then login remotely, reattach the screen session and see how your (entirely legal) downloads are progressing.

#Using screen

To start screen:

{% highlight bash %}
    $ screen
{% endhighlight %}

or to create a session named 'foo'
{% highlight bash %}
    $ screen -S foo
{% endhighlight %}
    
Basic commands once inside screen: 
{% highlight bash %}
    Ctrl-a c - create a new window (shell)
    Ctrl-a n - move to the next window
    Ctrl-a p - move to the previous window
    Ctrl-a d - detach the screen session
{% endhighlight %}

To reattach a screen session named foo:
{% highlight bash %}
    $ screen -r foo
{% endhighlight %}
    
#Customising with screenrc
Screen is customisable through the ~/.screenrc file which is read on startup.
A typical screenrc is as follows, and should result in a nice status bar along the bottom as shown in the screenshot.
{% highlight bash %}
    # displays a status bar at the bottom of the screen
    # showingwith window names, time, and date     
    caption always "%{= b}%-w%{= G}%n %t%{-}%+w %-=%{G}%c %D, %d %M, %Y "
    # takes the current program title from zsh preexec
    shelltitle "$ |zsh"
    # disable splash screen
    startup_message off
    # big scrollback buffer
    defscrollback 10000
    # detach on hangup (on by default)
    autodetach on
    # switching between screen windows (default ctrl-a n, ctrl-a p)
    # note: determined keycodes with 'read'
    bindkey ^[[d prev # previous with shift-Left arrow
    lbindkey ^[[c next # next with shift-Right arrow
    bindkey ^[H prev # previous with alt-shift-h
    bindkey ^[L next # next with alt-shift-l
{% endhighlight %}

This results in each screen session having a status line at the bottom  displaying window names and the date and time. 
The current window name  is highlighted in green.
The defined keyboard shortcuts allow you to  use the screen session in the same way as you might use a tabbed  terminal application -- shift-left and shift-right to move between screens -- but on any machine, local or remote, and all inside your shell.

#Further information 
<a href="http://www.gnu.org/software/screen/">gnu.org/software/screen</a>

<a href="http://en.wikipedia.org/wiki/GNU_Screen">GNU Screen at Wikipedia</a>

and of course Googling for screenrc will bring you lots more examples...

