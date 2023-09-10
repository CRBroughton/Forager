<script setup lang="ts">
import { usePocketBase } from '@/pocketbase'
import { provideSettingsStore } from '@/views/settings/settingsStore'

interface Emits {
  (e: 'close'): void
}
defineEmits<Emits>()

const { user, setUserLngLat } = usePocketBase()
const { imagesOpen, toggleImageMenu, accountSettingsOpen, toggleAccountMenu } = provideSettingsStore()

const lng = ref(user.value?.lng ?? 0)
const lat = ref(user.value?.lat ?? 0)
const hasNoLngLat = computed(() => lng.value.length <= 0 || lat.value.length <= 0)
</script>

<template>
  <SettingsWrapper>
    <div class="settings-inputs">
      Settings
      <p class="w-full text-left">
        Longitude
      </p>
      <input v-if="user" v-model="lng" placeholder="Longitude">
      <p class="text-left w-full">
        Latitude
      </p>
      <input v-if="user" v-model="lat" placeholder="Latitude">
      <BaseButton @click="toggleAccountMenu">
        Account
      </BaseButton>
      <Transition name="slide">
        <AccountSettings v-if="accountSettingsOpen" />
      </Transition>
      <BaseButton @click="toggleImageMenu">
        Images
      </BaseButton>
      <Transition name="slide">
        <ImageSettings v-if="imagesOpen" />
      </Transition>
      <BaseButton :class="{ disabled: hasNoLngLat }" :disabled="hasNoLngLat" @click="setUserLngLat()">
        Update Location
      </BaseButton>
      <BaseButton @click="$emit('close')">
        Close
      </BaseButton>
    </div>
  </SettingsWrapper>
</template>

<style scoped lang="scss">
.settings-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
    padding: 1em;
}
h1 {
  font-size: 1.2em;
}
.settings {
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(20px);
    position: absolute;
    top: 0;
    left: 0;
}

.settings-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding-inline: 1em;
}

input {
    height: 50px;
    padding: 1em;
    border-radius: 10px;
    width: 100%;
}

.disabled {
  background: red;
}

.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
