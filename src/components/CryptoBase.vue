<template>
  <button
    @click="copyCryptoAddress"
    class="w-full flex flex-col m-auto justify-center py-2 bg-white active:bg-gray-100 rounded-xl cursor-pointer outline-none focus:outline-none"
  >
    <img :src="require(`../assets/${image}`)" alt="" class="w-8 h-8 m-auto" />
    <h3 class="text-gray-500 font-semibold m-auto">{{ title }}</h3>
    <h3 class="hidden">{{ CryptoAddress }}</h3>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

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
    CryptoAddress: {
      required: false,
      type: String,
    },
  },
  setup(props) {
    const CryptoText = ref<any>(props.CryptoAddress);

    const copyCryptoAddress = async () => {
      if (CryptoText.value === undefined) {
        return;
      }
      await navigator.clipboard.writeText(CryptoText.value);
      alert("Copied to clipboard!");
    };

    return { copyCryptoAddress };
  },
});
</script>

<style scoped></style>
