<script setup lang="ts">
import { ref } from 'vue'
import Button from './ui/button/Button.vue'
import { useMapbox, usePocketBase } from '@/stores'
import type { UserImage } from '@/types'
import { createPopup } from '@/utils/tippy'

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

  createItemPopup('#newItem', 'Create a new item, or a new landmark')
})

const mapboxStore = useMapbox()
const { lng, lat } = storeToRefs(mapboxStore)
const pocketbaseStore = usePocketBase()
const { user } = storeToRefs(pocketbaseStore)

const createLandmark = ref(false)

const selectedItem = reactive<UserImage>({
  name: '',
  colour: '',
  startMonth: '',
  endMonth: '',
  url: '',
})
const input = ref('')
function hide() {
  input.value = ''
  createLandmark.value = false
  emits('hide')
}

function setSelectedItem(event: UserImage) {
  Object.assign(selectedItem, event)
}

function create() {
  if (!createLandmark.value) {
    mapboxStore.addMarker(lng.value, lat.value, selectedItem)
    return
  }

  mapboxStore.addLandmark({
    name: input.value,
    lng: lng.value,
    lat: lat.value,
  })
}
</script>

<template>
  <div v-if="!hidden" class="absolute overflow-scroll m-auto bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg w-[calc(100% - 1em)] mx-4 rounded-tr-xl rounded-tl-xl p-4 md:bottom-2 md:left-2 md:w-2/3 md:h-auto md:rounded-br-xl md:rounded-bl-xl md:px-0 md:m-0 md:max-w-md md:overflow-scroll">
    <div class="max-w-sm flex flex-col m-auto rounded-xl md:max-w-none md:mx-4">
      <div class="flex gap-2 items-center">
        <h1>{{ !createLandmark ? 'Create new item' : 'Create landmark' }}</h1>
        <InformationMark id="newItem" ref="createItemRef" />
        <div v-if="createLandmark" class="ml-auto h-6 bg-white rounded-full flex items-center w-16 cursor-pointer" @click="createLandmark = !createLandmark">
          <svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z" /></svg>
          <p class="text-gray-500">
            back
          </p>
        </div>
      </div>
      <div class="m-auto items-center w-full overflow-hidden">
        <Transition name="slide" mode="out-in">
          <div v-if="!createLandmark">
            <ReferenceImages :new="createLandmark" :images="user?.images!" @change="setSelectedItem">
              <div class="h-16 w-16 min-w-[4rem] min-h-[4rem] bg-white active:bg-gray-100 flex justify-center items-center rounded-full border-gray-200 border cursor-pointer text-gray-500" @click="createLandmark = !createLandmark">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
              </div>
            </ReferenceImages>
          </div>

          <div v-else-if="createLandmark">
            <ColourSelector v-if="!createLandmark" :selected-colour="selectedItem.colour" @change="selectedItem.colour = $event" />
            <input
              v-model="input"
              type="text"
              class="w-full flex my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-center rounded-xl focus:ring-2 focus:ring-gray-400"
              placeholder="Landmark name"
              data-test="input-marker-title"
            >
          </div>
        </Transition>
      </div>
      <div class="flex gap-4 m-auto w-full justify-center">
        <Button class="w-full" size="lg" variant="outline" @click="create()">
          Create
        </Button>
        <Button class="w-full" size="lg" variant="outline" @click="hide">
          Cancel
        </Button>
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
