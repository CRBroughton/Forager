<template>
  <div class="w-full bottom-0 py-2 px-1 flex m-auto">
    <div
      class="w-full flex justify-center m-auto py-2 bg-gray-100 rounded-xl shadow-2xl"
    >
      <MyButton title="Delete Home" class="mb-1 mr-1 ml-1" @click="deleteHome">
        Delete Home
      </MyButton>
      <MyButton title="Delete Markers" class="mb-1 mr-1" @click="deleteMarkers">
        Delete Markers
      </MyButton>
      <MyButton title="Clear Cache" class="mb-1 mr-1" @click="clearCache">
        Clear Cache
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
    },
    clearCache() {
      caches.delete("forager-cache");
    },
  },
};
</script>

<style scoped></style>
