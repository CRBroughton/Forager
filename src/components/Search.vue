<template>
  <div v-if="searchMode" class="bottom-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full"></div>
      <div class="flex m-auto w-full justify-center">
        <MyButton title="test" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MyButton from "./buttons/BaseButton.vue";
import { searchMode, enableSearch } from "../functions/Search";

export default defineComponent({
  components: {
    MyButton,
  },
  setup() {
    return {
      searchMode,
      enableSearch,
    };
  },
});
</script>

<style scoped></style>
