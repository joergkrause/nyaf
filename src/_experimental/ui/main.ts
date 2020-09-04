import { GlobalProvider, Routes } from '@nyaf/lib';
import * as prism from 'prismjs';

import {
  Badge,
  Checkbox,
  Switch,
  Button,
  Container
} from '@nyaf/ui';

import { Home } from './components/Home';
import { Guide } from './components/Guide';
import { Support } from './components/Support';
import { Demo } from './components/Demo';
import { NotFound } from './components/NotFound';
import { Article } from './components/Article';
import { Example } from './components/Example';
import { GuideLogo } from './components/GuideLogo';
import { MainMenu } from './components/MainMenu';
import { PrismCode } from './components/PrismCode';
import { SearchForm } from './components/SearchForm';
import { SideMenu } from './components/SideMenu';
import { GuideInfoButton } from './components/guide/InfoButton';
import { GuideActionButton } from './components/guide/ActionButton';
import { GuideCheckbox } from './components/guide/Checkbox';

const routes: Routes = {
  '/': { component: Home, outlet: 'main' },
  '/guide': { component: Guide, outlet: 'main' },
  '/guide/info-button': { component: GuideInfoButton, outlet: 'guide' },
  '/guide/action-button': { component: GuideActionButton, outlet: 'guide' },
  '/guide/checkbox': { component: GuideCheckbox, outlet: 'guide' },
  '/support': { component: Support, outlet: 'main' },
  '/demo': { component: Demo, outlet: 'main' },
  '**': { component: NotFound, outlet: 'main' }
};

const demoComponents = [
  Article,
  Example,
  GuideLogo,
  MainMenu,
  PrismCode,
  SearchForm,
  SideMenu,
  Home,
  Guide,
  Support,
  Demo,
  NotFound,
  GuideActionButton,
  GuideCheckbox,
];

const uiComponents = [
  Badge,
  Checkbox,
  Switch,
  Button,
  Container
];

GlobalProvider.bootstrap({
  // register all components directly used in templates
  components: [
    ...demoComponents,
    ...uiComponents
  ],
  // register for router
  routes: routes
});

import './css/index.scss';

setTimeout(() => prism.highlightAll(), 0);
