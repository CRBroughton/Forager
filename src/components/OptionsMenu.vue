<template>
  <div v-if="!isHidden" class="bottom-0 w-full p-3">
    <div class="flex m-auto w-full justify-center">
      <MyButton title="Delete Home" class="mb-1 mr-1" @click="deleteHome">
        Delete Home
      </MyButton>
      <MyButton title="Delete Markers" class="mb-1 mr-1" @click="deleteMarkers">
        Delete Markers
      </MyButton>
    </div>
  </div>
</template>

<script lang="ts">
import MyButton from "./buttons/BaseButton.vue";
import db from "../Localbase";

export default {
  props: ["optionsVisible"],
  components: {
    MyButton,
  },
  data() {
    return {
      isHidden: this.optionsVisible,
    };
  },
  methods: {
    hideOptions() {
      this.isHidden = true;
      this.$emit("hideOptions");
    },
    deleteHome() {
      db.collection("home").delete();
      window.location.reload();
    },
    deleteMarkers() {
      db.collection("markers").delete();
      window.location.reload();
    }
  },
};
</script>

<style scoped></style>
