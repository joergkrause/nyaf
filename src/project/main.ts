import { MainComponent } from './components/test/main.component';
import { TabsComponent } from './components/test/tabs.component';
import { TabComponent } from './components/test/tab.component';
import { ButtonComponent } from './components/test/button.component';
import { globalProvider } from './lib/globalProvider';
import { AboutComponent } from './components/test/pages/about.component';
import { DemoComponent } from './components/test/pages/demo.component';
import { ContactComponent } from './components/test/pages/contact.component';

let routes = {
  '/': DemoComponent,
  '/about': AboutComponent,
  '/demo': DemoComponent,
  '/contact': ContactComponent,
};

globalProvider.bootstrap({
  // order matters?
  components: [ButtonComponent, TabComponent, TabsComponent, MainComponent],
  routes: routes
});
