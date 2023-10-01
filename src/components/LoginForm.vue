<script setup lang="ts">

</script>

<template>
  <div class="login-inputs">
    <div class="flex justify-center items-center gap-2">
      <img src="../../assets/logo.png" width="52" height="52">
      <h1 class="title">
        Forager
      </h1>
    </div>
    <slot />
    <div class="absolute bottom-0 w-full flex justify-center p-4">
      <p class="font-medium">
        Copyright © 2023 Craig R Broughton
      </p>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 32px;
  font-weight: 500;
}

.login-inputs {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    padding-inline: 1em;
}
</style>
