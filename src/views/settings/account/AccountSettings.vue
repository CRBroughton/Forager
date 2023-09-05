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
    <template #heading>
      Account
    </template>
    <template #buttons>
      <button v-if="!confirmDeletion" @click="confirmDeletion = !confirmDeletion">
        Delete All Markers
      </button>
      <button v-if="confirmDeletion" @click="deleteAllMarkers(items)">
        Delete All Markers (Confirm)
      </button>
      <button v-if="confirmDeletion" @click="confirmDeletion = !confirmDeletion">
        Cancel Deletion (Go Back)
      </button>
      <button @click="toggleAccountMenu">
        Return to main menu
      </button>
    </template>
  </SettingsWrapper>
</template>

<style scoped lang="scss">
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

button {
  background: white;
  padding: 1em 1.2em;
  border-radius: 15px;
  width: 100%;

  &:hover {
    background: rgb(240, 240, 240);
  }
}
</style>
