# Getting Started

Typically, you start like this:

~~~sh
$ npm i @nyaf/lib
~~~

Just start from scratch by a simple setup, which includes:

* A *package.json* and a *tsconfig.json*
* A *src* folder, containing at least:
    * index.html
    * main.ts
    * component.ts

That's it, let the TypeScript compiler create the output and copy static files using `cp`.

## The Command Line Interface

@nyaf comes with a simple CLI that creates boilerplate projects.

Use it like this (*first line for the very first time only*):

~~~sh
$ npm i @nyaf/cli -g
$ npx nyaf n
~~~

Also a quicker method of downloading and executing is available:

~~~sh
npx -p @nyaf/cli nyaf n
~~~

> If you have already installed *@nyaf/lib* then the installer has placed *@nyaf/cli* automatically in the global **npm** folder.

The second of the above commands executes the CLI. The procedure is interactive:

![](/assets/cli_part_1.gif)

> **Pro Tip!** Press Ctrl-C (^C) to exit the CLI at any time.

### Commands

There are currently just a few commands:

* 'n' creates a new project in a new folder that has the same name. The CLI will always use lowercase letters.
* 'x' creates a new projects with the given name in the current folder.
* 'c' creates a new component in a project already designed to use @nyaf.

### Templates

The CLI provides four templates:

* basic: Simplest possible project
* full: Project with few pages
* router: Same as full with SPA support
* store: Same as basic with simple global and local store setup

All templates can either support CSS directly or integrate a SASS transpiler.

All templates come with WebPack support and the latest TypeScript compiler.
