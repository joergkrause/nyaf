# Templates

A built-in <template> element serves as a storage for HTML markup templates. The browser ignores it contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

In theory, we could create any invisible element somewhere in HTML for HTML markup storage purposes. What’s special about <template>?

First, its content can be any valid HTML, even if it normally requires a proper enclosing tag.

For example, we can put there a table row <tr>:

~~~
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
~~~

Usually, if we try to put <tr> inside, say, a <div>, the browser detects the invalid DOM structure and “fixes” it, adds <table> around. That’s not what we want. On the other hand, <template> keeps exactly what we place there.

We can put styles and scripts into <template> as well:

~~~
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
~~~

The browser considers <template> content “out of the document”: styles are not applied, scripts are not executed, <video autoplay> is not run, etc.

The content becomes live (styles apply, scripts run etc) when we insert it into the document.

Inserting template
The template content is available in its content property as a DocumentFragment – a special type of DOM node.

We can treat it as any other DOM node, except one special property: when we insert it somewhere, its children are inserted instead.

For example:

~~~
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

  // Clone the template content to reuse it multiple times
  elem.append(tmpl.content.cloneNode(true));

  document.body.append(elem);
  // Now the script from <template> runs
</script>
~~~

Let’s rewrite a Shadow DOM example from the previous chapter using <template>:

~~~
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
~~~

In the line (*) when we clone and insert tmpl.content, as its DocumentFragment, its children (<style>, <p>) are inserted instead.

They form the shadow DOM:

~~~
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
~~~

## The BaseComponent in NYAF

The NYAF base class takes care of the template behavior. It uses the template element if needed to create a shadow DOM. The main part is in the *setup* method:

~~~
protected setup() {
  this.lifeCycleState = LifeCycle.PreRender;
  if ((<any>this.constructor).withShadow) {
    const template = document.createElement('template');
    template.innerHTML = this.render();
    if (!this.shadowRoot || this.shadowRoot.mode === 'closed') {
      this.attachShadow({ mode: 'open' });
      // copy styles to shadow if shadowed and there is something to add
      if ((<any>this.constructor).useParentStyles && (<any>this.constructor).globalStyle) {
        const style = document.createElement('style');
        style.textContent = (<any>this.constructor).globalStyle;
        this.shadowRoot.appendChild(style);
      }
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  } else {
    this.innerHTML = this.render();
  }
  this.lifeCycleState = LifeCycle.Load;
}
~~~



Summary
To summarize:

<template> content can be any syntactically correct HTML.
<template> content is considered “out of the document”, so it doesn’t affect anything.
We can access template.content from JavaScript, clone it to reuse in a new component.
The <template> tag is quite unique, because:

The browser checks HTML syntax inside it (as opposed to using a template string inside a script).
…But still allows use of any top-level HTML tags, even those that don’t make sense without proper wrappers (e.g. <tr>).
The content becomes interactive: scripts run, <video autoplay> plays etc, when inserted into the document.
The <template> element does not feature any iteration mechanisms, data binding or variable substitutions, but we can implement those on top of it.