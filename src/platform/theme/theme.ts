import { Observable } from 'rxjs'
import { map, first, defaultIfEmpty, tap } from 'rxjs/operators'
import { Configurables } from './configurables'
import { Reskuxx } from '~/kit/reskuxx';
import { AnyAction, combineReducers } from 'redux';

const collectionName = 'Configurables'
const addAction = 'Configurables.Collection.Add'

const configurablesCollection = (
  state: Configurables = {}, 
  action: AnyAction
) => {
  if (action.type === addAction) {
    state = action.update
  }
  return state
}

 
export class ConfigurablesService {
  $configurables: Observable<Configurables>

  get subscribe() {
    return this.$configurables.subscribe.bind(this.$configurables)
  }

  get pipe() {
    return this.$configurables.pipe.bind(this.$configurables)
  }

  constructor(
    private store: Reskuxx
  ) {
    this.store.addReducer(collectionName, configurablesCollection)
    this.$configurables = this.store
      .pipe(
        map(state => state[collectionName]),
        defaultIfEmpty({}),
      )
  }

  getValue() {
    return this.store.state[collectionName]
  }

  getConfigurables() {
    return this.pipe(first()).toPromise()
  }

  async putConfigurables(configurables: Configurables) {
    const update = { 
      ...await this.getConfigurables(),
      ...configurables
    }
    this.store.dispatch({ type: addAction, update })
  }
}
