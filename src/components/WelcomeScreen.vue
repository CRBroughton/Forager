<template>
  <div
    v-if="!isHidden"
    class="w-full bottom-0 flex flex-wrap content-end sm:p-2 p-2" data-test="welcome-screen"
  >
    <div class="w-full flex flex-col bg-gray-100 rounded-2xl shadow-2xl">
      <div class="w-full pt-2 flex justify-center">
        <div
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
        class="w-full pb-2 flex flex-col justify-center items-center text-gray-500 text-xs"
      >
        <p class="pb-1">By Craig Broughton</p>
        <p>Version {{ version }}</p>
      </div>
      <div class="w-full h-full flex flex-wrap content-end">
        <div class="w-full bottom-0 py-1 px-1">
          <div
            class="w-full flex justify-center m-auto py-2 mb-2 bg-gray-200 rounded-xl"
          >
            <p class="text-justify text-gray-600 text-sm p-3 max-w-lg">
              Forager is a web based application for mapping publicly accessible
              foods. Forager is currently in early development, and has basic
              functionality.
            </p>
          </div>
          <div
            class="w-full flex justify-center m-auto py-2 mb-2 bg-gray-200 rounded-xl"
          >
            <p class="text-justify text-gray-600 text-sm p-3 max-w-lg">
              Please be aware that Forager stores mapping data on your device, and can exceed over 1GB. Forager can also use your GPS to get your current location.
            </p>
          </div>
          <div
            class="w-full flex justify-center m-auto py-2 bg-gray-200 rounded-xl"
          >
            <p class="text-justify text-gray-600 text-sm p-3 max-w-lg">
              If you find Forager to be of use, please consider donating using
              the donation button.
            </p>
          </div>
        </div>
        <div class="w-full bottom-0 py-1 px-1">
          <div
            class="w-full flex justify-center m-auto py-2 bg-gray-200 rounded-xl"
          >
            <MyButton
              title="Continue"
              class="mb-1 mr-1 ml-1 w-full"
              @click="hideWelcomeScreen"
              data-test="close-welcome-screen"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import MyButton from "./buttons/BaseButton.vue";
import { version } from "../functions/App";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {
    MyButton,
  },
  setup() {
    const isHidden = ref<boolean>(false);

    const hideWelcomeScreen = () => {
      isHidden.value = true;
    };

    return { isHidden, hideWelcomeScreen, version };
  },
});
</script>

<style scoped></style>
