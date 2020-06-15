
## Shadow DOM

By default the shadow DOM is ____not____ used. If it would, it would mean, that styles are isolated. No global styles are available, then.

One option to activate the Shadow DOM:

~~~
@ShadowDOM()
~~~

The property can be set explicitly. The default is `false`, hence if the decorator is being omitted, the component is ____not____ shadowed.

~~~
@ShadowDOM(true | false)
~~~

Another interesting option controls the style behavior:

~~~
@UseParentStyles()
~~~

* The decorator *ShadowDOM* must be set, otherwise the decorator *@UseParentStyle* does nothing
* If active, it copies all global styles into component so they work as expected even in Shadow DOM

> It's a trade-off. Shadow DOM increases performance and brings isolation. Copying many styles decreases performance and contradicts isolation.

Example:

~~~
@CustomElement('app-contact')
@ShadowDOM()
@UseParentStyles()
export class ContactComponent extends BaseComponent {
  // omitted for brevity
}
~~~

> :ToCPrevNext

