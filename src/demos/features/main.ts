import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/pages/main.component';
import { HomeComponent } from './components/pages/home.component';
import { DocuComponent } from './components/pages/docu.component';
import { AboutComponent } from './components/pages/about.component';
import { LibDemoComponent } from './components/pages/lib-demo/lib-demo.component';
import { StoreDemoComponent } from './components/pages/store-demo/store-demo.component';
import { FormsDemoComponent } from './components/pages/forms-demo/forms-demo.component';
// shared
import { PageIntroComponent } from './components/shared/pageintro.component';
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
import { ValidationDemoComponent } from './components/pages/forms-demo/components/validation.component';
import { ValidationDisplayDemoComponent } from './components/pages/forms-demo/components/validation-display.component';
// router
import { RouterDemoComponent } from './components/pages/router-demo/router-demo.component';
import { RouterComponent } from './components/pages/router-demo/router.component';
import { Page1Component } from './components/pages/router-demo/page1.component';
import { Page2Component } from './components/pages/router-demo/page2.component';
import { Page3Component } from './components/pages/router-demo/page3.component';
import { Page4Component } from './components/pages/router-demo/page4.component';
import { Page5Component } from './components/pages/router-demo/page5.component';


import { ButtonExpander } from './expander/button.expander';

import './main.scss';
import 'bootstrap';

const routes: Routes = {
  // this partt controls the demo itself
  '/': { component: HomeComponent },
  '/home': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true } },
  '/about': { component: AboutComponent },
  '/libdemo': { component: LibDemoComponent },
  '/storedemo': { component: StoreDemoComponent },
  '/formsdemo': { component: FormsDemoComponent },
  '/router': { component: RouterDemoComponent },
  // this part is a child router to demoing the router
  '/router/page1': { component: Page1Component, outlet: 'left' },
  '/router/page2': { component: Page2Component, outlet: 'left' },
  '/router/page2/right': { component: Page2Component, outlet: 'right' },
  '/router/page3/right': { component: Page3Component, outlet: 'right' },
  '/sc1': { component: Page4Component, outlet: 'right', forced: true },
  '/sc2': { component: Page5Component, outlet: 'right', forced: true },
  '**': { component: HomeComponent }
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
    PageIntroComponent,
    StoreCounterComponent,
    StoreDataComponent,
    FormsDemoComponent,
    FormComponent,
    SubFormComponent,
    ValidationDemoComponent,
    ValidationDisplayDemoComponent,
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
    RouterDemoComponent,
    RouterComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    Page4Component,
    Page5Component
  ],
  // register the routes
  routes
});
