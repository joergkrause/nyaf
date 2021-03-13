import { getRenderer } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/transport/renderer.js';
import { initJssCs } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/transport/setup-jss.js';initJssCs();
import { installTheme } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/content/theme.ts';installTheme();
import { codeSelection } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/selection.js';codeSelection();
import { sameLineLengthInCodes } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/same-line-length.js';sameLineLengthInCodes();
import { initHintBox } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-hint/index.js';initHintBox();
import { initCodeLineRef } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/line-ref/index.js';initCodeLineRef();
import { initSmartCopy } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/code/smart-copy.js';initSmartCopy();
import { copyHeadings } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/heading/copy-headings.js';copyHeadings();
import { contentNavHighlight } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/contentnav/highlight.js';contentNavHighlight();
import { loadDeferredIFrames } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/transport/deferred-iframe.js';loadDeferredIFrames();
import { smoothLoading } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/transport/smooth-loading.js';smoothLoading();
import { tocHighlight } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/toc-highlight.js';tocHighlight();
import { postNavSearch } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/search/post-nav/index.js';postNavSearch();
import { ToCPrevNext } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/prevnext/index.js';
import { GithubSearch } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/misc/github/search.js';
import { ToCToggle } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/page/toc/toggle/index.js';
import { DarkModeSwitch } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/components/darkmode/index.js';
import { ConfigTransport } from '/mnt/d/Apps/private/nyaf/@nyaf/nyaf/.codedoc/node_modules/@codedoc/core/dist/es6/transport/config.js';

const components = {
  '/Rv4lKxSQDV+A9gB+NmB2w==': ToCPrevNext,
  'g2PwBA0oaCK6ojEnMbZz+A==': GithubSearch,
  '4g9OU6ixxeUOlm1PR/9uow==': ToCToggle,
  'ZGqgdsnKB3t7OwwJ4W9fPQ==': DarkModeSwitch,
  'wAzqqM6AQLzQM6LQebkSEQ==': ConfigTransport
};

const renderer = getRenderer();
const ogtransport = window.__sdh_transport;
window.__sdh_transport = function(id, hash, props) {
  if (hash in components) {
    const target = document.getElementById(id);
    renderer.render(renderer.create(components[hash], props)).after(target);
    target.remove();
  }
  else if (ogtransport) ogtransport(id, hash, props);
}
