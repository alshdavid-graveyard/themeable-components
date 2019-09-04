import { Configurables } from "./configurables";

export const collectionName = 'Configurables'

export interface State {
  [collectionName]: Configurables
}

export const init = (state: State) => ({
  [collectionName]: {}
})

export const put = (configurables: Configurables) => (state: State) => ({
  [collectionName]: {
    ...state[collectionName],
    ...configurables,
  },
})

export const Queries = {
  init,
  put,
}

export const Labels = {
  init: 'CONFIGURABLES_INIT',
  put: 'CONFIGURABLES_PUT',
}