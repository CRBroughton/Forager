<script setup lang="ts">
import { ref } from 'vue'
import { injectMapboxStore } from '@/mapbox'
import { injectPocketBaseStore } from '@/pocketbase'
import type { UserImage } from '@/types'

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
const { user } = injectPocketBaseStore()
const selectedStartMonth = ref('January')
const selectedEndMonth = ref('December')
const creatingNewItem = ref(false)

const input = ref('')
function hide() {
  input.value = ''
  creatingNewItem.value = false
  emits('hide')
}

const colours = ['red', 'blue', 'purple', 'deeppink', 'cadetblue']
const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const selectedColour = ref('')
function selectColour(colour: string) {
  if (selectedColour.value) {
    selectedColour.value = ''
    return
  }
  selectedColour.value = colour
}

const imageURL = ref<string | undefined>('')

function setSelectedItem(event: UserImage) {
  imageURL.value = event.url
  input.value = event.name
}
</script>

<template>
  <div v-if="!hidden" class="absolute m-auto bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg w-[calc(100% - 1em)] mx-4 rounded-tr-xl rounded-tl-xl p-4 max-h-[45%] overflow-scroll md:bottom-2 md:left-2 md:w-2/3 md:h-auto  md:rounded-br-xl md:rounded-bl-xl md:overflow-visible md:max-h-fit md:px-0 md:m-0 md:max-w-md">
    <div class="max-w-sm flex flex-col m-auto rounded-xl md:max-w-none md:mx-4">
      <div class="flex">
        <h1>Create new item</h1>
        <div v-if="creatingNewItem" class="ml-auto bg-white rounded-full" @click="creatingNewItem = !creatingNewItem">
          <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z" /></svg>
        </div>
      </div>
      <div class="m-auto items-center w-full">
        <ReferenceImages v-if="!creatingNewItem" :new="creatingNewItem" :images="user?.images" @change="setSelectedItem">
          <div class="h-16 w-16 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer text-gray-500" @click="creatingNewItem = !creatingNewItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
          </div>
        </ReferenceImages>
        <div v-else>
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
          <div class="month-selector">
            <select v-model="selectedStartMonth" name="start">
              <option v-for="month in months" :key="month" :value="month">
                {{ month }}
              </option>
            </select>
            <select v-model="selectedEndMonth" name="end">
              <option v-for="month in months" :key="month" :value="month">
                {{ month }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex gap-4 m-auto w-full justify-center">
        <BaseButton @click="addMarker(lng, lat, input, selectedColour, selectedStartMonth, selectedEndMonth, imageURL!)">
          Create
        </BaseButton>
        <BaseButton @click="hide">
          Cancel
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marker-container {
  max-height: 50%;

}
h1 {
  font-size: 1.2em;
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

.month-selector {
  text-align: center;
  gap: 1em;
  display: flex;
  margin-bottom: 20px;

  select {
    width: 100%;
    background: white;
    padding: 1em 0.8em;
    border-radius: 10px;
  }
}
</style>
