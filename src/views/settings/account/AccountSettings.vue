<script setup lang="ts">
import { useSettingsStore } from '@/views/settings/settingsStore'
import { usePocketBase } from '@/pocketbase'
import { useMapbox } from '@/mapbox'
import type { ItemsRecordWithID, UserRecordWithID } from '@/types'
import { jsonDownloader } from '@/jsonDownloader'

const { isSupported } = useFileSystemAccess()
const { toggleAccountMenu } = useSettingsStore()
const pocketbaseStore = usePocketBase()
const { user } = storeToRefs(pocketbaseStore)
const mapboxStore = useMapbox()
const { items } = storeToRefs(mapboxStore)

const confirmDeletion = ref(false)

function downloadMarkerData() {
  const { link } = jsonDownloader(items.value, '_markers.json')
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
const data = res.data

const isUploading = ref(false)

async function uploadMarkerdata() {
  try {
    isUploading.value = true
    await res.open()
    const value = JSON.parse(data.value as string) as ItemsRecordWithID[]
    await pocketbaseStore.createItems(value)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  finally {
    isUploading.value = false
  }
}

const downloadingAccountData = ref(false)
async function downloadAccountData() {
  try {

    downloadingAccountData.value = true
    
    const { link } = jsonDownloader(user.value, '_user_data.json')

    link.click()
  }
  catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  finally {
    downloadingAccountData.value = false
  }
}

const isUploadingAccountData = ref(false)
async function uploadAccountData() {
  try {
    isUploadingAccountData.value = true
    await res.open()
    const value = JSON.parse(data.value as string) as UserRecordWithID
    await pocketbaseStore.updateAccountData(value)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  finally {
    isUploadingAccountData.value = false
  }
}

async function resetLocation() {
  try {
    await pocketbaseStore.setUserLocation({
      lng: 0,
      lat: 0,
    })
    location.reload()
  }
  catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
</script>

<template>
  <SettingsWrapper style="background: #d3fcd9;">
    <template #title>
      Account
    </template>
    <BaseButton @click="resetLocation">
      Reset Home Location
    </BaseButton>
    <BaseButton v-if="isSupported" @click="downloadAccountData">
      Download Account Data
    </BaseButton>
    <BaseButton v-if="isSupported" @click="downloadMarkerData">
      Download Marker Data
    </BaseButton>
    <BaseButton v-if="isSupported" @click="uploadAccountData">
      {{ isUploadingAccountData === true ? 'Uploading...' : 'Upload Account Data' }}
    </BaseButton>
    <BaseButton v-if="isSupported" @click="uploadMarkerdata">
      {{ isUploading === true ? 'Uploading...' : 'Upload Marker Data' }}
    </BaseButton>
    <BaseButton v-if="!confirmDeletion" @click="confirmDeletion = !confirmDeletion">
      Delete All Markers
    </BaseButton>
    <BaseButton v-if="confirmDeletion" @click="pocketbaseStore.deleteAllMarkers(items)">
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
