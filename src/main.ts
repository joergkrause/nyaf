import { GlobalProvider } from '@nyaf/lib';

import { MainComponent } from './components/test/main.component';
import { TabsComponent } from './components/test/tabs.component';
import { TabComponent } from './components/test/tab.component';
import { ButtonComponent } from './components/test/button.component';
import { AboutComponent } from './components/test/pages/about.component';
import { DemoComponent } from './components/test/pages/demo.component';
import { ContactComponent } from './components/test/pages/contact.component';
import { CounterComponent } from 'components/test/counter.component';
import { StoreCounterComponent } from './components/test/storecounter.component';
import { HomeComponent } from 'components/test/pages/home.component';
import { DocuComponent } from 'components/test/pages/docu.component';
import { ButtonsComponent } from 'components/test/buttons.component';

import './main.scss';

const routes = {
  '/': { component: HomeComponent },
  '/docu': { component: DocuComponent },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/contact': { component: ContactComponent }
};

GlobalProvider.bootstrap({
  // register all components directly used in templates
  components: [
    MainComponent,
    ButtonComponent,
    ButtonsComponent,
    TabComponent,
    TabsComponent,
    ContactComponent,
    AboutComponent,
    DemoComponent,
    CounterComponent,
    StoreCounterComponent,
    HomeComponent,
    DocuComponent
  ],
  // register for router
  routes: routes
});
