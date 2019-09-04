import { useState, useEffect } from "preact/hooks";
import { Subscribable, SubscribableFn, Unsubscribable } from './types'

export const useSubscribe = <T = any>(
  subscribable: Subscribable<T>, 
  defaultValue?: T,
  getterFn?: () => T
): T => { 
  if (
    typeof subscribable !== "function" && 
    subscribable.value
  ) {
    defaultValue = subscribable.value
  }
  if (
    typeof subscribable !== "function" &&
    subscribable.getValue
  ) {
    defaultValue = subscribable.getValue()
  }
  if (getterFn) {
    defaultValue = getterFn()
  }
  const [ value, setValue ] = useState(defaultValue);

  useEffect(
    () => {
      let subscribe: SubscribableFn<T>
      if (typeof subscribable === "function") {
        subscribe = subscribable
      } else {
        subscribe = (cb: any, ...args: any[]) => subscribable.subscribe(cb, ...args)
      }
      let subscription: Unsubscribable
      if (getterFn) {
        subscription = subscribe(() => setValue(getterFn()));
      } else {
        subscription = subscribe(setValue);
      }
      return () => {
        if (typeof subscription === "function") {
          subscription()
        } else {
          subscription.unsubscribe()
        }
      }
    },
    [ subscribable ]
  );
  return value as T;
};