<script setup lang="ts">
import { useSettingsStore } from '@/views/settings/settingsStore'
import { usePocketBase } from '@/stores'
import { createPopup } from '@/utils/tippy'

const { toggleImageMenu } = useSettingsStore()
const pocketbaseStore = usePocketBase()
const { user } = storeToRefs(pocketbaseStore)

const imageURL = ref('')
const imageName = ref('')
const selectedColour = ref('red')

const submitButtonDisabled = computed(() => {
  return imageURL.value.length === 0
  || imageName.value.length === 0
  || selectedColour.value.length === 0
})

const [createItemPopup, imageSettingsRef] = createPopup()

watch(() => imageSettingsRef.value, () => {
  if (imageSettingsRef.value === null)
    return

  createItemPopup('#imageSettings', 'Add your foragables here, then start creating them on the map.')
})

const selectedStartMonth = ref('January')
const selectedEndMonth = ref('December')
</script>

<template>
  <SettingsWrapper style="background: #d3fcd9;">
    <template #title>
      Images
    </template>
    <template #info>
      <InformationMark id="imageSettings" ref="imageSettingsRef" class="ml-auto" />
    </template>
    <h2 class="text-md font-medium">
      Saved Images
    </h2>
    <div class="grid grid-cols-3 gap-4 justify-center">
      <div v-for="image in user?.images" :key="image" class="flex flex-col items-center justify-center gap-2">
        <ReferenceImage :image="image" can-delete @delete="pocketbaseStore.deleteReferenceImage(image)" />
      </div>
    </div>
    <hr class="h-[1px] min-h-[1px] w-full bg-gray-400 border-0">
    <h2 class="text-md font-medium">
      Create New Image
    </h2>
    <ColourSelector :selected-colour="selectedColour" @change="selectedColour = $event" />
    <div class="flex flex-col gap-4">
      <input v-model="imageURL" class="login-input" placeholder="Enter Image URL">
      <input v-model="imageName" class="login-input" placeholder="Enter Image Name">
    </div>
    <MonthSelector 
      :selected-start-month="selectedStartMonth" :selected-end-month="selectedEndMonth" 
      @update-start-month="selectedStartMonth = $event"
      @update-end-month="selectedEndMonth = $event"
    />
    <div class="flex flex-col gap-4 w-full mt-auto">
      <BaseButton :class="{ disabled: submitButtonDisabled }" :disabled="submitButtonDisabled" @click="pocketbaseStore.createImage({ name: imageName, url: imageURL, colour: selectedColour, startMonth: selectedStartMonth, endMonth: selectedEndMonth })">
        Create New Image
      </BaseButton>
      <BaseButton @click="toggleImageMenu">
        Return to main menu
      </BaseButton>
    </div>
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
.disabled {
  background: rgb(241, 241, 241);
}
</style>
