<template>
  <div v-if="!isHidden" class="top-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full"></div>
      <div class="flex m-auto w-full justify-center">
        <MyButton
          title="Marker Deleted!"
          class="mb-1 mr-1"
          @click="hidePopup"
        ></MyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import MyButton from "./BaseButton.vue";

export default {
  props: ["deleteVisible"],
  components: {
    MyButton,
  },
  setup(props, { emit }) {
    const input = ref("");
    const isHidden = ref(props.deleteVisible);

    const hidePopup = () => {
      isHidden.value = true;
      emit("hideDeletePopup");
    };

    const deleteMarker = () => {
      isHidden.value = true;
      emit("deleteMarker");
    };

    return { input, isHidden, hidePopup, deleteMarker };
  },
};
</script>

<style scoped></style>
