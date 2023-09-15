<script setup lang="ts">
import { injectSettingsStore } from '@/views/settings/settingsStore'
import { injectPocketBaseStore } from '@/pocketbase'
import { injectMapboxStore } from '@/mapbox'

const { toggleAccountMenu } = injectSettingsStore()
const { deleteAllMarkers } = injectPocketBaseStore()
const { items } = injectMapboxStore()

const confirmDeletion = ref(false)
</script>

<template>
  <SettingsWrapper style="background: #d3fcd9;">
    <div class="settings-inputs">
      <h2 class="text-2xl font-medium">
        Account
      </h2>
      <BaseButton v-if="!confirmDeletion" @click="confirmDeletion = !confirmDeletion">
        Delete All Markers
      </BaseButton>
      <BaseButton v-if="confirmDeletion" @click="deleteAllMarkers(items)">
        Delete All Markers (Confirm)
      </BaseButton>
      <BaseButton v-if="confirmDeletion" @click="confirmDeletion = !confirmDeletion">
        Cancel Deletion (Go Back)
      </BaseButton>
      <BaseButton @click="toggleAccountMenu">
        Return to main menu
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
    height: 100vh;
}
.login-input {
    height: 50px;
    padding: 1em;
    border-radius: 10px;
    width: 100%;
}
.image-grid {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1em;
  flex-wrap: wrap;
}
.add-new-image {
  width: 80px;
  min-width: 80px;
  min-height: 80px;
  height: 80px;
  background: rgb(154, 235, 138);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  svg {
    color: white;
  }
}
</style>
