<script setup lang="ts">
import { injectSettingsStore } from '@/views/settings/settingsStore'
import { injectPocketBaseStore } from '@/pocketbase'
import { createPopup } from '@/tippy'

const { toggleImageMenu } = injectSettingsStore()
const { user, createImage } = injectPocketBaseStore()

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

  createItemPopup('#imageSettings', 'Add your images here, then start creating items on the map!')
})
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
    <div class="grid grid-cols-3 gap-4 max-w-sm justify-center">
      <div v-for="image in user?.images" :key="image" class="flex flex-col items-center justify-center gap-2">
        <div class="relative">
          <div class="w-6 h-6 bg-red-500 absolute top-0 right-0 rounded-full flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg>
          </div>
          <img v-if="image" class="add-new-image object-cover" :src="image.url" :style="`outline: 3px solid ${image.colour}`">
        </div>
        <p>{{ image.name }}</p>
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
    <div class="flex flex-col gap-4 w-full mt-auto">
      <BaseButton :class="{ disabled: submitButtonDisabled }" :disabled="submitButtonDisabled" @click="createImage({ name: imageName, url: imageURL, colour: selectedColour })">
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

.disabled {
  background: rgb(241, 241, 241);
}
</style>
