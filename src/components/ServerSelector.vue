<script setup lang="ts">
const emit = defineEmits<Emits>()

interface Emits {
  (e: 'hide'): void
}
const state = useStorage('forager-store', {
  server: 'http://localhost:8090',
},
localStorage,
{ mergeDefaults: true })


const serverIsAlive = ref(false)
const serverClasses = computed(() => {
  return {
    'server-is-dead': !serverIsAlive.value,
    'server-is-alive': serverIsAlive.value,
  }
})
const debouncedFunction = useDebounceFn(async () => {
  const { response } = await useFetch(`${state.value.server}/api/health`)

  if (response.value?.status === 200) 
    serverIsAlive.value = true
  else 
    serverIsAlive.value = false
}, 1000)

function checkConnectivityDeBounce() {
  debouncedFunction()
}
checkConnectivityDeBounce()
</script>

<template>
  <div class="w-screen h-screen absolute bg-red-100 p-4">
    <div class="flex flex-col gap-2">
      <div>
        <div class="flex items-center content-center">
          <div :class="serverClasses" />
          <p v-if="!serverIsAlive">
            Could not find server
          </p>
          <p v-if="serverIsAlive">
            Found server!
          </p>
        </div>
        <input v-model="state.server" class="login-input" type="text" name="server" placeholder="Server address" @keydown="checkConnectivityDeBounce">
      </div>
     
      <BaseButton @click="emit('hide')">
        Submit
      </BaseButton>
      <BaseButton @click="emit('hide')">
        Back
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.server-is-dead {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-right: 10px;
}

.server-is-alive {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-right: 10px;
}

.login-input {
    height: 50px;
    padding: 1em;
    border-radius: 10px;
    width: 100%;
}
</style>
