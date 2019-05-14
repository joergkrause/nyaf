# NYAF is "Not Yet Another Framework" 

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

## Preface

This is an extension to the famous micro framework NYAF. You need to build your project on top of NYAF, then *@nyaf/store* makes your life easier, again.

> Credits go to [Fluxiny](https://github.com/krasimir/fluxiny) for inspiration and examples. It is, however, not a dependency.

# NYAF-STORE

This is the store implementation, a mini flux variant without the burden of Redux.

## How it works

It's very much like Redux, but makes use of decorators to write less code.

### Actions

Define the capabilities of your app.

~~~
interface Action {
  type: string;
  payload?: any;
}
~~~

### Reducer

Define, what happens if an action is being dispatched:

~~~
@Reduce(Action)
export default function(state: State){
  // do something
  return state;
}
~~~

Add multiple reducers, if you like side effects. The returned payload is a fragment of the store.

### Store and Dispatcher

The store holds the state, provides a dispatch function and fires events in case a store value changes.

~~~
// store any data globally and readonly
@Store()
class MyStore extends NyafStore {
  success: boolean;
}

// define how to move data and commands around
@Action('LOGIN')
class LoginAction implements Action {  
  constructor(public payload: { username: string }) {    
  }
}

// define pure function calls that react to actions and change the store's state
@Reduce(LoginAction)
async function LoginReducer(action: { username: string }){
  // do something 
  const result = await CallMyLoginServiceAsync(action.username);
  return { success: result };
}

// make usage of all this in a component

@InjectService(MyStore)                    // access an instance of the service
@Observed(['data'])                          // if the value changes it calls render internally
class MyComponent extends BaseComponent {

  private data: boolean;

  constructor() {
    super();
    this.services['MyStore']                // access the service
        .watch('success')                     // watch for state changes
        .then(s => this.data = s);            // retrieve the new payload
  }  

  clickMe(userName: string): void {
    this.services['MyStore']                // access the service
        .dispatch(new LoginAction(userName)); // dispatch an action with payload
  }

  render() {
    if (this.data){
      // render success
    } else {
      // render failure
    }
  }

}

// register all the stuff in *globalProvider*

globalProvider.store({
  actions: [],
  reducers: [],
  stores: []
})

~~~

# Installation

Install the package:

~~~
npm i @nyaf/store -S
~~~
