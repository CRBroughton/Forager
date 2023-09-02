<script setup lang="ts">

</script>

<template>
  <div class="login-inputs">
    <h1 class="title">
      Forager
    </h1>
    <slot />
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
