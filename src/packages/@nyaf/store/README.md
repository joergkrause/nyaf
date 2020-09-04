[![Version](https://img.shields.io/npm/v/%40nyaf%2Fstore.svg?style=flat-square)](https://npmjs.com/package/@nyaf/store)
[![License](https://img.shields.io/npm/l/%40nyaf%2Fstore.svg?style=flat-square)](https://npmjs.com/package/@nyaf/store)

# nyaf is "Not Yet Another Framework"

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

## Preface

This is an extension to the famous micro framework **nyaf**. You need to build your project on top of **nyaf**, then *@nyaf/store* makes your life easier, again.

> Credits go to [Fluxiny](https://github.com/krasimir/fluxiny) for inspiration and examples. It is, however, not a dependency. Some basic ideas comes also from https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/.


# nyaf-STORE

This is the store implementation, a mini flux variant without the burden of Redux.

## How it works

It's very much like Redux, but makes use of decorators to write less code. It's a good strategy to create one global store in your app. Leave it empty if there are no global actions, but make it global.

Then, define three parts for each component:

* Actions that the component offers (such as SEARCH, LOAD, SET, REMOVE, you name it)
* Reducers that are pure function calls that do what your business logic requires (change data, call services)
* A State Object that holds all the data. The reducer can change the state, but nobody else can

In the component you have two tasks:

1. Dispatch actions and add payload if required.
2. Listen for changes in the store to know when an reducer finished it's task

An async load must not be splitted up. The calls are async, hence the state change may appear later, but nonetheless it lands in the component eventually.

### Actions

Define the capabilities of your app, along with some default or initial value. In this example I use `Symbol` to define unique constants that are being used for any further request of an action.

~~~ts
export const INC = 'INC';
export const DEC = 'DEC';
export const SET = 'SET';

export default {
  [INC]: () => 1, // initial value of payload, this can be omitted if you don't care
  [DEC]: () => -1,
  SET
};
~~~

### Reducer

Define, what happens if an action is being dispatched:

~~~ts
import { INC, DEC } from '../actions/counter.action';
import stateType from '../states/counter.state';

export default {
    [INC]: (state: stateType, payload: number) => {
      const counter = state.counter + payload;
      return { counter };
    },
    [DEC]: (state: stateType, payload: number) => {
      const counter = state.counter - payload;
      return { counter };
    }
};
~~~

The returned payload is the whole store object by reference. The type for the store is optional and helps elevating the power of TypeScript and getting a type safe store.

### Store and Dispatcher

The store holds the state, provides a dispatch function and fires events in case a store value changes. First, the store can by defined by types, but this is an option and you may decide to go with a simple object just for the sake of simplicity. The example shows a store that consists of fragments. This allows one to use parts of the store just by using the type fragments.

~~~ts
// This is a store fragment
export interface DemoTitleStore {
  title: string;
}
// This is a store fragment
export interface CounterStore {
  counter: number;
}
// This is the complete store, which can be used complete or in fragments
type store = CounterStore & DemoTitleStore;
// This is for convenient access
export default store;
~~~

Now the usage within a component. First, you must configure the store with the elements written before. As shown it's easy to combine reducers and add the various actions. To have the state typed a generic is being used.

~~~ts
import counterReducer from '../reducer/counter.reducer';
import setReducer from '../reducer/set.reducer';
import counterActions from '../actions/counter.action';
import storeStateType from '../states/counter.state';

const store = new Store<storeStateType>({
  actions: counterActions,
  mutations: { ...counterReducer, ...setReducer  },
  state: { counter: 0 }
});
~~~

Now make the *store* constant available in the component, if it's not yet defined there. This store can handle just on single component or spread multiple components and form eventually a single source of truth for the whole application.

~~~ts
@CustomElement('app-store-counter')
@ProvideStore<storeStateType>(store)
export class StoreCounterComponent extends StoreComponent<storeStateType, { cnt: number }> {
  constructor() {
    super();
    super.setData('cnt', 0);
    // fire if a value changes in the store, takes name of the store value
    this.store.subscribe('counter', str => {
      super.setData('cnt', str.counter);
    });
  }

  clickMeAdd(e) {
    console.log('Counter Element Click INC');
    this.store.dispatch(INC, 1);
  }

  clickMeSub(e) {
    console.log('Counter Element Click DEC');
    this.store.dispatch(DEC, 1);
  }

  clickMeSet(e) {
    console.log('Counter Element Click SET');
    this.store.dispatch(SET, 100);
  }

  render() {
    return (
      <>
        <div>
          <button type='button' n-on-Click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-Click={e => this.clickMeSub(e)} n-async>
            Sub 1
          </button>
          <button type='button' n-on-Click={e => this.clickMeSet(e)} n-async>
            Set 100
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{super.data.cnt}</pre>
      </>
    );
  }
}

~~~

## Type Handling in Typescript

The store has these basic parts as described before:

* Actions
* Reducer
* Store and Store Types

The Actions are basically string constants. The reducers get payload that's anything. The return value is the Store Type.

The store has two basic function:

* dispatch
* subscribe

You dispatch an Action along with a payload. So, the types are `string` and `any`.

When you receive a store event from a subscribe this subscription watches for changes of a part of the Store Type. The event handler receives the whole store, then.

### Example

Assume we deal with a CRUD component using a custom model like this:

~~~ts
import { Display } from "@nyaf/forms";
import { TemplateHint } from "@nyaf/forms";
import { Sortable } from "@nyaf/forms";
import { Hidden } from "@nyaf/forms";

export class ArchivModel {

	@Hidden()
	id: number = 0;

	@Display('Closet')
	@Sortable()
	@TemplateHint('table-column', { 'width': 50 })
	Closet: string = '';

	@Display('Name')
	@Sortable()
	@TemplateHint('table-column', { 'width': 100 })
	Name: string= '';

	@Display('Surname')
	@Sortable()
	@TemplateHint('table-column', { 'width': 100 })
	Surname: string = '';

	@Display('Birthday')
	@TemplateHint('table-column', { 'width': 100 })
  Birthday: string = '';

  @Display('Number of Files')
	@TemplateHint('table-column', { 'width': 30 })
  NoFiles: number = 1;

	@Display('Archived')
	@Sortable()
	@TemplateHint('table-column', { 'width': 50 })
	ArchivedYear: number = 2010;

}
~~~

The decorators are from the *@nyaf/forms* project.

Now, some actions are required:

~~~ts
import { ArchivModel } from "../model/archiv.model";

export const SEARCH = 'SEARCH';
export const ALL = 'ALL';
export const ARCHIVED = 'ARCHIVED';
export const EDIT = 'EDIT';
export const ADD = 'ADD';
export const SAVE = 'SAVE';
export const REMOVE = 'REMOVE';
export const HIDE = 'HIDE';

/**
 * The defaults that we use as long as the code hasn't sent anything.
 */
export default {
	[SEARCH]: () => '', // initial value of payload
	[ALL]: () => '',
	[ARCHIVED]: () => '',
	[EDIT]: () => new ArchivModel(),
	[ADD]: () => new ArchivModel(),
	[SAVE]: () => new ArchivModel(),
	[REMOVE]: () => 0,
	[HIDE]: () => 0
};
~~~

Also, some reducers doing the hard work:

~~~ts
import { SEARCH, ALL, ARCHIVED, ADD, REMOVE, EDIT, SAVE, HIDE } from '../actions/archive.actions';
import { archiveStoreType } from '../stores/archive.store';
import { DatabaseService } from 'app/services/database.service';
import { DataGridModel } from 'app/components/shared/grid/models/datagrid.model';
import { ArchivModel } from '../model/archiv.model';

import * as $sql from 'app/resources/sql.json';

/**
 * The reducer functions are the executing logic. They "do" what the action is asking for.
 */
export default {
	[SEARCH]: async (state: archiveStoreType, payload: string) => {
		const data: any = await DatabaseService.instance.instance.exec($sql.ArchivAnzeigenFilter, payload);
		const modelData = new DataGridModel<ArchivModel>(data, ArchivModel);
		state.gridResult = modelData;
		return state;
	},
	[ALL]: async (state: archiveStoreType, payload: string) => {
		const data: any = await DatabaseService.instance.instance.exec($sql.ArchivAnzeigen);
		const modelData = new DataGridModel<ArchivModel>(data, ArchivModel);
		state.gridResult = modelData;
		return state;
	},
	[ARCHIVED]: async (state: archiveStoreType, payload: string) => {
		const data: any = await DatabaseService.instance.instance.exec($sql.ArchivAnzeigenArchiviert);
		const modelData = new DataGridModel<ArchivModel>(data, ArchivModel);
		state.gridResult = modelData;
		return state;
	},
	[EDIT]: async (state: archiveStoreType, payload: number) => {
		const [current]: any = await DatabaseService.instance.instance.exec($sql.ArchivAnzeigenAktuelles, payload);
		state.current = current;
		return state;
	},
	[ADD]: (state: archiveStoreType, payload: ArchivModel) => {
		state.current = null;
		return state;
	},
	[SAVE]: async (state: archiveStoreType, payload: ArchivModel) => {
		const data: any = await DatabaseService.instance.instance.exec(
			payload.id ? $sql.ArchivAendern : $sql.ArchivErfassen,
			0, // im Moment nicht benutzt
			payload.Schrank,
			payload.Vorname,
			payload.Nachname,
			payload.Geburtsdatum,
			payload.AnzahlAkten,
			payload.ArchivJahr,
			payload.id
		);
		const modelData = new DataGridModel<ArchivModel>(data, ArchivModel);
		state.gridResult = modelData;
		return state;
	},
	[REMOVE]: async (state: archiveStoreType, payload: number) => {
		const data: any = await DatabaseService.instance.instance.exec($sql.ArchivEntfernenFinal, payload);
		const modelData = new DataGridModel<ArchivModel>(data, ArchivModel);
		state.gridResult = modelData;
		return state;
	},
	[HIDE]: async (state: archiveStoreType, payload: number) => {
		const data: any = await DatabaseService.instance.instance.exec($sql.ArchivEntfernen, payload);
		const modelData = new DataGridModel<ArchivModel>(data, ArchivModel);
		state.gridResult = modelData;
		return state;
	}
};
~~~

*DatabaseService.instance.instance* is a service class with singleton pattern. It executes SQL. *$sql* provides the statements from a resource file.

THe store summarizes all this for easy processing:

~~~ts
import { ArchivModel } from "../model/archiv.model";
import { DataGridModel } from "app/components/shared/grid/models/datagrid.model";

export interface ArchiveStore {
	current: ArchivModel;
	gridResult: DataGridModel<ArchivModel>;
}

/**
 * A store contains a data structure that helds up to the entire app's state.
 * It can have any complexity, from a single value up to deep nested objects.
 */
export interface ActionStore {
  search: string;
}

/**
 * We export a single store type that contains all single stores as one default.
 */
export type archiveStoreType = ActionStore & ArchiveStore;

import archiveReducer from '../reducer/archive.reducer';
import archiveActions, { SEARCH, ADD, REMOVE, ALL, ARCHIVED, EDIT } from '../actions/archive.actions';
import { Store } from "@nyaf/store";

const store = new Store<archiveStoreType>({
  actions: archiveActions,
  reducer: { ...archiveReducer },
  state: { search: '', current: null, gridResult: null }
});

export default store;
~~~

Now, the component can dispatch actions with payloads and receive store changes.

~~~ts
@CustomElement("tab-archive-search")
@ProvideStore<archiveStoreType>(store)
export class ArchiveSearchComponent extends StoreComponent<archiveStoreType, {}> {

	constructor() {
		super();
		this.store.subscribe('gridResult', (data: archiveStoreType) => {
      // Do something with the data
		});
	}

 	private async showAll(e?: Event) {
		this.store.dispatch(ALL, null);
	}

  // render omitted for brevity
}
~~~

The reducer receives the *ALL* action. It pulls all the data and sets the *gridResult* object. The subscriber listens for this and can handle the data (re-render, for example).

The essential part is here that the return value of the subscriber is always the Store Type (here *archiveStoreType*). So you don't need to think about the current type and TypeScript resolves the types within properly. However, the subscriber is for just one property of the store and only changes of this property will trigger the handler. To get the data, access it like this:

~~~ts
archiveStoreType.gridResult
~~~

The underlying object is `Proxy`, not your actual type.

# Installation

Install the package:

~~~bash
npm i @nyaf/store -S
~~~
