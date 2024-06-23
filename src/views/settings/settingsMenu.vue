<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { notifications } from '@/stores'
import { useSettingsStore } from '@/views/settings/settingsStore'

interface Emits {
  (e: 'close'): void
}
defineEmits<Emits>()

const settingsStore = useSettingsStore()
const { imagesOpen, accountSettingsOpen } = storeToRefs(settingsStore)

const state = useStorage('forager-store', {
  map3D: false,
})

function restartApplication() {
  location.reload()
}

const notificationsStore = notifications()
</script>

<template>
  <SettingsWrapper>
    <template #title>
      Settings
    </template>
    <h2 class="text-md font-medium">
      General
    </h2>
    <div class="flex w-full">
      <label for="topology">Enable 3D Map</label>
      <input id="topology" v-model="state.map3D" name="topology" type="checkbox" class="w-12 " @change="restartApplication()">
    </div>
    <Button v-if="notificationsStore.notificationStatus !== 'granted' && notificationsStore.supportsNotificationsAPI" class="w-full" size="lg" variant="outline" @click="notificationsStore.enableNotifications()">
      Enable notifications
    </Button>
    <Button class="w-full" size="lg" variant="outline" @click="settingsStore.toggleAccountMenu">
      Account
    </Button>
    <Transition name="slide">
      <AccountSettings v-if="accountSettingsOpen" />
    </Transition>
    <Button class="w-full" size="lg" variant="outline" @click="settingsStore.toggleImageMenu">
      Foragables
    </Button>
    <Transition name="slide">
      <ImageSettings v-if="imagesOpen" />
    </Transition>
    <Button class="w-full" size="lg" variant="outline" @click="$emit('close')">
      Close
    </Button>
  </SettingsWrapper>
</template>

<style scoped lang="scss">
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
