<template>
  <button class="text-lg py-1 px-3 rounded-lg" :class="colour" type="submit">
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "colour"]
});
</script>

<style scoped></style>
