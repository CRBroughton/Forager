<template>
  <div v-if="!isHidden" class="bottom-2 right-2 w-screen flex flex-row-reverse">
    <div class="flex w-60">
      <MyButton title="Create"> Create </MyButton>
      <MyButton title="Cancel" @click="hidePopup"></MyButton>
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
  },
};
</script>

<style scoped></style>
