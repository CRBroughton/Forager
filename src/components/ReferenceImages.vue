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
  <div class="overflow-hidden">
    <Transition name="slide" mode="out-in">
      <div v-if="!isSliced">
        <div class="grid gap-4 grid-cols-3 my-4">
          <div class="flex flex-col justify-center items-center">
            <slot />
            <p>Create</p>
          </div>
          <div v-for="image in props.images" :key="image.url" class="flex flex-col justify-center items-center">
            <img class="image-icon" :class="{ selected: selectedImage?.url === image.url }" :src="image.url" :style="`outline: 3px solid ${image.colour && selectedImage?.url !== image.url}`" @click="selectImage(image)">
            {{ image.name }}
          </div>
        </div>
      </div>
      <div v-else-if="isSliced">
        <div class="grid gap-4 grid-cols-3 my-4">
          <div class="flex flex-col justify-center items-center">
            <slot />
            <p>Create</p>
          </div>
          <div v-for="image in props.images.slice(0, 5)" :key="image.url" class="flex flex-col justify-center items-center">
            <img class="image-icon" :class="{ selected: selectedImage?.url === image.url }" :style="`outline: 3px solid ${image.colour}`" :src="image.url" @click="selectImage(image)">
            {{ image.name }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <div v-if="props.images.length > 5" class="w-full bg-white flex my-4 justify-center items-center rounded-xl" @click="isSliced = !isSliced">
    <svg v-if="isSliced" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z" /></svg>

    <svg v-if="!isSliced" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z" /></svg>
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
    min-width: 64px;
    min-height: 64px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
}

.selected {
    outline: 3px solid blue !important;
}

.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
