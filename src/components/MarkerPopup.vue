<template>
  <div
    class="w-full bottom-0 flex flex-wrap content-end sm:p-2 p-2"
    v-if="markerPopupVisible"
  >
    <div class="w-full flex flex-col bg-gray-100 rounded-2xl shadow-2xl">
      <div class="w-full pt-2 flex justify-center"></div>
      <div
        class="w-full p-2 flex justify-center items-center text-gray-500 font-semibold"
      >
        <p>{{ selectedMarker[0].title }}</p>
      </div>
      <div
        class="w-full pb-2 flex flex-col justify-center items-center text-gray-500 text-xs"
      >
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
            >
              Delete Marker
            </MyButton>
            <MyButton
              title="Close"
              class="mb-1 mr-1 ml-1 w-full"
              @click="closeMarkerPopup"
            >
              Close
            </MyButton>
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
} from "../functions/Marker";

export default {
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
    };
  },
};
</script>

<style scoped></style>
