import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { ConfigurablesService } from '~/platform/theme' 

interface State {
  configurablesService: ConfigurablesService
}

export const AppContext = createContext<State>(null as any)
export const useServices = () => useContext(AppContext) 