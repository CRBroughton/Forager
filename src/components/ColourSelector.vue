<script setup lang="ts">
const emit = defineEmits<Emits>()
interface Emits {
  (e: 'change', value: string): void
}
const selectedColour = ref('#ffffff')
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Colour</p>
    <input v-model="selectedColour" class="w-full" type="color" @change="emit('change', selectedColour)">
  </div>
</template>

<style scoped>
.colour-choice {
  width: 50px;
  background: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 5px;

}

.colour-dot {
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  border-radius: 15px;
}

.highlighted {
  outline: 4px solid greenyellow;
}
</style>
