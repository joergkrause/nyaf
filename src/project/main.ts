import { Component } from "./types/common";
import { MainComponent } from "./components/test/main.component";
import { TabsComponent } from "./components/test/tabs.component";
import { TabComponent } from "./components/test/tab.component";
import { ButtonComponent } from "./components/test/button.component";

// register web components
class globalRegistry {
  static register(type: Component) {
    console.log('register', type.selector);
    customElements.define(type.selector, type);
  }
}

// order matters?
globalRegistry.register(ButtonComponent);
globalRegistry.register(TabComponent);
globalRegistry.register(TabsComponent);
globalRegistry.register(MainComponent);

// global event collector
document.addEventListener('click', (e) => {
  console.log('EVT click', e.target);
  // check if target is a NYAF element and has a handler attached
  console.log('EVT click', this);
  let evt = ((<HTMLElement>e.target).getAttribute('n-on-click'));
  (<HTMLElement>e.target).parentElement[evt].call((<HTMLElement>e.target).parentElement);
});