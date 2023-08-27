import PocketBase from 'pocketbase'
import type { ItemsRecord, UsersRecord } from './pocketbase-types'

export const isError = (err: unknown): err is Error => err instanceof Error

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

interface healthCheckResponse {
  code: number
  message: string
}

export function usePocketBase() {
  const user = ref(pb.authStore.model)
  const username = ref('')
  const password = ref('')
  const health = ref<healthCheckResponse>()
  const items = ref<ItemsRecord[]>()
  const selectedItemPocketbase = ref<ItemsRecord & { id: string }>()

  pb.authStore.onChange(() => user.value = pb.authStore.model)

  const getHealth = async () => {
    try {
      const response = await pb.health.check()
      health.value = response
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const logout = () => {
    pb.authStore.clear()
  }

  const login = async () => {
    try {
      await pb.collection('users').authWithPassword(username.value, password.value)
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const refresh = async () => {
    try {
      await pb.collection('users').authRefresh()
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const setUserLngLat = async () => {
    try {
      if (user.value && user.value.lat && user.value.lng) {
        await pb.collection('users').update<UsersRecord>(user.value!.id, {
          lng: user.value.lng,
          lat: user.value.lat,
        })
      }
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const getItems = async () => {
    try {
      const response = await pb.collection('items').getFullList<ItemsRecord>()

      items.value = response
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const getSelectedItem = async (selected: string) => {
    try {
      // or fetch only the first record that matches the specified filter
      selectedItemPocketbase.value = await pb.collection('items').getFirstListItem(`name="${selected}"`)
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const createItem = async (data: ItemsRecord) => {
    try {
      await pb.collection('items').create(data)
      await getItems()
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      await pb.collection('items').delete(id)
      await getItems()
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return {
    pb,
    user,
    username,
    password,
    health,
    items,
    login,
    logout,
    refresh,
    getHealth,
    getItems,
    createItem,
    setUserLngLat,
    getSelectedItem,
    selectedItemPocketbase,
    deleteItem,
  }
}

const storeKey: InjectionKey<ReturnType<typeof usePocketBase>> = Symbol('pocketbase-store')

export function providePocketBaseStore() {
  const store = usePocketBase()
  provide(storeKey, store)
  return store
}

export function injectPocketBaseStore() {
  return inject(storeKey)!
}
