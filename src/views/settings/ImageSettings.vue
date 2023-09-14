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
    <div class="flex flex-col gap-4 overflow-scroll p-4 h-screen">
      <div class="flex gap-2 items-center">
        <h1 class="text-2xl font-medium">
          Images
        </h1>
        <InformationMark id="imageSettings" ref="imageSettingsRef" />
      </div>
      <hr class="h-[1px] min-h-[1px] w-full bg-gray-400 border-0">
      <h2 class="text-md font-medium">
        Saved Images
      </h2>
      <div class="grid grid-cols-3 gap-4 max-w-sm justify-center">
        <div v-for="image in user?.images" :key="image" class="flex flex-col items-center justify-center">
          <img v-if="image" class="add-new-image" :src="image.url" :style="`outline: 3px solid ${image.colour}`">
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
    </div>
  </SettingsWrapper>
</template>

<style scoped lang="scss">
.settings-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    padding: 1em;
    min-height: 100vh;
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

.disabled {
  background: rgb(241, 241, 241);
}
</style>
