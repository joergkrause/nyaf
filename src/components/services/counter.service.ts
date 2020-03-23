export class CounterService {

  public static Id = 'CounterService';

  private count;

  constructor() {
    this.count = 0;
  }

  public increment() {
    this.count++;
  }

  public decrement() {
    this.count--;
  }

  public get value() {
    return this.count;
  }

}
