import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/test/main.component';
import { TabsComponent } from './components/test/tabs.component';
import { TabComponent } from './components/test/tab.component';
import { SlotTabsComponent } from './components/test/slottedtabs/tabs.component';
import { SlotTabComponent } from './components/test/slottedtabs/tab.component';
import { ButtonComponent } from './components/test/button.component';
import { SlottedComponent } from './components/test/slotted.component';
import { AboutComponent } from './components/test/pages/about.component';
import { DemoComponent } from './components/test/pages/demo.component';
import { MetroDemoComponent } from './components/test/pages/metrodemo.component';
import { ContactComponent } from './components/test/pages/contact.component';
import { CounterComponent } from 'components/test/counter.component';
import { StoreCounterComponent } from './components/test/storecounter.component';
import { ServiceCounterComponent } from './components/test/servicecounter.component';
import { HomeComponent } from 'components/test/pages/home.component';
import { DocuComponent } from 'components/test/pages/docu.component';
import { ButtonsComponent } from 'components/test/buttons.component';
import { ParaExComponent } from 'components/test/paraex.component';
import { FormComponent } from 'components/test/form.component';
import { ComplexComponent } from 'components/test/complex.component';
import { RouterComponent } from 'components/test/router/router.component';
import { Page1Component } from 'components/test/router/page1.component';
import { Page2Component } from 'components/test/router/page2.component';
import { Page3Component } from 'components/test/router/page3.component';

import './main.scss';
require('metro4/build/js/metro');

const routes: Routes = {
  '/': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true } },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/metro': { component: MetroDemoComponent },
  '/router': { component: RouterComponent },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/page2/other': { component: Page2Component, outlet: 'other' },
  '/router/page3/other': { component: Page3Component, outlet: 'other' },
  '/contact': { component: ContactComponent }
};

GlobalProvider.bootstrap({
  // register all components directly used in templates
  components: [
    MainComponent,
    ButtonComponent,
    ButtonsComponent,
    ParaExComponent,
    SlottedComponent,
    TabComponent,
    TabsComponent,
    SlotTabComponent,
    SlotTabsComponent,
    ContactComponent,
    AboutComponent,
    DemoComponent,
    MetroDemoComponent,
    CounterComponent,
    StoreCounterComponent,
    ServiceCounterComponent,
    HomeComponent,
    DocuComponent,
    FormComponent,
    ComplexComponent,
    RouterComponent,
    Page1Component,
    Page2Component,
    Page3Component
  ],
  // register for router
  routes: routes
});
