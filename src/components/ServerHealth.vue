<script setup lang="ts">
import { usePocketBase } from '@/stores'

const pocketbaseStore = usePocketBase()

onMounted(() => {
  pocketbaseStore.getHealth()
  setTimeout(toggleServerText, 5000)
})

setInterval(pocketbaseStore.getHealth, 30000)
const serverStatus = computed(() => {
  return {
    online: pocketbaseStore.health?.code === 200,
    offline: pocketbaseStore.health?.code !== 200 || pocketbaseStore.health === undefined,
  }
})

const showServerText = ref(true)
function toggleServerText() {
  showServerText.value = !showServerText.value
}
</script>

<template>
  <div class="health-container" @click="toggleServerText">
    <div
      class="health"
      :class="serverStatus"
    />
    <Transition name="slide">
      <div v-if="showServerText" class="health-text">
        Server Status
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.health-container {
    height: 29px;
    min-width: 29px;
    position: absolute;
    background: white;
    top: 10px;
    left: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-inline: 10px;
    overflow: hidden;
}
.health {
    border-radius: 50%;
    align-content: center;
    width: 10px;
    height: 10px;
}

.health-text {
  margin-left: 5px;
}

.online {
    background: green;
}

.offline {
    background: red;
}

.slide-enter-active {
  transition: all 0.2s ease-out;
  opacity: 1;
}

.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
