import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { ConfigurableStore } from '~/platform/theme' 

interface State {
  configurableStore: ConfigurableStore
}

export const AppContext = createContext<State>(null as any)
export const useAppContext = () => useContext(AppContext)