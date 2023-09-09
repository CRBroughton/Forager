<script setup lang="ts">
import type { UserImage } from '@/types'

interface Emits {
  (e: 'change', image: UserImage): void
}

interface Props {
  images: UserImage[]
  new: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedImage = ref<UserImage>()
function selectImage(image: UserImage) {
  selectedImage.value = image
  emit('change', image)
}

const isSliced = ref(true)
</script>

<template>
  <div v-if="isSliced" class="grid gap-4 grid-cols-3 my-4">
    <div class="flex flex-col justify-center items-center">
      <slot />
      <p>Create</p>
    </div>
    <div v-for="image in props.images.slice(0, 5)" :key="image.url" class="flex flex-col justify-center items-center">
      <img class="image-icon" :class="{ selected: selectedImage?.url === image.url }" :src="image.url" @click="selectImage(image)">
      {{ image.name }}
    </div>
  </div>
  <div v-if="isSliced" class="w-full bg-white flex my-4 justify-center items-center rounded-xl" @click="isSliced = !isSliced">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z" /></svg>
  </div>

  <div v-if="!isSliced" class="grid gap-4 grid-cols-3 my-4">
    <div class="flex flex-col justify-center items-center">
      <slot />
      <p>Create</p>
    </div>
    <div v-for="image in props.images" :key="image.url" class="flex flex-col justify-center items-center">
      <img class="image-icon" :class="{ selected: selectedImage?.url === image.url }" :src="image.url" @click="selectImage(image)">
      {{ image.name }}
    </div>
  </div>
  <div v-if="!isSliced" class="w-full bg-white flex my-4 justify-center items-center rounded-xl" @click="isSliced = !isSliced">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z" /></svg>
  </div>
</template>

<style scoped>
.images-container {
    display: flex;
    overflow-x: scroll;
    max-width: 100%;
    gap: 1em;
    flex-wrap: wrap;
    margin-inline: 10px;
    margin-block: 10px;
}

.image-container {
    display:flex;
    flex-direction: column;
    align-items: center;
}
.image-icon {
    min-width: 60px;
    min-height: 60px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.selected {
    outline: 3px solid blue;
}
</style>
