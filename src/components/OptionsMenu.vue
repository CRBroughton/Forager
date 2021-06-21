<template>
  <div class="w-full bottom-0 flex flex-wrap content-end sm:p-2 p-2">
    <div class="w-full flex flex-col bg-gray-100 rounded-2xl shadow-2xl">
      <div class="w-full pt-2 flex justify-center">
        <div
          @click="showOptions"
          class="h-14 w-14 bg-white flex justify-center items-center rounded-full cursor-pointer"
        >
          <img src="" alt="" srcset="../assets/logo.png" class="w-10 h-10" />
        </div>
      </div>
      <div
        class="w-full p-2 flex justify-center items-center text-gray-500 font-semibold"
      >
        <p>Forager</p>
      </div>
      <div
        class="w-full pb-2 flex justify-center items-center text-gray-500 text-xs"
      >
        <p>By Craig Broughton</p>
      </div>
      <div class="w-full h-full flex flex-wrap content-end">
        <div class="w-full bottom-0 py-1 px-1">
          <div
            class="w-full flex justify-center m-auto py-2 bg-gray-200 rounded-xl"
          >
            <MyButton
              title="Delete Home"
              class="mb-1 mr-1 ml-1"
              @click="deleteHome"
            >
              Delete Home
            </MyButton>
            <MyButton
              title="Delete Markers"
              class="mb-1 mr-1"
              @click="deleteMarkers"
            >
              Delete Markers
            </MyButton>
            <MyButton title="Clear Cache" class="mb-1 mr-1" @click="clearCache">
              Clear Cache
            </MyButton>
          </div>
        </div>
        <div class="w-full bottom-0 py-1 px-1">
          <div
            class="w-full flex justify-center m-auto py-2 bg-gray-200 rounded-xl"
          >
            <MyButton
              title="Back"
              class="mb-1 mr-1 ml-1 w-full"
              @click="goBack"
            >
              Back
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import MyButton from "./buttons/BaseButton.vue";
import db from "../Localbase";

export default {
  props: ["optionsVisible"],
  emits: ["hideOptions"],
  components: {
    MyButton,
  },
  setup(props, { emit }) {
    const isHidden = ref(props.optionsVisible);

    const hideOptions = () => {
      isHidden.value = true;
      emit("hideOptions");
    };

    const deleteHome = () => {
      db.collection("home").delete();
      window.location.reload();
    };

    const deleteMarkers = () => {
      db.collection("markers").delete();
      window.location.reload();
    };
    const clearCache = () => {
      caches.delete("forager-cache");
      console.log("Cache Cleared!");
    };
    const goBack = () => {
      isHidden.value = true;
      emit("hideOptions");
    };

    return {
      isHidden,
      hideOptions,
      deleteHome,
      deleteMarkers,
      clearCache,
      goBack,
    };
  },
};
</script>

<style scoped></style>
