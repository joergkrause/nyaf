# The Idea

* We want to use JSX/TSX syntax for quick component dev.
* We want to have support to make a Single Page App (SPA).
* We want to use any current HTML 5 API, such as web components, fetch, and all this with ES2015.
* We want to have a simple template language, that avoids clunky map, reduce, filter stuff within the HTML.
* We want to use TypeScript from the beginning.
* We want to get a very small package.
* We want to use WebPack and other common tools.
* We want to use standards, no weird CLI, no vendor lock in.
* We want to use smart decorators for controlling stuff, not code within the component, for separation of concerns style.

## Approach

It's based on TSX. It does not use React, though. In fact, it's just a feature of the TypeScript compiler.

See this excerpt from `tsconfig.json`:

~~~
"jsx": "react",
"reactNamespace": "JSX",
~~~

A class `JSX` is the core, it handles the element definitions and extract the template extensions.

## Quick Start

![](assets/minimum_app.png)

# Summary

Is it worth coding with **@nyaf** and vanilla JS/TS? For smaller projects and for apps that must load quickly, yes.

Actual sizes (0.5.18):

* Core:   31 KB --> 10 KB zipped (always needed)
* Forms:  43 KB --> 13 KB zipped (Forms binding, validation, decorators)
* Store:  34 KB --> 11 KB zipped (Flux like store for state management)

* Total: 108 KB --> 34 KB zipped all files together for your project

However, compared with React or Angular it's a lot simpler. Compared to Vue, Svelte or Polymer it's simpler and even smaller, but the delta is not that thrilling.

## Tool Support

What tool support? It's Web Components - any editor will do. It's JSX/TSX, so any good editor can handle this. And there are TypeScript decorators, even this is well supported. So, you don't need to tweak your editor. It works, no red squiggles, guaranteed.

## Restrictions

The package runs, if there are no polyfills, only with ES2015. This limits the usage to any modern browser. It's pretty bold in Electron projects.

## Credits

Inspired by:

* [Angular](comparision/angular) (thanks for the idea of using decorators)
* [Polymer](comparision/polymer) (especially lit-element, thanks for showing that Web Components are bold)
* [React](comparision/react) (thanks for JSX)
* [Vue](comparision/vue) (thanks for showing short custom attributes)
* [Svelte](comparision/svelte) (thanks for showing short custom attributes)
* TypeScript (thanks for making JS cool again)

## Readings

There is a book in the making covering all aspects of **@nyaf**: https://leanpub.com/webcomponentsnyaf. Read everything about Web Components, why they are smart and how **@nyaf** handles them.

## Further steps

Look out for '@nyaf/forms' (forms validation, data binding, UI control) and '@nyaf/store' (a simple flux store). Simple but powerful!

> :ToCPrevNext

