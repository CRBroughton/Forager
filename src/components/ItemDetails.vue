<script setup lang="ts">
import { injectMapboxStore } from '@/mapbox'
import { injectPocketBaseStore } from '@/pocketbase'

const { selectedItem, deleteMarker } = injectMapboxStore()

const { getSelectedItem, selectedItemPocketbase } = injectPocketBaseStore()

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
</script>

<template>
  <div v-if="selectedItemPocketbase" class="item-details">
    <div>
      Name: {{ selectedItemPocketbase.name }}
    </div>
    <div class="item-detail-buttons">
      <button @click="deleteItem">
        Delete
      </button>
      <button @click="clearSelected">
        Close
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-details {
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

.item-detail-buttons {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

button {
  background: white;
  padding: 1em 1.2em;
  border-radius: 15px;
  width: 100%;

  &:hover {
    background: rgb(240, 240, 240);
  }
}
</style>
