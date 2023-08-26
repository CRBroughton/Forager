<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    colour: {
      required: false,
      type: String,
    },
  },
})
</script>

<template>
  <button
    class="h-14 w-36 text-gray-500 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-xs sm:text-base"
    :class="colour"
    type="submit"
  >
    {{ title }}
  </button>
</template>

  <style scoped></style>
