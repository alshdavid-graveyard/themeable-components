export type UnsubscribableFn = (...args: any[]) => any

export interface UnsubscribableStr {
  unsubscribe(): any;
}
export type Unsubscribable = UnsubscribableFn | UnsubscribableStr

export type SubscribableFn<T> = (<T>(cb?: any, ...args: any[]) => Unsubscribable)

export interface SubscribableStr<T> {
  subscribe(cb: (value: T) => any, ...args: any[]): Unsubscribable
  getValue?(): T
  value?: T
}

export type Subscribable<T> = SubscribableStr<T> | SubscribableFn<T>
