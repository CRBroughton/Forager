<script setup lang="ts">
import { usePocketBase } from '@/pocketbase'

const { health, getHealth } = usePocketBase()

onMounted(() => getHealth())

setInterval(getHealth, 30000)
const serverStatus = computed(() => {
  return {
    online: health.value?.code === 200,
    offline: health.value?.code !== 200 || health.value === undefined,
  }
})
</script>

<template>
  <div class="health-container">
    <div
      class="health"
      :class="serverStatus"
    />
    <div>Server Status</div>
  </div>
</template>

<style scoped>
.health-container {
    height: 30px;
    position: absolute;
    background: white;
    top: 10px;
    left: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-right: 10px;
}
.health {
    border-radius: 50%;
    align-content: center;
    width: 10px;
    height: 10px;
    margin-inline: 10px;
}

.online {
    background: green;
}

.offline {
    background: red;
}
</style>
