## Explanation

On mobile devices, the NavBar is generally used to display the current page and to perform routing operations at the top of the page. STDF's NavBar consists of three parts: left, center, and right, and each part supports Snippet rendering. The class of the outermost element also supports injClass (class injection).

## Extension

The existing parameters are sufficient to meet most business scenarios. For example, the common scene of changing the transparency of the NavBar background and text color based on the scrolling of the page can be achieved through injClass. If you are still not satisfied with your needs, combining Snippet and injClass, theoretically the NavBar can be customized to any style you want, not only for use as a top navigation bar.

It should be noted that this extension only provides a method and idea. Too much customization may already be more complex than writing a component yourself, and may lose the meaning of using a component library.
