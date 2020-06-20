import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/demo/main.component';
import { TabsComponent } from './components/demo/tabs.component';
import { TabComponent } from './components/demo/tab.component';
import { SlotTabsComponent } from './components/demo/slottedtabs/tabs.component';
import { SlotTabComponent } from './components/demo/slottedtabs/tab.component';
import { ButtonComponent } from './components/demo/button.component';
import { SlottedComponent } from './components/demo/slotted.component';
import { AboutComponent } from './components/demo/pages/about.component';
import { DemoComponent } from './components/demo/pages/demo.component';
import { DesignDemoComponent } from './components/demo/pages/designdemo.component';
import { ContactComponent } from './components/demo/pages/contact.component';
import { CounterComponent } from 'components/demo/counter.component';
import { StoreCounterComponent } from './components/demo/storecounter.component';
import { ServiceCounterComponent } from './components/demo/servicecounter.component';
import { HomeComponent } from 'components/demo/pages/home.component';
import { DocuComponent } from 'components/demo/pages/docu.component';
import { ButtonsComponent } from 'components/demo/buttons.component';
import { FormComponent } from 'components/demo/form.component';
import { ComplexComponent } from 'components/demo/complex.component';
import { ComplexBoolComponent } from 'components/demo/complexbool.component';
import { RouterComponent } from 'components/demo/router/router.component';
import { Page1Component } from 'components/demo/router/page1.component';
import { Page2Component } from 'components/demo/router/page2.component';
import { Page3Component } from 'components/demo/router/page3.component';
import { RepeaterTestComponent } from 'components/demo/repeater.component';

import { ButtonExpander } from 'components/expander/button.expander';

import './main.scss';

const routes: Routes = {
  '/': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true } },
  '/about': { component: AboutComponent },
  '/demo': { component: DemoComponent },
  '/designdemo': { component: DesignDemoComponent },
  '/router': { component: RouterComponent },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/page2/other': { component: Page2Component, outlet: 'other' },
  '/router/page3/other': { component: Page3Component, outlet: 'other' },
  '/sc1': { component: StoreCounterComponent, outlet: 'other', forced: true },
  '/sc2': { component: StoreCounterComponent, outlet: 'other', forced: true },
  '/contact': { component: ContactComponent }
};

GlobalProvider.bootstrap({
  // register all components directly used in templates
  components: [
    MainComponent,
    ButtonComponent,
    ButtonsComponent,
    SlottedComponent,
    TabComponent,
    TabsComponent,
    SlotTabComponent,
    SlotTabsComponent,
    ContactComponent,
    AboutComponent,
    DemoComponent,
    DesignDemoComponent,
    CounterComponent,
    StoreCounterComponent,
    ServiceCounterComponent,
    HomeComponent,
    DocuComponent,
    FormComponent,
    ComplexComponent,
    ComplexBoolComponent,
    RouterComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    RepeaterTestComponent
  ],
  expanders: [
    ButtonExpander
  ],
  // register for router
  routes: routes
});
