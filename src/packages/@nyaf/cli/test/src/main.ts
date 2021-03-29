import { GlobalProvider } from '@nyaf/lib';

import { RootComponent } from './components/root.component';

GlobalProvider.bootstrap({
  // register all components directly used in templates
  components: [
    RootComponent,
  ]
});

