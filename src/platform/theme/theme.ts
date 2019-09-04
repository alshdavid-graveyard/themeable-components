import { BehaviorSubject } from 'rxjs'
import { Configurables } from './configurables'
 
type ThemeKeys = Record<string, string>

export class ConfigurableStore {
  configurables = new BehaviorSubject<Configurables>({})

  get value() {
    return this.configurables.value
  }

  get subscribe() {
    return this.configurables.subscribe.bind(this.configurables)
  }

  putConfigurables(themeKey: ThemeKeys) {
    const update = { 
      ...this.value, 
      ...themeKey 
    }
    this.configurables.next(update)
  }
}
