<script setup lang="ts">
import { injectSettingsStore } from '@/views/settings/settingsStore'
import { usePocketBase } from '@/pocketbase'

const { toggleImageMenu } = injectSettingsStore()
const { createImage, getAllImages, images } = usePocketBase()

onMounted(async () => {
  await getAllImages()
})

const imageURL = ref('')
</script>

<template>
  <SettingsWrapper>
    <template #heading>
      Images
    </template>
    <template #content>
      <div class="image-grid">
        <div v-for="image in images" :key="image.imageURL">
          <img v-if="image" class="add-new-image" :src="image.imageURL">
          <p>{{ image.name }}</p>
        </div>
      </div>
    </template>
    <template #buttons>
      <input v-model="imageURL" class="login-input" placeholder="Enter Image URL">
      <button @click="createImage(imageURL)">
        Create New Image
      </button>
      <button @click="toggleImageMenu">
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
</style>
