import { Configurables } from "./configurables";

export const collectionName = 'Configurables'

export interface ConfigurablesCollection {
  items: Configurables
}

export const init = () => ({
  items: {}
})

export const put = (configurables: Configurables) => (state: ConfigurablesCollection) => ({
  items: {
    ...state.items,
    ...configurables,
  }
})

export const Query = {
  init,
  put,
}

export const Labels = {
  init: 'CONFIGURABLES_INIT',
  put: 'CONFIGURABLES_PUT',
}