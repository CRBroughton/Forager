// // useStore could be anything like useUser, useCart

// import type { InjectionKey } from 'vue'

export function useStore() {
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  return {
    count,
    increment,
    decrement,
  }
}
// Used for provide/inject

// const storeKey: InjectionKey<ReturnType<typeof useStore>> = Symbol('store')

// export function ProvideStore() {
//   const store = useStore()
//   provide(storeKey, store)
//   return store
// }

// export function InjectStore() {
//   return inject(storeKey)!
// }
