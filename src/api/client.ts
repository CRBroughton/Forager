import type { OpenWeatherResponse } from './types'
import { httpClient } from './wrapper'

interface Params {
  apikey?: string
  lat: number
  lng: number
  imperial?: boolean
}

export class OpenWeatherAPIClient {
  async fetchWeatherData(params: Params) {
    if (!params.apikey)
      return


    const lat = String(params.lat)
    const lng = String(params.lng)
    return httpClient.get<OpenWeatherResponse>(
      {
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=${params.imperial ? 'imperial' : 'metric'}&appid=${params.apikey}`,
      },
    )
  }
}
