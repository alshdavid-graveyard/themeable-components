import { BehaviorSubject, Observable } from 'rxjs'
import { QueryAction } from './defaults';

export interface DevTools {
  connect(): DevTools
  send(action: string, state: any): void
  subscribe(cb: (data: any) => void): void
  init(value: any): void
}

export class Engine {
  private tools: DevTools | undefined
  private store: BehaviorSubject<Record<string, any>>

  public get value() {
    return this.store.value;
  }

  public get subscribe() {
    return this.store.subscribe.bind(this.store);
  }

  public get pipe() {
    return this.store.pipe.bind(this.store);
  }

  constructor(
    initialValue: Record<string, any> = {},
    devTools?: DevTools
  ) {
    this.store = new BehaviorSubject(initialValue)
    if (devTools) {
      this.tools = devTools.connect()
      this.tools!.subscribe((this.debugOnUpdate))
      this.tools!.init(initialValue)
    }
  }

  public as = (actionName: string) => ({
    query: (fn: (state: any) => any) => this.query(fn, actionName)
  })
  
  public query(fn: (state: any) => any, action: string = QueryAction) {
    const update = fn(this.store.getValue())
    this.store.next({ ...this.store.getValue(), ...update })
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

