<script setup lang="ts">
import type { UserImage } from '@/types'

interface Props {
  image: UserImage
  outline?: string
  canDelete?: boolean
}

const props = withDefaults(defineProps<Props>(), { canDelete: false })

const emit = defineEmits(['delete'])

const { isLoading } = useImage({ src: props.image.url })
</script>

<template>
  <div v-if="isLoading" class="animate-pulse bg-gray-500/50 w-16 h-16 rounded-full flex justify-center items-center" />
  <div v-else class="relative flex flex-col justify-center items-center gap-2 w-24 h-24">
    <div v-if="props.canDelete" class="w-6 h-6 bg-red-500 absolute top-0 right-2 rounded-full flex justify-center items-center" @click="emit('delete')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg>
    </div>
    <img v-if="image" class="add-new-image object-cover" :src="image.url" :style="`outline: 3px solid ${props.outline ?? image.colour}`">
    <p>{{ image.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.add-new-image {
  width: 64px;
  min-width: 64px;
  min-height: 64px;
  height: 64px;
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
