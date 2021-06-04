<template>
  <div v-if="!isHidden" class="bottom-2 right-2 w-screen flex flex-row-reverse">
    <div class="flex w-60">
      <MyButton title="Create"> Create </MyButton>
      <MyButton title="Cancel" @click="isHidden = true"></MyButton>
    </div>
  </div>
</template>

<script lang="ts">
import MyButton from "./BaseButton.vue";

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      isHidden: false,
    };
  },
};
</script>

<style scoped></style>
