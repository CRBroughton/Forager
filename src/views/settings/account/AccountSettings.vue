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
    <template #title>
      Account
    </template>
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
  </SettingsWrapper>
</template>

<style scoped lang="scss">
</style>
