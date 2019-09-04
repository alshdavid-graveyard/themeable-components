import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Configurables } from './configurables'
import { Query, Labels, collectionName } from './queries'
import { MemoryStore } from '~/kit/memory-store';

export class ConfigurablesService {
  private configurables: Observable<Configurables>

  public get subscribe() {
    return this.configurables.subscribe.bind(this.configurables)
  }

  public get pipe() {
    return this.configurables.pipe.bind(this.configurables)
  }

  public get value() {
    return this.store.value[collectionName]
  }

  constructor(
    private store: MemoryStore
  ) {
    // Setting up piece of state
    this.store
      .withLabel(Labels.init)
      .query(Query.init)
    
    // This is essentially a selector
    this.configurables = this.store
      .pipe(map(state => state[collectionName]))
  }

  public putConfigurables(configurables: Configurables) {
    this.store
      .withLabel(Labels.put)
      .query(Query.put(configurables))
  }
}
