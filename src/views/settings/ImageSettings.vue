<script setup lang="ts">
import { injectSettingsStore } from '@/views/settings/settingsStore'

const { toggleImageMenu } = injectSettingsStore()
</script>

<template>
  <SettingsWrapper>
    <template #heading>
      Imagee
    </template>
    <template #buttons>
      <button @click="toggleImageMenu">
        Return to main menu
      </button>
    </template>
  </SettingsWrapper>
</template>

<style scoped>

</style>
