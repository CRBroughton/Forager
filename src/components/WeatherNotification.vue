<script setup lang="ts">
import { OpenWeatherAPIClient } from '@/api/client'
import type { OpenWeatherResponse } from '@/api/types'

interface Props {
  lat: number
  lng: number
}
const props = defineProps<Props>()
const apikey = import.meta.env.VITE_OPEN_WEATHER_API_KEY as string
const openWeatherAPIClient = new OpenWeatherAPIClient()
const weatherData = ref<OpenWeatherResponse>()

async function fetchWeather() {
  const response = await openWeatherAPIClient.fetchWeatherData({
    lat: props.lat,
    lng: props.lng,
    apikey,
  })

  if (response !== undefined) 
    weatherData.value = response
  
}

onMounted(async () => {
  await fetchWeather()
})
</script>

<template>
  <Transition name="error">
    <div class="absolute z-50 top-0 left-0 w-screen h-12 p-4">
      <div class="bg-gray-100 w-full flex justify-center items-center p-4 rounded-xl">
        <p class="font-semibold">
          {{ weatherData?.daily[0].feels_like }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.error-enter-active {
  transition: all 0.1s ease-out;
}

.error-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.error-enter-from,
.error-leave-to {
  transform: translateY(-100%);
}
</style>
