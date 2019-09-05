import { Engine } from "./engine";

export const Create = ({
  useReduxTools = false,
  initialValue = {},
} = {}): Engine => {
  let reduxTools
  if (
    useReduxTools && 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ) {
    reduxTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  }
  return new Engine(
    initialValue,
    reduxTools,
  )
}