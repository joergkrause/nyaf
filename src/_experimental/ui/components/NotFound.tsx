import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('demo-notfound')
export class NotFound extends BaseComponent<{}> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div className={'container'}>
        Страница не найдена. Вернуться на <a href='/' n-link>главную</a>?
      </div>
    )
  }
}
