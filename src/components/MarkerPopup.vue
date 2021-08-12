<template>
  <div
    class="w-full bottom-0 flex flex-wrap content-end sm:p-2 p-2"
    v-if="markerPopupVisible" data-test="marker-popup"
  >
    <div
      class="w-full m-auto max-w-screen-md flex flex-col bg-gray-100 rounded-2xl shadow-2xl"
    >
      <div class="w-full pt-2 flex justify-center"></div>
      <div
        class="w-full p-2 flex justify-center items-center text-gray-500 font-semibold"
      >
        <p>{{ selectedMarker[0].title }}</p>
      </div>
      <div
        class="w-full pb-2 flex flex-col justify-center items-center text-gray-500 text-xs"
      >
        <p class="pb-2">Times Foraged: {{ selectedMarker[0].timesForaged }}</p>
        <p class="pb-2">
          Date Last Foraged: {{ selectedMarker[0].dateLastForaged }}
        </p>
        <p>Date Added: {{ selectedMarker[0].date }}</p>
      </div>
      <div class="w-full h-full flex flex-wrap content-end">
        <div class="w-full bottom-0 py-1 px-1">
          <div
            class="w-full flex justify-center m-auto py-2 bg-gray-200 rounded-xl"
          >
            <MyButton
              title="Delete Marker"
              class="mb-1 mr-1 ml-1 w-full"
              @click="deleteMarker"
              data-test="marker-delete"
            />
            <MyButton
              title="Forage Now"
              class="mb-1 mr-1 ml-1 w-full"
              @click="updateForage"
              data-test="marker-forage"
            />
            <MyButton
              title="Close"
              class="mb-1 mr-1 ml-1 w-full"
              @click="closeMarkerPopup"
              data-test="marker-close"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MyButton from "./buttons/BaseButton.vue";
import {
  selectedMarker,
  markerPopupVisible,
  deleteMarker,
  updateForage,
} from "../functions/Marker";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {
    MyButton,
  },
  setup() {
    const closeMarkerPopup = () => {
      markerPopupVisible.value = false;
    };

    return {
      selectedMarker,
      closeMarkerPopup,
      markerPopupVisible,
      deleteMarker,
      updateForage,
    };
  },
});
</script>

<style scoped></style>
