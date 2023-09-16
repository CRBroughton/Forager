<script setup lang="ts">
import { injectSettingsStore } from '@/views/settings/settingsStore'
import { injectPocketBaseStore } from '@/pocketbase'
import { injectMapboxStore } from '@/mapbox'
import type { ItemsRecordWithID } from '@/types'

const { isSupported } = useFileSystemAccess()
const { toggleAccountMenu } = injectSettingsStore()
const { deleteAllMarkers, createItems } = injectPocketBaseStore()
const { items } = injectMapboxStore()

const confirmDeletion = ref(false)

function downloadMarkerData() {
  const link = document.createElement('a') as HTMLAnchorElement
  const file = new Blob([JSON.stringify(items.value)], { type: 'application/json' })

  link.href = URL.createObjectURL(file)
  link.download = `${new Date().toLocaleDateString()}_markers.json`
  link.click()
}

const dataType = ref('Text') as Ref<'Text'>
const res = useFileSystemAccess({
  dataType,
  types: [{
    description: 'json',
    accept: {
      'application/json': ['.json'],
    },
  }],
  excludeAcceptAllOption: true,
})
const externalItems = res.data

const isUploading = ref(false)

async function uploadMarkerdata() {
  try {
    isUploading.value = true
    await res.open()
    const value = JSON.parse(externalItems.value as string) as ItemsRecordWithID[]
    await createItems(value)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  finally {
    isUploading.value = false
  }
}
</script>

<template>
  <SettingsWrapper style="background: #d3fcd9;">
    <template #title>
      Account
    </template>
    <BaseButton v-if="!confirmDeletion" @click="confirmDeletion = !confirmDeletion">
      Delete All Markers
    </BaseButton>
    <BaseButton v-if="isSupported" @click="downloadMarkerData">
      Download Marker Data
    </BaseButton>
    <BaseButton v-if="isSupported" @click="uploadMarkerdata">
      {{ isUploading === true ? 'Uploading...' : 'Upload Marker Data' }}
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
