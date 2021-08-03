<template>
  <div class="w-screen h-screen bg-white cursor-wait">
    <div class="h-4/6 flex">
      <div
        class="bg-yellow-100 object-scale-down p-8 rounded-full shadow-xl m-auto"
      >
        <img
          class="w-52 h-52 m-auto"
          src="../assets/logo.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="h-2/6">
      <div class="h-1/3 flex">
        <h1 class="m-auto text-3xl font-semibold">Forager</h1>
      </div>
      <div class="h-1/3 flex">
        <h3 class="m-auto text-1xl">Loading...</h3>
      </div>
      <div class="h-1/3 flex">
        <div class="m-auto text-xs font-thin mb-20">
          Icon made by
          <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { delay } from "@/functions/App";

export default defineComponent({
  emits: ["loadingFinished"],
  setup(__, { emit }) {
    const loading = async () => {
      await delay(500);
      emit("loadingFinished");
    };
    loading();
  },
});
</script>

<style scoped></style>
