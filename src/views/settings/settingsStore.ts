export function useSettingsStore() {
  const imagesOpen = ref(false)
  const accountSettingsOpen = ref(false)

  const toggleImageMenu = () => {
    imagesOpen.value = !imagesOpen.value
  }

  const toggleAccountMenu = () => {
    accountSettingsOpen.value = !accountSettingsOpen.value
  }

  return {
    imagesOpen,
    accountSettingsOpen,
    toggleImageMenu,
    toggleAccountMenu,
  }
}

const storeKey: InjectionKey<ReturnType<typeof useSettingsStore>> = Symbol('settings-store')

export function provideSettingsStore() {
  const store = useSettingsStore()
  provide(storeKey, store)
  return store
}

export function injectSettingsStore() {
  return inject(storeKey)!
}
