
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,                                  // --> add the theme. modify `./theme.ts` for chaning the theme.
  dest: {
    html: 'dist/manual',
    namespace: '/nyaf'                    // --> your github pages namespace. remove if you are using a custom domain.
  },
  page: {
    title: {
      base: 'Nyaf'                        // --> the base title of your doc pages
    }
  },
  misc: {
    github: {
      user: 'joergkrause',                // --> your github username (where your repo is hosted)
      repo: 'nyaf',                       // --> your github repo name
    }
  },
  src: {
    base: 'docs/md',
    drop: /(^\.)|(\/\.)/        // --> exclude files and folders whose name starts with a `.`
  },
});
