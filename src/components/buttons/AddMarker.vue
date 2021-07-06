<template>
  <div v-if="!isHidden" class="bottom-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full">
        <input
          type="text"
          class="w-full flex my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-center rounded-xl focus:ring-2 focus:ring-gray-400"
          placeholder="Please Enter Object Name"
          v-model="input"
        />
      </div>
      <div class="flex m-auto w-full justify-center">
        <MyButton title="Create" class="mb-1 mr-1" @click="createMarker" />
        <MyButton title="Cancel" class="mb-1 mr-1" @click="hidePopup" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import MyButton from "./BaseButton.vue";

export default defineComponent({
  emits: ["hideMarkerPopup", "createMarker"],
  components: {
    MyButton,
  },
  setup(props, { emit }) {
    const input = ref<string>("");
    const isHidden = ref<boolean>(false);

    const hidePopup = () => {
      isHidden.value = true;
      emit("hideMarkerPopup");
    };

    const createMarker = () => emit("createMarker", input.value);

    return {
      input,
      isHidden,
      hidePopup,
      createMarker,
    };
  },
});
</script>

<style scoped></style>
