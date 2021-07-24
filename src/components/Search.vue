<template>
  <div v-if="searchMode" class="bottom-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full">
        <ul v-for="marker in filteredMarkers" :key="marker.id">
          <li>{{ marker.title }}</li>
        </ul>
        <input
          type="text"
          class="w-full flex my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-center rounded-xl focus:ring-2 focus:ring-gray-400"
          placeholder="Search For Item"
          v-model="search"
        />
      </div>
      <div class="flex m-auto w-full justify-center">
        <MyButton title="Cancel" class="mb-1 mr-1" @click="enableSearch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import MyButton from "./buttons/BaseButton.vue";
import { searchMode, enableSearch } from "../functions/Search";
import { markers } from "../functions/Marker";
import Marker from "@/types/Marker";

export default defineComponent({
  components: {
    MyButton,
  },
  setup() {
    const search = ref<string>("");
    const filteredMarkers = ref<Marker[]>([]);

    watch(search, () => {
      filteredMarkers.value = markers.value.filter((marker) => {
        return marker.title.includes(search.value);
      });
      console.log(search.value, "Markers", filteredMarkers);
      return filteredMarkers;
      });

    return {
      searchMode,
      enableSearch,
      markers,
      search,
      filteredMarkers,
    };
  },
});
</script>

<style scoped></style>
