---
layout: post
title: Identifying output stream type
---

The default output of the `ls` command is one line with space separated results. Pipe the output into `cat` and you find that each entry appears on its own line. This is why `ls | wc -l` doesn't just return 1 and you can do things like `ls | head -n 5`.

What devilry is this? Surely what happens to a program's output is up to the shell? Actually not quite - there is a system call `isatty` which returns true if the file descriptor passed to it is a terminal and false otherwise. By getting the file descriptor for `stdout` or `stderr` you can use this to behave differently depending on where the output is going.

Here's it is in action - note that you need to use `fileno` to get an integer descriptor of the output stream before passing it to `isatty`:

{% highlight cpp %}

#include <unistd.h>
#include <stdio.h>

int main()
{
    int fd = fileno( stdout );

    int ret = isatty( fd );

    if( ret )
    { fprintf(stderr, "Terminal output...\n"); }
    else
    { fprintf(stderr, "Pipes ahoy!\n"); }
}

{% endhighlight %}

If this hasn't satisfied your unhealthy appetite for file streams and
descriptors, then you can gorge yourself here:
<a href="http://www.ginac.de/~kreckel/fileno/">http://www.ginac.de/~kreckel/fileno/</a>
