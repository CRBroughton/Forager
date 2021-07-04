<template>
  <div v-if="!isHidden" class="bottom-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full"></div>
      <div class="flex m-auto w-full justify-center">
        <MyButton
          :title="
            title +
            distance.toFixed(2) +
            measure +
            distanceMiles.toFixed(2) +
            milesTitle
          "
          class="mb-1 my-1 px-5 w-auto"
          @click="hidePopup"
        ></MyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { defineComponent } from "@vue/runtime-core";
import MyButton from "./buttons/BaseButton.vue";
import { enablePathFinder } from "@/functions/Pathfinder";

export default defineComponent({
  props: {
    distance: {
      required: true,
      type: Number,
    },
    distanceMiles: {
      required: true,
      type: Number,
    },
  },
  components: {
    MyButton,
  },
  setup() {
    const input = ref<string>("");
    const isHidden = ref<boolean>(false);
    const title = "Distance: ";
    const measure = " Km / ";
    const milesTitle = " Miles";

    const hidePopup = () => {
      isHidden.value = true;
      enablePathFinder();
    };

    return {
      input,
      isHidden,
      hidePopup,
      title,
      measure,
      milesTitle,
    };
  },
});
</script>

<style scoped></style>
