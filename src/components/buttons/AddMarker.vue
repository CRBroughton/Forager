<template>
  <div v-if="!isHidden" class="bottom-0 w-full p-3">
    <div class="max-w-sm flex flex-col m-auto rounded-xl">
      <div class="m-auto items-center w-full">
        <input
          type="text"
          class="w-full flex my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none text-center rounded-xl"
          placeholder="Please Enter Object Name"
          v-model="input"
        />
      </div>
      <div class="flex m-auto w-full justify-center">
        <MyButton title="Create" class="mb-1 mr-1" @click="createMarker">
          Create
        </MyButton>
        <MyButton
          title="Cancel"
          class="mb-1 mr-1"
          @click="hidePopup"
        ></MyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MyButton from "./BaseButton.vue";

export default {
  props: ["popupVisible"],
  components: {
    MyButton,
  },
  data() {
    return {
      isHidden: this.popupVisible,
      input: "",
    };
  },
  methods: {
    hidePopup() {
      this.isHidden = true;
      this.$emit("hideMarkerPopup");
    },
    createMarker() {
      this.$emit("createMarker", this.input);
    },
  },
};
</script>

<style scoped></style>
