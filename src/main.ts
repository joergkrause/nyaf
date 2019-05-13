import { globalProvider } from 'nyaf';

import { MainComponent } from './components/test/main.component';
import { TabsComponent } from './components/test/tabs.component';
import { TabComponent } from './components/test/tab.component';
import { ButtonComponent } from './components/test/button.component';
import { AboutComponent } from './components/test/pages/about.component';
import { DemoComponent } from './components/test/pages/demo.component';
import { ContactComponent } from './components/test/pages/contact.component';

import './main.scss';

let routes = {
  '/': { component: DemoComponent },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/contact': { component: ContactComponent },
};

globalProvider.bootstrap({
  // register all components directly used in templates
  components: [MainComponent, ButtonComponent, TabComponent, TabsComponent, ContactComponent, AboutComponent, DemoComponent],
  // register for router
  routes: routes
});
