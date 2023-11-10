import type { OpenWeatherResponse } from './types'
import { httpClient } from './wrapper'

interface Params {
  apikey?: string
  lat: string
  lon: string
  imperial?: boolean
}

export class OpenWeatherAPIClient {
  async fetchWeatherData(params: Params) {
    if (!params.apikey)
      return

    return httpClient.get<OpenWeatherResponse>(
      {
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${params.lat}&lon=${params.lon}&units=${params.imperial ? 'imperial' : 'metric'}&appid=${params.apikey}`,
      },
    )
  }
}
