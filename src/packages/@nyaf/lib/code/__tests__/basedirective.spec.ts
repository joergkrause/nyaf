import { BaseDirective } from "../basedirective";


describe('Basedirective', () => {

  it('make instance', () => {

    const host = document.createElement('div');
    const bd = new BaseDirective(host);

    expect(bd).not.toBeNull();
    expect(bd.host).toMatchObject(host);

  });


});
