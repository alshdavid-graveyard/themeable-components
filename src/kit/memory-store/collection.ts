import { Engine } from "./engine";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class Collection<T = Record<string, any>> {
  onUpdate: Observable<T>

  public get value(): T {
    return this.store.value[this.collectionName];
  }

  public get subscribe() {
    return this.onUpdate.subscribe.bind(this.onUpdate);
  }

  public get pipe() {
    return this.onUpdate.pipe.bind(this.onUpdate);
  }

  constructor(
    private store: Engine,
    private collectionName: string,
  ) {
    this.onUpdate = this.store
      .pipe(map((state: any) => state[this.collectionName]))
  }

  getValue(): T {
    return this.value
  }

  query = (fn: (value: T) => T) => 
    this.store.query(() => ({ [this.collectionName]: fn(this.value) }))

  as = (alias: string) => {
    const prepared = this.store
      .as(`[${this.collectionName}] ${alias}`)
    
    return {
      query: (fn: (value: T) => T) => 
        prepared.query(
          () => ({ [this.collectionName]: fn(this.value) })
        )
    }
  }
}