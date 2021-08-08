<template>
  <div class="bottom-0 w-full">
    <div class=" flex mb-2 mx-2">
      <button
        v-if="updateFound"
        class="p-4 bg-gray-800 rounded-xl m-auto text-white text-sm"
        type="submit"
        @click="runUpdate"
      >
        Update available. Click here for latest changes.
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { updateFound, applyUpdate } from "@/functions/App";

export default defineComponent({
  setup() {
    const runUpdate = () => {
      applyUpdate.value = true;
      window.location.reload(true);
    };
    return { updateFound, applyUpdate, runUpdate };
  },
});
</script>

<style scoped>
</style>