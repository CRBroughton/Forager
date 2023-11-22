import PocketBase from 'pocketbase'

const state = useStorage('forager-store', {
  server: import.meta.env.VITE_POCKETBASE_URL,
})

export const pb = new PocketBase(state.value.server)
export const user = ref(pb.authStore.model)

export const errorMessage = ref<Error | undefined>(undefined)
export function setErrorMessage(message: Error) {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = undefined
  }, 1000)
}
