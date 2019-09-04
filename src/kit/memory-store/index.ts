import { BehaviorSubject } from 'rxjs'
const cloneDeep = <T>(target: T): T => JSON.parse(JSON.stringify(target))

interface DevTools {
  send(action: string, state: any): void
  subscribe(cb: (data: any) => void): void
  init(value: any): void
}

export class MemoryStore {
  private tools: DevTools | undefined
  private store: BehaviorSubject<any>

  public get value() {
    return this.store.value;
  }

  public get subscribe() {
    return this.store.subscribe.bind(this.store);
  }

  public get pipe() {
    return this.store.pipe.bind(this.store);
  }

  constructor({
    debug = false,
    initialValue = {},
  } = {}) {
    this.store = new BehaviorSubject(initialValue)
    if (debug === true) {
      this.tools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
      this.tools!.subscribe((this.debugOnUpdate))
      this.tools!.init(initialValue)
    }
  }

  public withLabel = (actionName: string) => ({
    query: (fn: (state: any) => any) => this.query(fn, actionName)
  })
  
  public query(fn: (state: any) => any, action: string = 'QUERY_EXEC') {
    const getState = () => cloneDeep(this.store.getValue())
    const update = fn(getState())
    // if (isEqual(this.store.getValue(), update)) {
    //   this.debugLog('NO_CHANGE_IGNORED')
    //   return
    // }
    this.store.next(cloneDeep({ ...this.value, ...update}))
    this.debugLog(action)
  }

  private debugOnUpdate = ({ type, state }: any) => {
    if (type !== 'DISPATCH') {
      return
    }
    this.store.next(JSON.parse(state))
  }

  private debugLog(
    action: string, 
  ) {
    if (!this.tools) {
      return
    }
    this.tools.send(action, this.store.getValue())
  }
}