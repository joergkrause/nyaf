import { Component } from "./types/common";

// register web components
class globalRegistry {
  static register(type: Component) {
    customElements.define(type.selector, type);
  }
}
// pages