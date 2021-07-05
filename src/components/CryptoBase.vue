<template>
  <button
    class="w-full flex flex-col m-auto justify-center py-2 bg-white active:bg-gray-100 rounded-xl cursor-pointer outline-none focus:outline-none"
  >
    <img :src="require(`../assets/${image}`)" alt="" class="w-8 h-8 m-auto" />
    <h3 class="text-gray-500 font-semibold m-auto">{{ title }}</h3>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
