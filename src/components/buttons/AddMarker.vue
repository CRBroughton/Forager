<template>
  <div v-if="!isHidden" class="bottom-2 right-2 w-auto">
    <div class="flex m-auto flex-col items-center">
      <input
        type="text"
        class="w-full flex rounded my-5 py-3 shadow-xl border-gray-200 border cursor-pointer outline-none focus:outline-none"
        placeholder="Object Name"
      />
    </div>
    <div class="flex flex-row-reverse0">
      <div class="flex w-60">
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
    };
  },
  methods: {
    hidePopup() {
      this.isHidden = true;
      this.$emit("hideMarkerPopup");
    },
    createMarker() {
      this.$emit("createMarker");
    },
  },
};
</script>

<style scoped></style>
