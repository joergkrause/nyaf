
export class MockModel {
  constructor(init?: { name: string }) {
    if (init) {
      this.name = init.name;
    }
  }
  name: string;
}
