import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/pages/main.component';
import { HomeComponent } from './components/pages/home.component';
import { DocuComponent } from './components/pages/docu.component';
import { AboutComponent } from './components/pages/about.component';
import { LibDemoComponent } from './components/pages/lib-demo/lib-demo.component';
import { StoreDemoComponent } from './components/pages/store-demo/store-demo.component';
import { FormsDemoComponent } from './components/pages/forms-demo/forms-demo.component';
// lib
import { TabsComponent } from './components/pages/lib-demo/components/tabs.component';
import { TabComponent } from './components/pages/lib-demo/components/tab.component';
import { SlotTabsComponent } from './components/slottedtabs/tabs.component';
import { SlotTabComponent } from './components/slottedtabs/tab.component';
import { ButtonComponent } from './components/pages/lib-demo/components/button.component';
import { SimpleComponent } from './components/pages/lib-demo/components/simple.component';
import { SlottedComponent } from './components/pages/lib-demo/components/slotted.component';
import { RepeaterTestComponent } from './components/pages/lib-demo/components/repeater.component';
import { CounterComponent } from './components/pages/lib-demo/components/counter.component';
import { ComplexComponent } from './components/pages/lib-demo/components//complex.component';
import { ComplexBoolComponent } from './components/pages/lib-demo/components//complexbool.component';
import { ServiceCounterComponent } from './components/pages/lib-demo/components/servicecounter.component';
import { ButtonsComponent } from './components/pages/lib-demo/components/buttons.component';
import { IfComponent } from './components/pages/lib-demo/components/iif.component';
// store
import { StoreCounterComponent } from './components/pages/store-demo/components/storecounter.component';
import { StoreDataComponent } from './components/pages/store-demo/components/storedata.component';
// forms
import { FormComponent, SubFormComponent } from './components/pages/forms-demo/components/form.component';
// router
import { RouterComponent } from './components/router/router.component';
import { Page1Component } from './components/router/page1.component';
import { Page2Component } from './components/router/page2.component';
import { Page3Component } from './components/router/page3.component';


import { ButtonExpander } from './expander/button.expander';

import './main.scss';
import './assets/css/styles.css';
import 'jquery';
import 'bootstrap';
import 'jquery-easing';

const routes: Routes = {
  '/': { component: HomeComponent },
  '/home': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true } },
  '/about': { component: AboutComponent },
  '/libdemo': { component: LibDemoComponent },
  '/storedemo': { component: StoreDemoComponent },
  '/formsdemo': { component: FormsDemoComponent },
  '/router': { component: RouterComponent },
  '/router/page1': { component: Page1Component, outlet: 'router' },
  '/router/page2': { component: Page2Component, outlet: 'router' },
  '/router/page2/other': { component: Page2Component, outlet: 'other' },
  '/router/page3/other': { component: Page3Component, outlet: 'other' },
  '/sc1': { component: StoreCounterComponent, outlet: 'other', forced: true },
  '/sc2': { component: StoreCounterComponent, outlet: 'other', forced: true },

};

GlobalProvider.bootstrap({
  // register all components
  components: [
    MainComponent,
    HomeComponent,
    DocuComponent,
    AboutComponent,
    LibDemoComponent,
    StoreDemoComponent,
    StoreCounterComponent,
    StoreDataComponent,
    FormsDemoComponent,
    TabComponent,
    TabsComponent,
    SlotTabsComponent,
    SlotTabComponent,
    SimpleComponent,
    ButtonComponent,
    SlottedComponent,
    RepeaterTestComponent,
    CounterComponent,
    IfComponent,
    ComplexComponent,
    ComplexBoolComponent,
    ServiceCounterComponent,
    ButtonsComponent,
    RouterComponent,
    Page1Component,
    Page2Component,
    Page3Component,
  ],
  // register the routes
  routes: routes
});
