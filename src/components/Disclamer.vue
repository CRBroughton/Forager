<script setup lang="ts">
import { injectMapboxStore } from '@/mapbox'
import { injectPocketBaseStore } from '@/pocketbase'

const { initMapbox } = injectMapboxStore()
const { user, updateDisclaimerAgreement } = injectPocketBaseStore()

async function agree() {
  await updateDisclaimerAgreement()
  await initMapbox()
}
</script>

<template>
  <div v-if="user && !user.disclaminerAgreed" class="disclaimer-container">
    <p>
      This is the disclaimer. Don't pick anything that isn't wild, or publicly accessible. No trespassing. Eating things from the wild could be dangerous,
      and potentially could cause death.
    </p>
    <button class="" @click="agree">
      I understand
    </button>
  </div>
</template>

<style scoped>
.disclaimer-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(20px);
    z-index: 1000;
}
</style>
