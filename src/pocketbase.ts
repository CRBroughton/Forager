import PocketBase from 'pocketbase'
import type { ItemsRecord } from './pocketbase-types'

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

  // const getUserLngLat = async () => {
  //   try {
  //     const response = await pb.collection('users').getOne()
  //   }
  //   catch (error: unknown) {
  //     console.log(error)
  //   }
  // }

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
  }
}
