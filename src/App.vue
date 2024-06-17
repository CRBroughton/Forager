<script setup lang="ts">
import { notifications, useMapbox, usePocketBase } from '@/stores'
import { errorMessage, user } from '@/utils/pocketbase'

const pocketbaseStore = usePocketBase()
const mapboxStore = useMapbox()
const { username, password, passwordConfirm, mapboxAPIKey, isCreatingAccount, isCreatingDiscountAccount, canSignUp } = storeToRefs(pocketbaseStore)
const canCreateAccounts = ref<boolean | undefined>(false)
const notificationsStore = notifications()

onMounted(async () => {
  canCreateAccounts.value = await pocketbaseStore.canCreateAccount()
  if (pocketbaseStore.pb.authStore.token && user.value && user.value.disclaimerAgreed && user.value.mapboxAPIKey) {
    await mapboxStore.initMapbox()
    await pocketbaseStore.refresh()
  }
})

watch(() => user.value?.images, () => {
  if (
    user.value?.images !== undefined
    && user.value?.images !== null
  ) {
    useTimeoutFn(() => {
      notificationsStore.triggerForagableNotification(user.value!.images)
    }, 3000)
  }
})

function hideAddMarker() {
  mapboxStore.markerUIHidden = true
}

const settingsMenu = ref(false)

function closeSettingsMenu() {
  settingsMenu.value = false
}

function openSettingsMenu() {
  settingsMenu.value = true
}

async function loginInUser() {
  const result = await pocketbaseStore.login()

  if (result === 'success')
    location.reload()
}

async function loginUserWithDiscord(firstLogin: boolean) {
  const result = await pocketbaseStore.loginWithDiscord(firstLogin)

  if (result === 'success')
    location.reload()
}

async function agree() {
  await pocketbaseStore.updateDisclaimerAgreement()
  location.reload()
  await mapboxStore.initMapbox()
}

const homeNotSet = computed(() => {
  return user.value?.lat === 0 && user.value?.lng === 0
})

const settingsMenuVisible = ref(false)
</script>

<template>
  <div v-if="!user" class="login">
    <ErrorMessage :error-message="errorMessage" />
    <LoginForm @toggle-settings="settingsMenuVisible = !settingsMenuVisible">
      <input v-if="!isCreatingDiscountAccount" v-model="username" class="login-input" placeholder="enter username" required>
      <input v-if="!isCreatingDiscountAccount" v-model="password" class="login-input" type="password" placeholder="enter password" required>
      <input
        v-if="isCreatingAccount && !isCreatingDiscountAccount"
        v-model="passwordConfirm" class="login-input" placeholder="confirm password" type="password" required
      >
      <input
        v-if="isCreatingAccount || isCreatingDiscountAccount"
        v-model="mapboxAPIKey" class="login-input" placeholder="Mapbox API Key" type="password" required
      >
      <BaseButton v-if="!isCreatingAccount && !isCreatingDiscountAccount" @click="loginInUser()">
        Login
      </BaseButton>
      <BaseButton v-if="!isCreatingAccount && !isCreatingDiscountAccount" @click="loginUserWithDiscord(false)">
        Login With Discord
      </BaseButton>
      <BaseButton v-if="isCreatingAccount" :disabled="mapboxAPIKey === undefined" @click="loginUserWithDiscord(true)">
        Create Account With Discord
      </BaseButton>
      <BaseButton v-if="!isCreatingAccount && canCreateAccounts && !isCreatingDiscountAccount" @click="isCreatingAccount = !isCreatingAccount">
        Create New Account
      </BaseButton>
      <BaseButton v-if="isCreatingAccount" :disabled="!canSignUp" @click="pocketbaseStore.createAccount()">
        Create Account
      </BaseButton>
      <BaseButton
        v-if="isCreatingAccount"
        @click="isCreatingAccount = !isCreatingAccount
        "
      >
        Back
      </BaseButton>
      <ServerSelector v-if="settingsMenuVisible" @hide="settingsMenuVisible = !settingsMenuVisible" />
    </LoginForm>
  </div>
  <div v-if="user && !user.disclaimerAgreed" class="login">
    <ErrorMessage :error-message="errorMessage" />
    <LoginForm>
      <Disclaimer />
      <BaseButton @click="agree">
        I understand
      </BaseButton>
    </LoginForm>
  </div>
  <div v-if="user && user.disclaimerAgreed">
    <ErrorMessage :error-message="errorMessage" />
    <LoadingScreen />
    <div
      id="map"
    />
    <div v-if="homeNotSet" class="absolute overflow-scroll m-auto bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg w-full rounded-tr-xl rounded-tl-xl p-4 max-h-[45%] md:bottom-2 md:left-2 md:w-2/3 md:h-auto md:rounded-br-xl md:rounded-bl-xl md:m-0 md:max-w-md md:max-h-[50%] md:overflow-scroll">
      <p class="font-semibold text-black">
        Please select your home location
      </p>
    </div>
    <Transition name="slide">
      <SettingsMenu v-if="settingsMenu" @close="closeSettingsMenu" />
    </Transition>
    <ServerHealth />
    <SideMenu
      v-if="!homeNotSet"
      :open-settings="openSettingsMenu"
    />
    <Transition name="slide">
      <AddMarker :hidden="mapboxStore.markerUIHidden" @hide="hideAddMarker" />
    </Transition>
    <Transition name="slide">
      <ItemDetails />
    </Transition>
  </div>
</template>

<style>
.mapboxgl-ctrl-group {
  position: fixed;
  top: 35px;
  left: 11px;
}
</style>

<style scoped lang="scss">
#map {
  height: 100vh;
  width: 100%;
}

.login {
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: #24f03f33;
  backdrop-filter: blur(20px);
  position: absolute;
  top: 0;
  left: 0;
}

.login-input {
    height: 50px;
    padding: 1em;
    border-radius: 10px;
    width: 100%;
}
.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
./stores/notifications
./stores/pocketbase
./stores/mapbox
