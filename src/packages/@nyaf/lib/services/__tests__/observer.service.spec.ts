import { Observer } from "../observer.service";

describe('Observer service', () => {

  let os: Observer = null;

  beforeEach(() => {
    os = Observer.getInstance(true);
  });


  it('get singleton instance', () => {

    expect(os).not.toBeNull();
    expect(os).toHaveProperty('publish');
    expect(os).toHaveProperty('subscribe');

  });

  it('throw error for ctor call', () => {
    // wrap to catch
    function wrapError() {
      const os = new Observer(true);
      return os;
    }
    // mock to spy on
    console.error = jest.fn()

    expect(wrapError).toThrowError('Observer is Singleton, don\'t call the ctor');
    expect(console.error).toHaveBeenCalled();

  });

  it('attach subscriber', () => {

    const spy = jest.spyOn(os, 'subscribe');
    os.subscribe('test', () => { });
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);

  });

  it('call publish', () => {

    const spyPublish = jest.spyOn(os, 'publish');
    const spySubscribe = jest.spyOn(os, 'subscribe');
    os.subscribe('test', () => { });
    os.publish('test', true);
    expect(spyPublish).toBeCalled();
    expect(spyPublish).toBeCalledTimes(1);
    expect(spySubscribe).toBeCalled();

  });

  it('call publish no subscriber', () => {

    const spyPublish = jest.spyOn(os, 'publish');
    const spySubscribe = jest.spyOn(os, 'subscribe');
    os.publish('none', true);
    expect(spyPublish).toBeCalled();
    expect(spyPublish).toBeCalledTimes(1);
    expect(spySubscribe).not.toBeCalled();

  });


  it('remove subscriber instance', () => {

    const s = os.subscribe('test', () => { });
    const spyRemove = jest.spyOn(s, 'remove');
    const spySubscribe = jest.spyOn(os, 'subscribe');
    s.remove();
    expect(spyRemove).toBeCalled();
    expect(spyRemove).toBeCalledTimes(1);
    expect(spySubscribe).not.toBeCalled();

  });



});
