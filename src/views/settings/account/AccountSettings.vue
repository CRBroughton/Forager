<script setup lang="ts">
import { useSettingsStore } from '@/views/settings/settingsStore'
import { useMapbox, usePocketBase } from '@/stores'
import type { ItemsRecordWithID, UserRecordWithID } from '@/types'
import { jsonDownloader } from '@/utils/jsonDownloader'
import Button from '@/components/ui/button/Button.vue'

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

    const { link } = jsonDownloader(user.value!, '_user_data.json')

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
    <Button class="w-full" size="lg" variant="outline" @click="resetLocation">
      Reset Home Location
    </Button>
    <Button v-if="isSupported" variant="outline" @click="downloadAccountData">
      Download Account Data
    </Button>
    <Button v-if="isSupported" class="w-full" size="lg" variant="outline" @click="downloadMarkerData">
      Download Marker Data
    </Button>
    <Button v-if="isSupported" class="w-full" size="lg" variant="outline" @click="uploadAccountData">
      {{ isUploadingAccountData === true ? 'Uploading...' : 'Upload Account Data' }}
    </Button>
    <Button v-if="isSupported" class="w-full" size="lg" variant="outline" @click="uploadMarkerdata">
      {{ isUploading === true ? 'Uploading...' : 'Upload Marker Data' }}
    </Button>
    <Button v-if="!confirmDeletion" class="w-full" size="lg" variant="outline" @click="confirmDeletion = !confirmDeletion">
      Delete All Markers
    </Button>
    <Button v-if="confirmDeletion" class="w-full" size="lg" variant="outline" @click="pocketbaseStore.deleteAllMarkers(items)">
      Delete All Markers (Confirm)
    </Button>
    <Button v-if="confirmDeletion" class="w-full" size="lg" variant="outline" @click="confirmDeletion = !confirmDeletion">
      Cancel Deletion (Go Back)
    </Button>
    <Button class="w-full" size="lg" variant="outline" @click="toggleAccountMenu">
      Return to main menu
    </Button>
  </SettingsWrapper>
</template>

<style scoped lang="scss">
</style>
