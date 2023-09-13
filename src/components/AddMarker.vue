<script setup lang="ts">
import { ref } from 'vue'
import { injectMapboxStore } from '@/mapbox'
import { injectPocketBaseStore } from '@/pocketbase'
import type { UserImage } from '@/types'
import { createPopup } from '@/tippy'

interface Props {
  hidden: boolean
}
defineProps<Props>()

const emits = defineEmits<Emits>()
interface Emits {
  (e: 'create', value: string): void
  (e: 'hide'): void
}

const [createItemPopup, createItemRef] = createPopup()

watch(() => createItemRef.value, () => {
  if (createItemRef.value === null)
    return

  createItemPopup('#newItem', 'Creates a new item, either from your images, or an arbitrary item')
})

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

const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const imageURL = ref<string | undefined>('')
const selectedColour = ref('red')

function setSelectedItem(event: UserImage) {
  imageURL.value = event.url
  input.value = event.name
  selectedColour.value = event.colour
}
</script>

<template>
  <div v-if="!hidden" class="absolute overflow-scroll m-auto bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg w-[calc(100% - 1em)] mx-4 rounded-tr-xl rounded-tl-xl p-4 max-h-[45%]  md:bottom-2 md:left-2 md:w-2/3 md:h-auto  md:rounded-br-xl md:rounded-bl-xl md:px-0 md:m-0 md:max-w-md md:max-h-[50%] md:overflow-scroll">
    <div class="max-w-sm flex flex-col m-auto rounded-xl md:max-w-none md:mx-4">
      <div class="flex gap-2">
        <h1>Create new item</h1>
        <InformationMark id="newItem" ref="createItemRef" />
      </div>
      <div v-if="creatingNewItem" class="ml-auto bg-white rounded-full" @click="creatingNewItem = !creatingNewItem">
        <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z" /></svg>
      </div>
      <div class="m-auto items-center w-full overflow-hidden">
        <Transition name="slide" mode="out-in">
          <div v-if="!creatingNewItem">
            <ReferenceImages :new="creatingNewItem" :images="user?.images" @change="setSelectedItem">
              <div class="h-16 w-16 min-w-[4rem] min-h-[4rem] bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer text-gray-500" @click="creatingNewItem = !creatingNewItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
              </div>
            </ReferenceImages>
          </div>

          <div v-else-if="creatingNewItem">
            <ColourSelector :selected-colour="selectedColour" @change="selectedColour = $event" />
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
        </Transition>
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
