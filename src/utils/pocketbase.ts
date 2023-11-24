import PocketBase from 'pocketbase'
import type { UserRecordWithID } from '@/types'

const state = useStorage('forager-store', {
  server: import.meta.env.VITE_POCKETBASE_URL,
})

export const pb = new PocketBase(state.value.server)
export const user = ref(pb.authStore.model) as Ref<UserRecordWithID>

export const usersSavedColours = computed(() => {
  const colours: string[] = []

  user.value.images.forEach((image) => {
    if (colours.includes(image.colour))
      return
    if (image.colour === '')
      return
    colours.push(image.colour, image.colour)
  })
  return colours
})

export const errorMessage = ref<Error | undefined>(undefined)
export function setErrorMessage(message: Error) {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = undefined
  }, 1000)
}
