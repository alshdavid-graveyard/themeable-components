import { BehaviorSubject } from 'rxjs'
import { Configurables } from './configurables'
 
export class ConfigurableStore {
  configurableState = new BehaviorSubject<Configurables>({})

  get configurables() {
    return this.configurableState.value
  }

  get subscribe() {
    return this.configurableState.subscribe.bind(this.configurableState)
  }

  putConfigurables(configurables: Configurables) {
    const update = { 
      ...this.configurables,
      ...configurables 
    }
    this.configurableState.next(update)
  }
}
