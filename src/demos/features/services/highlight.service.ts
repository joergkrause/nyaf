import JSX, { BaseComponent } from '@nyaf/lib';
import hljs from 'highlight.js';

export class HighlightService {

  escape(code: string) {
    const htmlEncode = (c) => c.replace(/[\u00A0-\u9999<>\&]/gim, (i) => {
      return '&#' + i.charCodeAt(0) + ';';
    });
    return htmlEncode(code).replace(/&#60;/g, '<').replace(/&#62;/g, '>');
  }

  setup($this: BaseComponent) {
    hljs.configure({ useBR: true, languages: ['html', 'tsx', 'ts', 'js'] });
      $this.querySelectorAll('h3').forEach(e => {
        if (e.id && $this.querySelector(`#${e.id} + * [title="Demo Markup"]`)) {
          const url = $this.querySelector(`h3#${e.id}`).getAttribute('source');
          // DEMO
          fetch(`assets/sources/${url}.html`).then(async (res) => {
            const data = await res.text();
            $this.querySelector(`#${e.id} + * [title="Demo Markup"]`).innerHTML = JSX.createElement('pre', null, JSX.createElement('code', { class: 'tsx' }));
            const block = $this.querySelector<HTMLElement>(`#${e.id} + * [title="Demo Markup"]`).querySelector('pre code');
            if (data.length > 0) {
              block.textContent = this.escape(data);
              hljs.highlightBlock(block as HTMLElement);
            } else {
              block.textContent = 'Cannot load ' + e.id;
            }
          });
          // SC
          fetch(`assets/sources/${url}.component.tsx`).then(async (res) => {
            const data = await res.text();
            $this.querySelector(`#${e.id} + * [title="Source Code"]`).innerHTML = JSX.createElement('pre', null, JSX.createElement('code', { class: 'tsx' }));
            const block = $this.querySelector<HTMLElement>(`#${e.id} + * [title="Source Code"]`).querySelector('pre code');
            if (data.startsWith('import')) {
              block.textContent = data;
              hljs.highlightBlock(block as HTMLElement);
            } else {
              block.textContent = 'Cannot load ' + e.id;
            }
          });
        }
      });
  }
}
