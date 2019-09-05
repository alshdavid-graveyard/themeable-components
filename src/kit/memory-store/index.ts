import { Engine as OGEngine } from './engine'
import { Create } from './create'
import { Collection as OGCollection } from './collection'

export const State = {
  Create,
  Engine: OGEngine,
  Collection: OGCollection
}

export declare module State {
  export type Engine = OGEngine
  export type Collection<T> = OGCollection<T>
}
