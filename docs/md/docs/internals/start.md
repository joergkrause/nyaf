# How it's being made

This chapter explains the inner workings and solutions used to create the framework. It's also an journey into ECMAScript beyond the usual usage scenario.

## The Base Component

This is by far the most complex part. It delivers the support for all the features **ny@f** has to offer.

Let's look into the inner parts step by step.

### Web Component

### Ctor



### Setup / Render

### Life Cycle

### Data Handling for Attributes

## The Decorators

## The Router

The router is simple yet powerful. It renders components in the outlet by adding the content to *innerHTML*. That invokes the component's life cycle.

## The Binder

The binder is part of **@nyaf/forms** and a complex piece of code that handles the smart rendering using `Proxy` objects. The usage of proxies has been criticized by many developers because of the complexity, difficult debugging and hard to follow behavior. They're, however, native functions of ECMAScript and fully supported by browsers. The ability to intercept property calls avoid building a n artificial layer on top of the components. The meain reason here is, that it safes a lot of space and makes the package much smaller.