<script setup lang="ts">
import { injectMapboxStore } from '@/mapbox'
import { injectPocketBaseStore } from '@/pocketbase'

const { selectedItem, deleteMarker, updateMarkerLayer } = injectMapboxStore()

const { getSelectedItem, selectedItemPocketbase, updateForageDate } = injectPocketBaseStore()

watch(() => selectedItem.value, () => {
  if (selectedItem.value !== undefined)
    getSelectedItem(selectedItem.value)
})

function clearSelected() {
  selectedItem.value = undefined
  selectedItemPocketbase.value = undefined
}

function deleteItem() {
  if (selectedItemPocketbase.value) {
    deleteMarker(selectedItemPocketbase.value.id)
    clearSelected()
  }
}

async function forageItem() {
  if (selectedItemPocketbase.value) {
    await updateForageDate(selectedItemPocketbase.value.id)
    await updateMarkerLayer()
  }
}

const fullscreenImg = ref(false)
const previewImg = computed(() => {
  return {
    'item-img': fullscreenImg.value === false,
    'fullscreen-img': fullscreenImg.value === true,
  }
})
</script>

<template>
  <div v-if="selectedItemPocketbase" class="item-details">
    <div class="name-and-img">
      <h1>{{ selectedItemPocketbase.name }}</h1>
      <Teleport v-if="selectedItemPocketbase.imageURL" to="body" :disabled="previewImg['item-img']">
        <div class="ml-auto" :class="{ 'blur-preview': fullscreenImg, 'preview-image-container ': fullscreenImg }" @click="fullscreenImg = !fullscreenImg">
          <img :src="selectedItemPocketbase.imageURL" class="object-cover" :class="previewImg">
        </div>
      </Teleport>
    </div>
    <div class="item-forage-details">
      <p>Last Foraged: {{ selectedItemPocketbase.lastForaged ? new Date(selectedItemPocketbase.lastForaged!).toDateString() : 'Never' }}</p>
      <p> Start Month: {{ selectedItemPocketbase.startMonth || 'Not Set' }}</p>
      <p>End Month: {{ selectedItemPocketbase.endMonth || 'Not Set' }}</p>
    </div>
    <div class="item-detail-buttons">
      <BaseButton @click="deleteItem">
        Delete
      </BaseButton>
      <BaseButton @click="forageItem">
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
.fullscreen-img {
  width: 100%;
  max-width: 1000px;
  object-fit: contain;
}
.name-and-img {
  display: flex;
}
.item-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: auto;
}
h1 {
  font-size: 1.2em;
}
.item-details {
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
