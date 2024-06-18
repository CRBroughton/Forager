import type { ItemsRecord, LandmarksRecord, ServicesRecord, UsersRecord } from '../pocketbase-types'
import type { ItemsRecordWithID, LandmarksRecordWithID, UserRecordWithID } from '../types'
import { pb, setErrorMessage, user } from '@/utils/pocketbase'
import { isError } from '@/utils/isError'

interface AuthError {
  code: number
  message: string
  data: AuthErrorData
}

interface AuthErrorData {
  code: number
  message: string
  data: Record<string, string>
}

function isAuthError(err: unknown): err is AuthError {
  return (err as AuthError).data.message === 'The request requires valid record authorization token to be set.' && (err as AuthError).data.code === 401
}

interface healthCheckResponse {
  code: number
  message: string
}

export const usePocketBase = defineStore('pocketbase-store', () => {
  const username = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const mapboxAPIKey = ref('')
  const isCreatingAccount = ref(false)
  const health = ref<healthCheckResponse>()
  const selectedItemPocketbase = ref<ItemsRecordWithID>()

  pb.authStore.onChange(() => user.value = pb.authStore.model as UserRecordWithID)

  const getHealth = async () => {
    try {
      const response = await pb.health.check()
      health.value = response
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
      health.value = undefined
    }
  }

  const logout = () => {
    pb.authStore.clear()
  }

  const login = async () => {
    try {
      await pb.collection('users').authWithPassword(username.value, password.value)
      return 'success'
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const loginWithDiscord = async () => {
    try {
      await pb.collection('users').authWithOAuth2({ provider: 'discord' })
      await pb.collection('users').update(user.value!.id, {
        mapboxAPIKey: mapboxAPIKey.value,
        images: [],
      })
      return 'success'
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const canSignUp = computed(() => {
    return username.value && password.value && passwordConfirm.value && mapboxAPIKey.value
  })

  const canLogin = computed(() => {
    return username.value && password.value
  })

  const createAccount = async () => {
    try {
      await pb.collection('users').create({
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        mapboxAPIKey: mapboxAPIKey.value,
        images: [],
      })

      await login()
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const updateAccountData = async (data: UserRecordWithID) => {
    try {
      selectedItemPocketbase.value = await pb.collection('users').update<ItemsRecordWithID>(user.value!.id, {
        images: data.images,
        lat: data.lat,
        lng: data.lng,
        name: data.name,
        email: data.email,

      })
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  interface Position {
    lng: number
    lat: number
  }
  const setUserLocation = async (position: Position) => {
    try {
      await pb.collection('users').update(user.value!.id, {
        lat: position.lat,
        lng: position.lng,
      })
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const canCreateAccount = async () => {
    try {
      const services = await pb.collection('services').getFullList<ServicesRecord>()
      return services[0].canCreateAccounts
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const refresh = async () => {
    try {
      await pb.collection('users').authRefresh()
    }

    catch (error: unknown) {
      if (isError(error) && isAuthError(error))
        pb.authStore.clear()

      if (isError(error))
        setErrorMessage(error)
    }
  }

  const getItems = async () => {
    let response: ItemsRecordWithID[] = []
    try {
      response = await pb.collection('items').getFullList<ItemsRecordWithID>()
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
    return response
  }

  const getLandmarks = async () => {
    let response: LandmarksRecordWithID[] = []
    try {
      response = await pb.collection('landmarks').getFullList<LandmarksRecordWithID>()
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
    return response
  }

  const getSelectedItem = async (id: string, collection: string) => {
    try {
      // or fetch only the first record that matches the specified filter
      selectedItemPocketbase.value = await pb.collection(collection).getOne(id)
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const createItem = async (data: ItemsRecord) => {
    try {
      await pb.collection('items').create(data)
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const createItems = async (items: ItemsRecordWithID[]) => {
    const promises: Promise<boolean>[] = []

    try {
      items.forEach(async (item) => {
        promises.push(
          pb.collection('items').create(
            { ...item, owner: user.value?.id },
            { requestKey: null },
          ),
        )
      })
      Promise.all(promises)
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const deleteItem = async (id: string, collection: string) => {
    try {
      await pb.collection(collection).delete(id)
      await getItems()
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const updateForageDate = async (id: string) => {
    try {
      selectedItemPocketbase.value = await pb.collection('items').update<ItemsRecordWithID>(id, {
        lastForaged: new Date().toISOString(),
      })
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const updateDisclaimerAgreement = async () => {
    try {
      await pb.collection('users').update<UsersRecord>(user.value!.id, {
        disclaimerAgreed: true,
      })
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  interface UserImage {
    name: string
    url: string
    colour: string
    startMonth: string
    endMonth: string
  }
  const createImage = async (img: UserImage) => {
    const images = user.value?.images ? [...user.value?.images, img] : [img]
    try {
      await pb.collection('users').update<UsersRecord<UserImage[]>>(user.value!.id, {
        images,
      })
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const deleteAllMarkers = async (items: ItemsRecordWithID[] | null) => {
    if (items === null)
      return
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
      if (isError(error))
        setErrorMessage(error)
    }
  }

  // const getRoutes = async () => {
  //   try {
  //     return await pb.collection('routes').getFullList()
  //   }
  //   catch (error) {
  //     if (isError(error))
  //       setErrorMessage(error)
  //   }
  // }

  // const getRoute = async (id: string) => {
  //   try {
  //     return await pb.collection('routes').getOne(id)
  //   }
  //   catch (error) {
  //     if (isError(error))
  //       setErrorMessage(error)
  //   }
  // }

  const deleteReferenceImage = async (removedImage: UserImage) => {
    const filteredImages: UserImage[] = user.value!.images.filter((image: UserImage) => image !== removedImage)
    try {
      await pb.collection('users').update<UsersRecord<UserImage[]>>(user.value!.id, {
        images: filteredImages,
      })
      user.value!.images = filteredImages
    }
    catch (error) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  const createLandmark = async (data: LandmarksRecord) => {
    try {
      await pb.collection('landmarks').create(data)
    }
    catch (error: unknown) {
      if (isError(error))
        setErrorMessage(error)
    }
  }

  return {
    deleteReferenceImage,
    // getRoute,
    // getRoutes,
    pb,
    user,
    username,
    password,
    passwordConfirm,
    mapboxAPIKey,
    isCreatingAccount,
    health,
    login,
    logout,
    refresh,
    createAccount,
    canSignUp,
    canLogin,
    canCreateAccount,
    getHealth,
    getItems,
    createItem,
    getSelectedItem,
    selectedItemPocketbase,
    deleteItem,
    updateForageDate,
    updateDisclaimerAgreement,
    createImage,
    deleteAllMarkers,
    createItems,
    updateAccountData,
    setUserLocation,
    setErrorMessage,
    createLandmark,
    getLandmarks,
    loginWithDiscord,
  }
})
