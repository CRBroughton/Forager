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
import MyButton from "./BaseButton.vue";

export default {
  props: ["deleteVisible"],
  components: {
    MyButton,
  },
  data() {
    return {
      isHidden: this.deleteVisible,
      input: "",
    };
  },
  methods: {
    hidePopup() {
      this.isHidden = true;
      this.$emit("hideDeletePopup");
    },
    deleteMarker() {
      this.isHidden = true;
      this.$emit("deleteMarker");
    },
  },
};
</script>

<style scoped></style>
