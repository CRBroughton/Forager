<template>
  <div v-if="!isHidden" class="w-screen h-60 bottom-0 p-1">
    <div
      class="bg-gray-100 w-full h-full rounded-xl shadow-inner overflow-hidden"
    >
      <div class="h-1/4 flex border-b-2 border-white-700">
        <h1 class="text-gray-700 text-2xl font-semibold m-auto">
          Blackberry Bush
        </h1>
      </div>
      <div class="h-1/4 flex border-b-2 border-white-700">
        <h1 class="text-gray-700 text-2xl font-semibold m-auto">28/06/2021</h1>
      </div>
      <div class="h-1/4 flex border-b-2 border-white-700">
        <h1 class="text-gray-700 text-2xl font-semibold m-auto">
          1.2 Miles Away
        </h1>
      </div>
      <div class="h-1/4 flex justify-center space-x-10 items-center">
        <MyButton
          title="Create"
          class="bg-green-500"
          @click="addMarker"
        ></MyButton>
        <MyButton
          title="Cancel"
          class="bg-red-500"
          @click="isHidden = true"
        ></MyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MyButton from "./MyButton.vue";

export default {
  components: {
    MyButton,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      isHidden: false,
    };
  },
};
</script>

<style scoped></style>
