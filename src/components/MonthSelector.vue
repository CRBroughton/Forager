<script setup lang="ts">
interface Props {
  selectedStartMonth: string
  selectedEndMonth: string
}
const props = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  (e: 'updateStartMonth', month: string): void
  (e: 'updateEndMonth', month: string): void

}

const startMonth = ref(props.selectedStartMonth)
const endMonth = ref(props.selectedEndMonth)

const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function updateStartMonth(month: string) {
  emit('updateStartMonth', month)
}

function updateEndMonth(month: string) {
  emit('updateEndMonth', month)
}
</script>

<template>
  <div class="month-selector">
    <select v-model="startMonth" name="start">
      <option v-for="month in months" :key="month" :value="month" @click="updateStartMonth(month)">
        {{ month }}
      </option>
    </select>
    <select v-model="endMonth" name="end">
      <option v-for="month in months" :key="month" :value="month" @click="updateEndMonth(month)">
        {{ month }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
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
</style>
