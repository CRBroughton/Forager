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
</script>

<template>
  <div class="images-container">
    <slot />
    <div v-for="image in props.images" :key="image.url" class="image-container">
      <img class="image-icon" :class="{ selected: selectedImage?.url === image.url }" :src="image.url" @click="selectImage(image)">
      {{ image.name }}
    </div>
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
