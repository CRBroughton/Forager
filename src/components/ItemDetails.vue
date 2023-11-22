<script setup lang="ts">
import { useMapbox, usePocketBase } from '@/stores'

const mapboxStore = useMapbox()
const { selectedItem, selectedCollection } = storeToRefs(mapboxStore)

const pocketbaseStore = usePocketBase()
const {  selectedItemPocketbase } = storeToRefs(pocketbaseStore)

watch(() => selectedItem.value, () => {
  if (selectedItem.value !== undefined)
    pocketbaseStore.getSelectedItem(selectedItem.value, selectedCollection.value)
})

function clearSelected() {
  selectedItem.value = undefined
  selectedItemPocketbase.value = undefined
}

function deleteItem() {
  if (selectedItemPocketbase.value) {
    mapboxStore.deleteMarker(selectedItemPocketbase.value.id)
    clearSelected()
  }
}

async function forageItem() {
  if (selectedItemPocketbase.value) {
    await pocketbaseStore.updateForageDate(selectedItemPocketbase.value.id)
    await mapboxStore.updateMarkerLayer()
  }
}

const fullscreenImg = ref(false)
const previewImg = computed(() => {
  return {
    'w-20 h-20 rounded-full ml-auto': fullscreenImg.value === false,
    'w-full h-fit max-w-[1000px] object-contain self-center': fullscreenImg.value === true,
  }
})
</script>

<template>
  <div v-if="selectedItemPocketbase" class="absolute overflow-scroll m-auto flex flex-col gap-2 bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg w-[calc(100% - 1em)] mx-4 rounded-tr-xl rounded-tl-xl p-4 max-h-[50%] md:bottom-2 md:left-2 md:w-2/3 md:h-auto md:rounded-br-xl md:rounded-bl-xl md:m-0 md:max-w-md md:overflow-scroll">
    <div class="name-and-img">
      <h1>{{ selectedItemPocketbase.name }}</h1>
      <Teleport v-if="selectedItemPocketbase.imageURL" to="body" :disabled="fullscreenImg === false">
        <div class="ml-auto" :class="{ 'blur-preview': fullscreenImg, 'preview-image-container ': fullscreenImg }" @click="fullscreenImg = !fullscreenImg">
          <img :src="selectedItemPocketbase.imageURL" class="object-cover" :class="previewImg">
        </div>
      </Teleport>
    </div>
    <div v-if="selectedCollection === 'items'" class="item-forage-details">
      <p>Last Foraged: {{ selectedItemPocketbase.lastForaged ? new Date(selectedItemPocketbase.lastForaged!).toDateString() : 'Never' }}</p>
      <p> Start Month: {{ selectedItemPocketbase.startMonth || 'Not Set' }}</p>
      <p>End Month: {{ selectedItemPocketbase.endMonth || 'Not Set' }}</p>
    </div>
    <div class="item-detail-buttons">
      <BaseButton @click="deleteItem">
        Delete
      </BaseButton>
      <BaseButton v-if="selectedCollection === 'items'" @click="forageItem">
        Forage Now
      </BaseButton>
      <BaseButton @click="clearSelected">
        Close
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blur-preview {
  background: rgba(255,255,255,0.1);
    backdrop-filter: blur(4px);
}
.preview-image-container {
  padding: 0.2em;
  z-index: 100000;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.name-and-img {
  display: flex;
}

h1 {
  font-size: 1.2em;
}

.item-detail-buttons {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.item-forage-details {
  display: flex;
  flex-direction: column;
}
</style>
