<template>
  <div v-if="!isHidden" class="bottom-2 right-2 w-screen flex flex-row-reverse">
    <div class="flex w-60">
      <MyButton title="Create" class="mb-1 mr-1" @click="createMarker"> Create </MyButton>
      <MyButton title="Cancel" class="mb-1 mr-1" @click="hidePopup"></MyButton>
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
    }
  },
};
</script>

<style scoped></style>
