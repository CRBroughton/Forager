<script setup lang="ts">
import type { ImagesRecordWithID } from '@/types'

interface Emits {
  (e: 'change', url: string | undefined): void
}
interface Props {
  images: ImagesRecordWithID[]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedImage = ref<string | undefined>('')
function selectImage(image: ImagesRecordWithID) {
  selectedImage.value = image.id
  emit('change', image.imageURL)
}
</script>

<template>
  <div class="images-container">
    <div v-for="image in props.images" :key="image.id" class="image-container">
      <img class="image-icon" :class="{ selected: selectedImage === image.id }" :src="image.imageURL" @click="selectImage(image)">
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