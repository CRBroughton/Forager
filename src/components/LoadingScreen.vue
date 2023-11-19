<script setup lang="ts">
import { useMapbox } from '@/mapbox'

const mapboxStore = useMapbox()
</script>

<template>
  <Transition>
    <div v-if="mapboxStore.items === null" class="w-screen h-screen bg-[#d3fcd9] flex items-center justify-center loading-screen absolute">
      <div class="lds-ring">
        <div /><div /><div /><div />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.loading-screen {
    z-index: 100;
}
</style>
