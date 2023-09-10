<script setup lang="ts">
import { injectSettingsStore } from '@/views/settings/settingsStore'
import { injectPocketBaseStore } from '@/pocketbase'

const { toggleImageMenu } = injectSettingsStore()
const { user, createImage } = injectPocketBaseStore()

const imageURL = ref('')
const imageName = ref('')
</script>

<template>
  <SettingsWrapper style="background: #d3fcd9;">
    <div class="settings-inputs">
      Images
      <div class="grid grid-cols-3 gap-4">
        <div v-for="image in user?.images" :key="image" class="flex flex-col items-center justify-center">
          <img v-if="image" class="add-new-image" :src="image.url">
          <p>{{ image.name }}</p>
        </div>
      </div>
      <input v-model="imageURL" class="login-input" placeholder="Enter Image URL">
      <input v-model="imageName" class="login-input" placeholder="Enter Image Name">
      <BaseButton :disabled="imageURL.length === 0 || imageName.length === 0" @click="createImage({ name: imageName, url: imageURL })">
        Create New Image
      </BaseButton>
      <BaseButton @click="toggleImageMenu">
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
</style>
