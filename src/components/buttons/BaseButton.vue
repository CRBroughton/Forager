<template>
  <button
    class="h-14 w-36 text-gray-500 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none"
    :class="colour"
    type="submit"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "colour"],
});
</script>

<style scoped></style>
