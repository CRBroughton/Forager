<script setup lang="ts">
import { ref } from 'vue'
import MyButton from './BaseButton.vue'
import { injectMapboxStore } from '@/mapbox'

interface Props {
  hidden: boolean
}
defineProps<Props>()

const emits = defineEmits<Emits>()
interface Emits {
  (e: 'create', value: string): void
  (e: 'hide'): void
}

const { lng, lat, addMarker } = injectMapboxStore()

const input = ref('')
function hide() {
  emits('hide')
}

const colours = ['red', 'blue', 'purple', 'deeppink', 'cadetblue']

const selectedColour = ref('')
function selectColour(colour: string) {
  if (selectedColour.value) {
    selectedColour.value = ''
    return
  }
  selectedColour.value = colour
}
</script>

<template>
  <div v-if="!hidden" class="add-item">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <h1>Create new item</h1>
      <div class="m-auto items-center w-full">
        <div class="my-2">
          Selected Colour: {{
            selectedColour.length > 0 ? selectedColour : 'None selected'
          }}
        </div>
        <div class="colour-selector">
          <div
            v-for="colour in colours"
            :key="colour"
            class="colour-choice"
            :class="{ disabled: selectedColour.length > 0 }"
            :disabled="selectedColour.length > 0"
            @click="selectColour(colour)"
          >
            <div
              class="colour-dot"
              :style="{ background: colour }"
            />
          </div>
        </div>
        <input
          v-model="input"
          type="text"
          class="w-full flex my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-center rounded-xl focus:ring-2 focus:ring-gray-400"
          placeholder="Please Enter Object Name"
          data-test="input-marker-title"
        >
      </div>

      <div class="flex m-auto w-full justify-center">
        <MyButton title="Create" class="mb-1 mr-1" data-test="create-marker" @click="addMarker(lng, lat, input, selectedColour)" />
        <MyButton title="Cancel" class="mb-1 mr-1" data-test="create-marker-close" @click="hide" />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.2em;
}
.add-item {
    z-index: 10;
    min-width: calc(100% - 1em);
    height: auto;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(20px);
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
    padding: 1em;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    gap: 1em;
    display: flex;
    flex-direction: column;
}

.colour-selector {
  display: flex;
  gap: .5em;
  margin-bottom: 20px;
  cursor: pointer;
}

.colour-choice {
  width: 50px;
  background: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 5px;

}

.colour-dot {
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  border-radius: 15px;
}

.disabled {
  background: rgb(196, 196, 196);
}
</style>
