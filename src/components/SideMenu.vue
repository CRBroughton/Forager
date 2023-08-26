<script  setup lang="ts">
import { ref } from 'vue'
import type { LngLatLike } from 'mapbox-gl'
import { mapBoxStore } from '@/mapbox'
import { usePocketBase } from '@/pocketbase'

const { returnHome } = mapBoxStore()
const { logout } = usePocketBase()
const home: LngLatLike = [-0.12142408441471342, 50.840021634508254]

const sideMenuHidden = ref(true)
</script>

<template>
  <div v-if="sideMenuHidden" class="absolute top-2 right-2 w-50 flex">
    <div
      data-test="sidemenu-toggle-open"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
      @click="sideMenuHidden = !sideMenuHidden"
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
  <div v-else class="absolute top-2 right-2 w-50 flex flex-col">
    <div
      data-test="sidemenu-toggle-close"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
      @click="sideMenuHidden = !sideMenuHidden"
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
    <!-- <div
      data-test="sidemenu-show-options"
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
    </div> -->
    <div
      data-test="sidemenu-return-home"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
      @click="returnHome(home)"
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
    <!-- <div
      data-test="sidemenu-toggle-tooltips-off"
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
    </div> -->
    <!-- <div
      v-else
      data-test="sidemenu-toggle-tooltips-on"
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
    </div> -->
    <!-- <div
      data-test="sidemenu-enable-search"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 cursor-pointer"
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
        />
      </svg>
    </div>
    <div
      data-test="sidemenu-enable-pathfinder"
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 cursor-pointer"
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
    </div> -->
    <div
      class="h-14 w-14 mb-1 bg-white active:bg-gray-100 flex justify-center items-center rounded-full shadow-xl border-gray-200 border cursor-pointer"
      @click="logout"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="m17 8l-1.4 1.4l1.6 1.6H9v2h8.2l-1.6 1.6L17 16l4-4l-4-4M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5Z" /></svg>
    </div>
  </div>
</template>

<style scoped></style>
