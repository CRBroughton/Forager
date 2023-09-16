import PocketBase from 'pocketbase'
import type { ItemsRecord, ServicesRecord, UsersRecord } from './pocketbase-types'
import type { ItemsRecordWithID } from './types'

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
  const passwordConfirm = ref('')
  const isCreatingAccount = ref(false)
  const health = ref<healthCheckResponse>()
  const selectedItemPocketbase = ref<ItemsRecordWithID>()

  pb.authStore.onChange(() => user.value = pb.authStore.model)

  const getHealth = async () => {
    try {
      const response = await pb.health.check()
      health.value = response
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
      health.value = undefined
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

  const createAccount = async () => {
    try {
      await pb.collection('users').create({
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        images: [],
      })

      await login()
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const canCreateAccount = async () => {
    try {
      const services = await pb.collection('services').getFullList<ServicesRecord>()
      return services[0].canCreateAccounts
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
    let response: ItemsRecordWithID[] = []
    try {
      response = await pb.collection('items').getFullList<ItemsRecordWithID>()
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    return response
  }

  const getSelectedItem = async (id: string) => {
    try {
      // or fetch only the first record that matches the specified filter
      selectedItemPocketbase.value = await pb.collection('items').getOne(id)
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const createItem = async (data: ItemsRecord) => {
    try {
      await pb.collection('items').create(data)
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const createItems = async (items: ItemsRecordWithID[]) => {
    const promises: Promise<boolean>[] = []

    try {
      items.forEach(async (item) => {
        promises.push(
          pb.collection('items').create(item, { requestKey: null }),
        )
      })
      Promise.all(promises)
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

  const updateForageDate = async (id: string) => {
    try {
      selectedItemPocketbase.value = await pb.collection('items').update<ItemsRecordWithID>(id, {
        lastForaged: new Date().toISOString(),
      })
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const updateDisclaimerAgreement = async () => {
    try {
      await pb.collection('users').update<UsersRecord>(user.value!.id, {
        disclaimerAgreed: true,
      })
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  interface UserImage {
    name: string
    url: string
    colour: string
  }
  const createImage = async (img: UserImage) => {
    const images = user.value?.images ? [...user.value?.images, img] : [img]
    try {
      await pb.collection('users').update<UsersRecord<UserImage[]>>(user.value!.id, {
        images,
      })
    }
    catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const deleteAllMarkers = async (items: ItemsRecordWithID[]) => {
    const promises: Promise<boolean>[] = []
    try {
      // eslint-disable-next-line no-console
      console.log(items)
      items.forEach((item) => {
        promises.push(
          pb.collection('items').delete(item.id),
        )
      })
      Promise.all(promises)
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
    passwordConfirm,
    isCreatingAccount,
    health,
    login,
    logout,
    refresh,
    createAccount,
    canCreateAccount,
    getHealth,
    getItems,
    createItem,
    setUserLngLat,
    getSelectedItem,
    selectedItemPocketbase,
    deleteItem,
    updateForageDate,
    updateDisclaimerAgreement,
    createImage,
    deleteAllMarkers,
    createItems,
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
