<script setup lang="ts">
import { provideSettingsStore } from '@/views/settings/settingsStore'

interface Emits {
  (e: 'close'): void
}
defineEmits<Emits>()

const { imagesOpen, toggleImageMenu, accountSettingsOpen, toggleAccountMenu } = provideSettingsStore()
</script>

<template>
  <SettingsWrapper>
    <template #title>
      Settings
    </template>
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
