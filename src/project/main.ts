import { Component } from "./types/common";
import { MainComponent } from "./components/test/main.component";
import { TabsComponent } from "./components/test/tabs.component";

// register web components
class globalRegistry {
  static register(type: Component) {
    customElements.define(type.selector, type);
  }
}
globalRegistry.register(MainComponent);
globalRegistry.register(TabsComponent);
// pages