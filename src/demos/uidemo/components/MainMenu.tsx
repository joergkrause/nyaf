import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('demo-mainmenu')
export class MainMenu extends BaseComponent<{ fullSize: boolean }> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <ui-container fluid={true} cls={'pos-fixed fixed-top z-fixed bg-react'}>
        <ui-appbar cls={(this.data.fullSize ? '' : 'container') + ' pos-relative app-bar-react-colors'} expandPoint={'md'} hamburgerColor={'light'}>
          <ui-appbar-item isBrand={true} as={'a'} href={'/'} name={'Metro 4 for React'} cls={'text-bold fg-react'} />
          <ui-appbar-menu cls={'ml-auto'}>
            <li><a n-link href="#/">Home</a></li>
            <li><a n-link href="#/guide">Guide</a></li>
            <li><a n-link href="#/demo">Demo</a></li>
            <li>
              <a href="https://www.patreon.com/metro4_react" target={'_blank'} className="text-bold fg-yellow">
                <span className="d-block ani-vertical-">Support Project</span></a>
            </li>
            <li>
              <a href="https://github.com/olton/Metro4-React" target="_blank">
                <ui-icon name={'github'} size={'2x'} cls={'d-none d-block-md'} />
                <span className="d-block d-none-md">Github</span>
              </a>
            </li>
          </ui-appbar-menu>
        </ui-appbar>
      </ui-container>
    )
  }
}


