/**
 * Implement a simple pub/sub pattern to have components communication without attributes.
 * This class is Singleton, use getInstance to get the global obj.
 */
export class Observer {
  private topics: { [id: string]: Array<Function> } = {};
  private hOP: Function;

  constructor(s: any) {
    if (s) {
      throw new Error("Observer is Singleton, don't call the ctor");
    }
    this.hOP = this.topics.hasOwnProperty;
  }

  private static _instance;

  public static getInstance(): Observer {
    if (!Observer._instance) {
      Observer._instance = new Observer(void 0);
    }
    return Observer._instance;
  }

  subscribe(topic: string, listener: Function): { remove: Function } {
    //console.log('Observer::Subscribe::' + topic);
    // Create the topic's object if not yet created
    if (!this.hOP.call(this.topics, topic)) {
      this.topics[topic] = [];
    }

    // Add the listener to queue
    var index = this.topics[topic].push(listener) - 1;
    var self = this;
    // Provide handle back for removal of topic
    return {
      remove: function() {
        delete self.topics[topic][index];     // kill handler
        self.topics[topic].splice(index, 1);  // shrink array
      }
    };
  }

  publish(topic: string, info: any): void {
    //console.log('Observer::Publish');
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!this.hOP.call(this.topics, topic)) return;
    //console.log('Observer::Publish::Cycle::' + this.topics[topic].length);
    // Cycle through topics queue, fire!
    this.topics[topic].forEach(item => {
      item(info);
    });
  }
}
