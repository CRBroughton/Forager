export const useSettingsStore = defineStore('settings-store', () => {
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
})
