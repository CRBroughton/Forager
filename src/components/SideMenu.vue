<template>
  <div v-if="sideMenuHidden" class="top-2 right-2 w-50 flex">
    <div
      @click="toggleSideMenu"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>
  </div>
  <div v-else class="top-2 right-2 w-50 flex">
    <div
      @click="toggleSideMenu"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 12H4"
        />
      </svg>
    </div>
    <div
      @click="showOptions"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
    <div
      @click="returnHome"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </div>
    <div
      v-if="tooltipVisible"
      @click="hideTooltips"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
    </div>
    <div
      v-else
      @click="hideTooltips"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 12m5 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
    </div>
    <div
      @click="enableSearch"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 cursor-pointer"
      :class="searchMode && active"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <div
      @click="enablePathFinder"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 cursor-pointer"
      :class="pathFinderMode && active"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    </div>
    <div
      @click="donate"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
    >
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { defineComponent } from "@vue/runtime-core";
import { pathFinderMode, enablePathFinder } from "@/functions/Pathfinder";
import { donationPopupVisible, tooltipVisible } from "@/functions/SideMenu";
import { searchMode, enableSearch } from "../functions/Search";
import { optionsVisible } from "@/functions/OptionsMenu"

export default defineComponent({
  emits: ["returnHome", "hideTooltips", "showOptions", "enablePathFinder"],
  setup(__, { emit }) {
    const active = "border-red-500 border-2";
    const sideMenuHidden = ref<boolean>(true);

    const donate = () => {
      optionsVisible.value = false;
      donationPopupVisible.value = !donationPopupVisible.value;
    };

    const returnHome = () => {
      emit("returnHome");
      console.log("Returning Home...");
    };

    const hideTooltips = () => {
      tooltipVisible.value = !tooltipVisible.value;
      emit("hideTooltips");
    };

    const showOptions = () => {
      emit("showOptions");
    };

    const notWorking = () => {
      alert("Feature not yet implemented");
    };

    const toggleSideMenu = () => {
      sideMenuHidden.value = !sideMenuHidden.value;
    };

    return {
      donate,
      returnHome,
      hideTooltips,
      showOptions,
      notWorking,
      enablePathFinder,
      toggleSideMenu,
      sideMenuHidden,
      active,
      pathFinderMode,
      donationPopupVisible,
      tooltipVisible,
      searchMode,
      enableSearch,
    };
  },
});
</script>

<style scoped></style>
