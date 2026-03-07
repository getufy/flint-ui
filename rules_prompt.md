


We are currently writing a lit component. This component will be used by hundreds of people in different projects. Look into folder named "Visually Hidden" and update the component, the css file, the story and test files. Create, refine stories and tests. Look into theme.css or theme-dark.css for variables or add variables there.


We are currently writing a lit component. This component will be used by hundreds of people in different projects. Create a folder named "Visually Hidden" and create the component, the css file, the story and test files. Create, refine stories and tests. Look into theme.css or theme-dark.css for variables or add variables there.




Visually Hidden
<sl-visually-hidden> | SlVisuallyHidden
 
The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.

According to The A11Y Project, “there are real world situations where visually hiding content may be appropriate, while the content should remain available to assistive technologies, such as screen readers. For instance, hiding a search field’s label as a common magnifying glass icon is used in its stead.”

Since visually hidden content can receive focus when tabbing, the element will become visible when something inside receives focus. This behavior is intentional, as sighted keyboard user won’t be able to determine where the focus indicator is without it.

Skip to main content
<div style="min-height: 1.875rem;">
  <sl-visually-hidden>
    <a href="#">Skip to main content</a>
  </sl-visually-hidden>
</div>

Source

Examples
Links That Open in New Windows
In this example, the link will open a new window. Screen readers will announce “opens in a new window” even though the text content isn’t visible to sighted users.

Visit External Page opens in a new window
Source

Content Conveyed By Context
Adding a label may seem redundant at times, but they’re very helpful for unsighted users. Rather than omit them, you can provide context to unsighted users with visually hidden content that will be announced by assistive devices such as screen readers.

Personal Info
Name
Email
Source

Importing
If you’re using the autoloader or the traditional loader, you can ignore this section. Otherwise, feel free to use any of the following snippets to cherry pick this component.

To import this component from the CDN using a script tag:

<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/visually-hidden/visually-hidden.js"></script>

Slots
Name	Description
(default)	The content to be visually hidden.
