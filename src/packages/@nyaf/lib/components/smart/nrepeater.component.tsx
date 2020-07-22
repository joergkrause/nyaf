import JSX from '../jsx';
import { Properties } from '../../decorators/properties.decorator';
import { BaseComponent } from '../base.component';

@Properties<{ source: [] }>({ source: [] })
export class NRepeaterComponent extends BaseComponent<{ source: [] }> {

  private sourceProxy: any[];
  private replace = (s: string, item: any) => s.replace(/@@(.+?)@@/g, (r, p1) => item[p1]);

  constructor() {
    super();
  }

  async render() {
    if (!this.data.source) { return null; }
    const loop = this.data.source.map(item => this.replace(this.innerHTML, item));
    return await (
      <>
        {loop}
      </>
    );
  }

  // public get source(): [] {
  //   console.log('SOURCE GET');
  //   return this.sourceProxy as unknown as [];
  // }
  // public set source(value: []) {
  //   console.log('SOURCE SET');
  //   this.sourceProxy = new Proxy([], {
  //     get(target, prop: string) {
  //       const val = target[prop];
  //       if (typeof val === 'function') {
  //         if (['push', 'unshift'].includes(prop)) {
  //           return function (el) {
  //             console.log('this is a array modification');
  //             return Array.prototype[prop].apply(target, arguments);
  //           }
  //         }
  //         if (['pop'].includes(prop)) {
  //           return function () {
  //             const el = Array.prototype[prop].apply(target, arguments);
  //             console.log('this is a array modification');
  //             return el;
  //           }
  //         }
  //         return val.bind(target);
  //       }
  //       return val;
  //     }
  //   });
  // }

}
