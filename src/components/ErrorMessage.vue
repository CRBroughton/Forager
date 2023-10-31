<script setup lang="ts">
interface Props {
  errorMessage: Error | undefined
}
defineProps<Props>()
</script>

<template>
  <Transition name="error">
    <div v-if="errorMessage" class="absolute z-50 top-0 left-0 w-screen h-12 p-4">
      <div class="bg-red-300 w-full flex justify-center items-center p-4 rounded-xl">
        <p class="font-semibold">
          {{ errorMessage.message }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.error-enter-active {
  transition: all 0.1s ease-out;
}

.error-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.error-enter-from,
.error-leave-to {
  transform: translateY(-100%);
}
</style>
