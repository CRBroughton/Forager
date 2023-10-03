<script setup lang="ts">
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
    <BaseButton @click="settingsStore.toggleAccountMenu">
      Account
    </BaseButton>
    <Transition name="slide">
      <AccountSettings v-if="accountSettingsOpen" />
    </Transition>
    <BaseButton @click="settingsStore.toggleImageMenu">
      Images
    </BaseButton>
    <Transition name="slide">
      <ImageSettings v-if="imagesOpen" />
    </Transition>
    <BaseButton @click="$emit('close')">
      Close
    </BaseButton>
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
