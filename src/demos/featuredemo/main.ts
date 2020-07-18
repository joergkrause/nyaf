import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/pages/main.component';
import { TabsComponent } from './components/tabs.component';
import { TabComponent } from './components/tab.component';
import { SlotTabsComponent } from './components/slottedtabs/tabs.component';
import { SlotTabComponent } from './components/slottedtabs/tab.component';
import { ButtonComponent } from './components/button.component';
import { SlottedComponent } from './components/slotted.component';
import { AboutComponent } from './components/pages/about.component';
import { DemoComponent } from './components/pages/demo.component';
import { DesignDemoComponent } from './components/pages/designdemo.component';
import { ContactComponent } from './components/pages/contact.component';
import { CounterComponent } from './components/counter.component';
import { StoreCounterComponent } from './components/storecounter.component';
import { ServiceCounterComponent } from './components/servicecounter.component';
import { HomeComponent } from './components/pages/home.component';
import { DocuComponent } from './components/pages/docu.component';
import { ButtonsComponent } from './components/buttons.component';
import { FormComponent, SubFormComponent } from './components/form.component';
import { ComplexComponent } from './components/complex.component';
import { ComplexBoolComponent } from './components/complexbool.component';
import { RouterComponent } from './components/router/router.component';
import { Page1Component } from './components/router/page1.component';
import { Page2Component } from './components/router/page2.component';
import { Page3Component } from './components/router/page3.component';
import { RepeaterTestComponent } from './components/repeater.component';

import { ButtonExpander } from './expander/button.expander';

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
    SubFormComponent,
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
