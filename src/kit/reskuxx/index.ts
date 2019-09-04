import { createStore, combineReducers, Store, Reducer } from "redux";
import { BehaviorSubject } from "rxjs";

export class Reskuxx {
  $store: BehaviorSubject<any>;
  store: Store<any>;
  reducers: Reducer;

  get state() {
    return this.store.getState();
  }

  get subscribe() {
    return this.$store.subscribe.bind(this.$store);
  }

  get pipe() {
    return this.$store.pipe.bind(this.$store);
  }

  get dispatch() {
    return this.store.dispatch.bind(this.store);
  }

  constructor() {
    this.reducers = () => ({})
    this.store = createStore(
      this.reducers,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
    this.$store = new BehaviorSubject({});
    this.store.subscribe(() => this.$store.next(this.state));
  }

  addReducer(key: string, reducer: Reducer) {
    this.reducers = combineReducers({
      ...this.reducers,
      [key]: reducer
    });
    this.store.replaceReducer(this.reducers);
  }
}
