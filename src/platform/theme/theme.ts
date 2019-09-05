import { Configurables } from './configurables'
import { Query, Labels, collectionName, ConfigurablesCollection } from './queries'
import { State } from '~/kit/memory-store';

export class ConfigurablesService {
  private collection: State.Collection<ConfigurablesCollection>

  public get subscribe() {
    return this.collection.subscribe.bind(this.collection)
  }

  public get pipe() {
    return this.collection.pipe.bind(this.collection)
  }

  public get value() {
    return this.collection.value
  }

  constructor(
    private store: State.Engine
  ) {
    this.collection = new State.Collection(this.store, collectionName)
    this.collection.query(Query.init)
  }

  public putConfigurables(configurables: Configurables) {
    this.collection
      .as(Labels.put)
      .query(Query.put(configurables))
  }
}
