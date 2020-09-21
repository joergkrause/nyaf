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

  it('call publish with multiple subscribers', () => {

    const spyPublish = jest.spyOn(os, 'publish');
    const spySubscribe = jest.spyOn(os, 'subscribe');
    // let's add 3 subscribers
    os.subscribe('test', () => { });
    os.subscribe('test', () => { });
    os.subscribe('test', () => { });
    os.publish('test', true);
    expect(spyPublish).toBeCalled();
    expect(spyPublish).toBeCalledTimes(1);
    expect(spySubscribe).toBeCalled();
    expect(spySubscribe).toBeCalledTimes(3);

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

  it('call publish with 3 subscribers, last removed', () => {

    function receiver() {
      this.rec = () => {}
    }
    const testReceiver = new receiver();
    const spyPublish = jest.spyOn(os, 'publish');
    const spySubscribe = jest.spyOn(testReceiver, 'rec');
    // let's add 3 subscribers
    const s1 = os.subscribe('test', testReceiver.rec);
    const s2 = os.subscribe('test', testReceiver.rec);
    const s3 = os.subscribe('test', testReceiver.rec);
    // and remove one
    s3.remove();
    os.publish('test', true);
    expect(spyPublish).toBeCalled();
    expect(spyPublish).toBeCalledTimes(1);
    expect(spySubscribe).toBeCalled();
    // to have it called 2 times
    expect(spySubscribe).toBeCalledTimes(2);

  });

  it('call publish with 3 subscribers, first removed', () => {

    function receiver() {
      this.rec = () => {}
    }
    const testReceiver = new receiver();
    const spyPublish = jest.spyOn(os, 'publish');
    const spySubscribe = jest.spyOn(testReceiver, 'rec');
    // let's add 3 subscribers
    const s1 = os.subscribe('test', testReceiver.rec);
    const s2 = os.subscribe('test', testReceiver.rec);
    const s3 = os.subscribe('test', testReceiver.rec);
    // and remove one
    s1.remove();
    os.publish('test', true);
    expect(spyPublish).toBeCalled();
    expect(spyPublish).toBeCalledTimes(1);
    expect(spySubscribe).toBeCalled();
    // to have it called 2 times
    expect(spySubscribe).toBeCalledTimes(2);

  });


  it('call publish with 3 subscribers, middle removed', () => {

    function receiver() {
      this.rec = () => {}
    }
    const testReceiver = new receiver();
    const spyPublish = jest.spyOn(os, 'publish');
    const spySubscribe = jest.spyOn(testReceiver, 'rec');
    // let's add 3 subscribers
    const s1 = os.subscribe('test', testReceiver.rec);
    const s2 = os.subscribe('test', testReceiver.rec);
    const s3 = os.subscribe('test', testReceiver.rec);
    // and remove one
    s2.remove();
    os.publish('test', true);
    expect(spyPublish).toBeCalled();
    expect(spyPublish).toBeCalledTimes(1);
    expect(spySubscribe).toBeCalled();
    // to have it called 2 times
    expect(spySubscribe).toBeCalledTimes(2);

  });

});
