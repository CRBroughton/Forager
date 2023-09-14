<template>
  <div class="absolute top-0 left-0 w-screen h-screen z-50 flex justify-center overflow-scroll settings">
    <div class="w-full md:w-2/3">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(20px);
}
</style>
