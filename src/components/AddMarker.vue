<script setup lang="ts">
import { ref } from 'vue'
import MyButton from './BaseButton.vue'
import { injectMapboxStore } from '@/mapbox'

interface Props {
  hidden: boolean
}
defineProps<Props>()

defineEmits<Emits>()
interface Emits {
  (e: 'create', value: string): void
  (e: 'hide'): void
}

const { lng, lat, addMarker } = injectMapboxStore()

const input = ref('')
</script>

<template>
  <div v-if="!hidden" class="add-item">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full">
        <input
          v-model="input"
          type="text"
          class="w-full flex my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-center rounded-xl focus:ring-2 focus:ring-gray-400"
          placeholder="Please Enter Object Name"
          data-test="input-marker-title"
        >
      </div>
      <div class="flex m-auto w-full justify-center">
        <MyButton title="Create" class="mb-1 mr-1" data-test="create-marker" @click="addMarker(lng, lat, input)" />
        <MyButton title="Cancel" class="mb-1 mr-1" data-test="create-marker-close" @click="$emit('hide', input)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-item {
    min-width: calc(100% - 2em);
    height: auto;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(20px);
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 1em;
    margin-right: 1em;
    padding: 1em;
    border-radius: 15px;
    gap: 1em;
    display: flex;
    flex-direction: column;
}
</style>
