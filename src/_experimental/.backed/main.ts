import { GlobalProvider, Routes } from '@nyaf/lib';

import {
  Color,
  Container,
  Icon,
  Badge,
  Grid, Row, Cell,
  Activity, ActivityModal,
  Accordion,
  AccordionFrame,
  Checkbox,
  Radio,
  Switch,
  BottomNav, BottomNavItem,
  Button,
  CommandButton,
  ImageButton,
  Shortcut,
  Breadcrumbs, BreadcrumbItem,
  InfoButton,
  Select,
  Input,
  ActionButton, MultiAction, MultiActionItem,
  Tag,
  ToolBar, ToolButton,
  ClickOutside,
  Gravatar,
  Dialog, Pagination, Textarea, InputFile,
  Dropdown, Modal, AppBar, AppBarMenu, AppBarItem, Collapse, ButtonGroup,
  Tabs, Tab, SplitButton, Progress, Panel,
  Rating, HtmlContainer, SelectColor, SelectIcon,
  TagInput, Hint
} from "@nyaf/ui";

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
import { GuideIntro } from './components/guide/Intro';
import { GuideCommon } from './components/guide/Common';
import { GuideColorStyles } from './components/guide/ColorStyles';
import { GuideGrid } from './components/guide/Grid';
import { GuideTable } from './components/guide/Table';
import { GuideTemplate } from './components/guide/Template';
import { GuideMemoryTable } from './components/guide/MemoryTable';
import { GuideSplitButton } from './components/guide/SplitButton';
import { GuideToolButton } from './components/guide/ToolButton';
import { GuideCommandButton } from './components/guide/CommandButton';
import { GuideInfoButton } from './components/guide/InfoButton';
import { GuideImageButton } from './components/guide/ImageButton';
import { GuideActionButton } from './components/guide/ActionButton';
import { GuideShortcut } from './components/guide/Shortcut';
import { GuidePagination } from './components/guide/Pagination';
import { GuideBreadCrumbs } from './components/guide/Breadcrumbs';
import { GuideHamburger } from './components/guide/Hamburger';
import { GuideInput } from './components/guide/Input';
import { GuideInputFile } from './components/guide/InputFile';
import { GuideCheckbox } from './components/guide/Checkbox';
import { GuideSwitch } from './components/guide/Switch';
import { GuideRadio } from './components/guide/Radio';
import { GuideSelect } from './components/guide/Select';
import { GuideSelectColor } from './components/guide/SelectColor';
import { GuideSelectIcon } from './components/guide/SelectIcon';
import { GuideButton } from './components/guide/PushButton';
import { GuideButtonGroup } from './components/guide/ButtonGroup';

const routes: Routes = {
  '/': { component: Home },
  '/guide': { component: Guide },
  '/guide/index': { component: GuideIntro },
  '/guide/common': { component: GuideCommon },
  '/guide/colors': { component: GuideColorStyles },
  '/guide/grid': { component: GuideGrid },
  '/guide/table': { component: GuideTable },
  '/guide/memory-table': { component: GuideMemoryTable },
  '/guide/push-button': { component: GuideButton },
  '/guide/split-button': { component: GuideSplitButton },
  '/guide/tool-button': { component: GuideToolButton },
  '/guide/command-button': { component: GuideCommandButton },
  '/guide/info-button': { component: GuideInfoButton },
  '/guide/image-button': { component: GuideImageButton },
  '/guide/action-button': { component: GuideActionButton },
  '/guide/shortcut': { component: GuideShortcut },
  '/guide/pagination': { component: GuidePagination },
  '/guide/breadcrumbs': { component: GuideBreadCrumbs },
  '/guide/hamburger': { component: GuideHamburger },
  '/guide/button-group': { component: GuideButtonGroup },

  '/guide/input': { component: GuideInput },
  '/guide/input-file': { component: GuideInputFile },
  '/guide/checkbox': { component: GuideCheckbox },
  '/guide/switch': { component: GuideSwitch },
  '/guide/radio': { component: GuideRadio },
  '/guide/select': { component: GuideSelect },
  '/guide/select-color': { component: GuideSelectColor },
  '/guide/select-icon': { component: GuideSelectIcon },
  '/support': { component: Support },
  '/demo': { component: Demo },
  '': { component: NotFound }
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
  GuideIntro,
  GuideCommon,
  GuideColorStyles,
  GuideGrid,
  GuideTable,
  GuideTemplate,
  GuideMemoryTable,
  GuideSplitButton,
  GuideToolButton,
  GuideCommandButton,
  GuideInfoButton,
  GuideImageButton,
  GuideActionButton,
  GuideShortcut,
  GuidePagination,
  GuideBreadCrumbs,
  GuideHamburger,
  GuideInput,
  GuideInputFile,
  GuideCheckbox,
  GuideSwitch,
  GuideRadio,
  GuideSelect,
  GuideSelectColor,
  GuideSelectIcon,
  GuideButton,
  GuideButtonGroup,
];

const uiComponents = [
  Container,
  Icon,
  Badge,
  Grid, Row, Cell,
  Activity, ActivityModal,
  Accordion,
  AccordionFrame,
  Checkbox,
  Radio,
  Switch,
  BottomNav, BottomNavItem,
  Button,
  CommandButton,
  ImageButton,
  Shortcut,
  Breadcrumbs, BreadcrumbItem,
  InfoButton,
  Select,
  Input,
  ActionButton,
  MultiAction, MultiActionItem,
  Tag,
  ToolBar, ToolButton,
  ClickOutside,
  Gravatar,
  Dialog,
  Pagination,
  Textarea,
  InputFile,
  Dropdown,
  Modal,
  AppBar, AppBarMenu, AppBarItem,
  Collapse,
  ButtonGroup,
  Tabs, Tab,
  SplitButton,
  Progress,
  Panel,
  Rating,
  HtmlContainer,
  SelectColor, SelectIcon,
  TagInput,
  Hint
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
