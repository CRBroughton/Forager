<template>
  <div class="absolute top-0 left-0 w-screen h-screen z-50 flex justify-center overflow-scroll settings">
    <div class="w-full md:w-2/3">
      <div class="flex flex-col gap-4 overflow-scroll p-4 h-screen">
        <div class="flex gap-2 items-center">
          <h1 class="text-2xl font-medium">
            <slot name="title" />
          </h1>
          <slot name="info" />
        </div>
        <hr class="h-[1px] min-h-[1px] w-full bg-gray-400 border-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings {
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(20px);
}
</style>
