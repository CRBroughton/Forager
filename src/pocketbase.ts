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

  return {
    health,
    getHealth,
  }
}
