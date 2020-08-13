## Type Handling in Typescript

The store has these basic parts as described before:

- Actions
- Reducer
- Store and Store Types

The Actions are basically string constants. The reducers get payload that's anything. The return value is the Store Type.

The store has two basic function:

- dispatch
- subscribe

You dispatch an Action along with a payload. So, the types are `string` and `any`.

When you receive a store event from a subscribe this subscription watches for changes of a part of the Store Type. The event handler receives the whole store, then.

### Example

Assume we deal with a CRUD (Create, Read, Update, Delete) component using a custom model like this:

```ts
import { Display } from '@nyaf/forms';
import { TemplateHint } from '@nyaf/forms';
import { Sortable } from '@nyaf/forms';
import { Hidden } from '@nyaf/forms';

export class ArchivModel {
  @Hidden()
  id: number = 0;

  @Display('Closet')
  @Sortable()
  @TemplateHint('table-column', { width: 50 })
  Closet: string = '';

  @Display('Name')
  @Sortable()
  @TemplateHint('table-column', { width: 100 })
  Name: string = '';

  @Display('Surname')
  @Sortable()
  @TemplateHint('table-column', { width: 100 })
  Surname: string = '';

  @Display('Birthday')
  @TemplateHint('table-column', { width: 100 })
  Birthday: string = '';

  @Display('Number of Files')
  @TemplateHint('table-column', { width: 30 })
  NoFiles: number = 1;

  @Display('Archived')
  @Sortable()
  @TemplateHint('table-column', { width: 50 })
  ArchivedYear: number = 2010;
}
```

The decorators are from the _@nyaf/forms_ project.

Now, some actions are required:

```ts
import { ArchivModel } from '../model/archiv.model';

export const ALL = 'ALL';
export const EDIT = 'EDIT';
export const ADD = 'ADD';
export const SAVE = 'SAVE';
export const REMOVE = 'REMOVE';

/**
 * The defaults that we use as long as the code hasn't sent anything.
 */
export default {
  [ALL]: () => '',
  [EDIT]: () => new ArchivModel(),
  [ADD]: () => new ArchivModel(),
  [SAVE]: () => new ArchivModel(),
  [REMOVE]: () => 0,
};
```

Also, some reducers doing the hard work:

```ts
import { ALL, ADD, REMOVE, EDIT, SAVE } from '../actions/archive.actions';
import { archiveStoreType } from '../stores/archive.store';
import { DatabaseService } from 'app/services/database.service';
import { DataGridModel } from 'app/components/shared/grid/models/datagrid.model';
import { ArchivModel } from '../model/archiv.model';

import * as $sql from 'app/resources/sql.json';

/**
 * The reducer functions are the executing logic. They "do" what the action is asking for.
 */
export default {
  [ALL]: async (state: archiveStoreType, payload: string) => {
    const data: any = await DatabaseService.instance.instance.exec($sql.ArchivAnzeigen);
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
      payload.id ? $sql.ArchivUpdate : $sql.ArchivInsert,
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
};
```

_DatabaseService.instance.instance_ is a service class with singleton pattern. It executes SQL. _\$sql_ provides the statements from a resource file.

The store summarizes all this for easy processing:

```ts
import { ArchivModel } from '../model/archiv.model';
import { DataGridModel } from 'app/components/shared/grid/models/datagrid.model';

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
import { Store } from '@nyaf/store';

const store = new Store<archiveStoreType>({
  actions: archiveActions,
  reducer: { ...archiveReducer },
  state: { search: '', current: null, gridResult: null },
});

export default store;
```

Now, the component can dispatch actions with payloads and receive store changes.

```ts
@CustomElement('tab-archive-search')
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
```

The reducer receives the _ALL_ action. It pulls all the data and sets the _gridResult_ object. The subscriber listens for this and can handle the data (re-render, for example).

The essential part is here that the return value of the subscriber is always the Store Type (here _archiveStoreType_). So you don't need to think about the current type and TypeScript resolves the types within properly. However, the subscriber is for just one property of the store and only changes of this property will trigger the handler. To get the data, access it like this:

```ts
archiveStoreType.gridResult;
```

The underlying object is `Proxy`, not your actual type.
