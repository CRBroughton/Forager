<script setup lang="ts">
import { usePocketBase } from '@/pocketbase'

interface Emits {
  (e: 'close'): void
}
defineEmits<Emits>()

const { user, setUserLngLat } = usePocketBase()
</script>

<template>
  <div class="settings">
    <div class="settings-inputs">
      <input v-if="user && user.lng" v-model="user.lng" placeholder="lng">
      <input v-if="user && user.lat" v-model="user.lat" placeholder="lat">
      <button @click="setUserLngLat()">
        Update Location
      </button>
      <button @click="$emit('close')">
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
.settings {
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(20px);
    position: absolute;
    top: 0;
    left: 0;
}

.settings-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

input {
    height: 30px;
}
</style>
