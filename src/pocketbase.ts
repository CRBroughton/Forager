import PocketBase from 'pocketbase'
import type { ItemsRecord, UsersRecord } from './pocketbase-types'

export const isError = (err: unknown): err is Error => err instanceof Error

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

interface healthCheckResponse {
  code: number
  message: string
}

export function usePocketBase() {
  const health = ref<healthCheckResponse>()
  const items = ref<ItemsRecord[]>()

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
    health,
    items,
    getHealth,
    getItems,
    createItem,
  }
}
