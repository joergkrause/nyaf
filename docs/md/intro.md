# Approach

* @nyaf uses JSX/TSX syntax for quick component dev. This is default option, you can use other any template system instead.
* @nyaf supports Single Page App (SPA) directly.
* @nyaf can use any current HTML 5 API, such as web components, fetch, and all this with ES2015+.
* @nyaf provides a simple template language, that avoids clunky map, reduce, filter stuff within the HTML. This is a feature of the JSX/TSX provider.
* @nyaf uses TypeScript from the beginning (and is written in TypeScript). It works with pure ECMAScript, though.
* @nyaf creates a very small package.
* @nyaf works well with WebPack and other common tools.
* @nyaf uses standards, no weird or enforced CLI, no vendor lock in.
* @nyaf uses smart decorators for controlling stuff, not code within the component, for separation of concerns style.

### Templates

@nyaf prefers to use TSX for templates. It does not use React, though. In fact, it's just a feature of the TypeScript compiler.

See this excerpt from `tsconfig.json`:

~~~
"jsx": "react",
"reactNamespace": "JSX",
~~~

The class `JSX` is the core, it handles the element definitions and extract the template extensions.

> You can use Babel to setup a pure JS environment without any restrictions. TypeScript is not enforced, it's just an option.

Also you can use any other method to create the components content, but you will loose the *n-xxx* template extensions.

### Size

Is it worth coding with **@nyaf** and vanilla JS/TS? For smaller projects and for apps that must load quickly, yes.

Actual package sizes (0.6.8, published 16th of September 2020):

* Lib:    31 KB --> 11 KB zipped (always needed)
* Forms:  27 KB -->  6 KB zipped (Forms binding, validation, decorators)
* Store:  11 KB -->  3 KB zipped (Flux like store for state management)

* Total:  69 KB --> 18 KB zipped all files together for your project

However, compared with React or Angular it's a lot simpler. Compared to Vue, Svelte or Polymer it's simpler and even smaller, but the delta is not that thrilling.

### Tool Support

What tool support? It's Web Components - any editor will do. It's JSX/TSX, so any good editor can handle this. And there are TypeScript decorators, even this is well supported. So, you don't need to tweak your editor. It works, no red squiggles, guaranteed.

### Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

### Credits

Inspired by:

* [Angular](comparision/angular) (thanks for the idea of using decorators)
* [Polymer](comparision/polymer) (especially lit-element, thanks for showing that Web Components are bold)
* [React](comparision/react) (thanks for JSX)
* [Vue](comparision/vue) (thanks for showing short custom attributes)
* [Svelte](comparision/svelte) (thanks for showing short custom attributes)
* TypeScript (thanks for making JS cool again)

