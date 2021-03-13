type func = (v: string | number | symbol | any) => void;
type hopf = (v: string | number | symbol | any) => boolean;

/**
 * Implement a simple pub/sub pattern to have components communication without attributes.
 * This class is Singleton, use getInstance to get the global obj.
 */
export class Observer {

  constructor(s: any) {
    if (s !== void 0) {
      console.error('Observer is Singleton, don\'t call the ctor');
      throw new Error('Observer is Singleton, don\'t call the ctor');
    }
    this.hOP = this.topics.hasOwnProperty;
  }

  public static Id: Readonly<string> = 'observer';

  private static _instance: Observer;

  private topics: { [id: string]: func[] } = {};
  private hOP: hopf;

  /**
   * Get the singletone instance.
   * @param forceRecreate Used to enforce clean instance in test situations. Usually you never need to set this in user code.
   */
  public static getInstance(forceRecreate = false): Observer {
    if (!Observer._instance || forceRecreate) {
      Observer._instance = new Observer(void 0);
    }
    return Observer._instance;
  }

  subscribe(topic: string, listener: func): { remove: () => void } {
    // Create the topic's object if not yet created
    if (!this.hOP.call(this.topics, topic)) {
      this.topics[topic] = [];
    }
    // Add the listener to queue
    const index = this.topics[topic].push(listener) - 1;
    // Provide handle back for removal of topic
    return {
      remove: () => {
        delete this.topics[topic][index];     // kill handler
        this.topics[topic].splice(index, 1);  // shrink array
      }
    };
  }

  publish(topic: string, info: any): void {
    // If the topic doesn't exist, or there are no listeners in queue, just leave
    if (!this.hOP.call(this.topics, topic)) { return; }
    // Cycle through topics queue, fire!
    this.topics[topic].forEach(item => {
      item.call(item, info);
    });
  }
}
