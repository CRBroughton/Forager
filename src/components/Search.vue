<template>
  <div v-if="searchMode" class="bottom-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full">
        <div
          class="bg-gray-50 rounded-xl p-1 text-gray-600 overflow-y-auto max-h-52 border-gray-300 border-2"
        >
          <ul v-for="marker in filteredSearchMarkers" :key="marker.id">
            <li
              class="w-full my-1 p-2 rounded-xl bg-white text-sm cursor-pointer border-2 active:bg-gray-100"
            >
              <button
                @click="
                  centerMap({ latlng: { lat: marker.lat, lng: marker.lng } })
                "
                class="w-full outline-none focus:outline-none"
              >
                {{ marker.title }} - {{ marker.dateLastForaged }}
              </button>
            </li>
          </ul>
        </div>
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
import MyButton from "./buttons/BaseButton.vue";
import { searchMode, search, enableSearch } from "../functions/Search";
import { markers, filteredSearchMarkers } from "../functions/Marker";
import { centerMap } from "../functions/MouseClick";

export default defineComponent({
  components: {
    MyButton,
  },
  setup() {
    watch(search, () => {
      filteredSearchMarkers.value = markers.value.filter((marker) => {
        return marker.title.includes(search.value);
      });
    });

    return {
      searchMode,
      enableSearch,
      markers,
      search,
      filteredSearchMarkers,
      centerMap,
    };
  },
});
</script>

<style scoped></style>
