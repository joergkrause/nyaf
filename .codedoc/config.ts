
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,                                  // --> add the theme. modify `./theme.ts` for chaning the theme.
  src: {
    base: 'docs/md',
    not_found: '404.md',
    toc: '_toc.md',
  },
  dest: {
    html: '.',
    assets: '.',
    bundle: 'dist/documentation/assets',
    styles: 'dist/documentation/assets',
    namespace: '/nyaf'                    // --> your github pages namespace. remove if you are using a custom domain.
  },
  page: {
    title: {
      base: '@NYAF'                        // --> the base title of your doc pages
    }
  },
  misc: {
    github: {
      user: 'joergkrause',                // --> your github username (where your repo is hosted)
      repo: 'nyaf',                       // --> your github repo name
    }
  },
});
