import { GlobalProvider, Routes } from '@nyaf/lib';

import { MainComponent } from './components/functionsdemo/pages/main.component';
import { TabsComponent } from './components/functionsdemo/tabs.component';
import { TabComponent } from './components/functionsdemo/tab.component';
import { SlotTabsComponent } from './components/functionsdemo/slottedtabs/tabs.component';
import { SlotTabComponent } from './components/functionsdemo/slottedtabs/tab.component';
import { ButtonComponent } from './components/functionsdemo/button.component';
import { SlottedComponent } from './components/functionsdemo/slotted.component';
import { AboutComponent } from './components/functionsdemo/pages/about.component';
import { DemoComponent } from './components/functionsdemo/pages/demo.component';
import { DesignDemoComponent } from './components/functionsdemo/pages/designdemo.component';
import { ContactComponent } from './components/functionsdemo/pages/contact.component';
import { CounterComponent } from 'components/functionsdemo/counter.component';
import { StoreCounterComponent } from './components/functionsdemo/storecounter.component';
import { ServiceCounterComponent } from './components/functionsdemo/servicecounter.component';
import { HomeComponent } from 'components/functionsdemo/pages/home.component';
import { DocuComponent } from 'components/functionsdemo/pages/docu.component';
import { ButtonsComponent } from 'components/functionsdemo/buttons.component';
import { FormComponent, SubFormComponent } from 'components/functionsdemo/form.component';
import { ComplexComponent } from 'components/functionsdemo/complex.component';
import { ComplexBoolComponent } from 'components/functionsdemo/complexbool.component';
import { RouterComponent } from 'components/functionsdemo/router/router.component';
import { Page1Component } from 'components/functionsdemo/router/page1.component';
import { Page2Component } from 'components/functionsdemo/router/page2.component';
import { Page3Component } from 'components/functionsdemo/router/page3.component';
import { RepeaterTestComponent } from 'components/functionsdemo/repeater.component';

import { ButtonExpander } from 'components/functionsdemo/expander/button.expander';

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
