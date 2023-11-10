export interface IHttpClient {
  get<T>(params: IHttpClientRequestParameters): Promise<T>
}
  
export interface IHttpClientRequestParameters {
  url: string
}
  
export interface OpenWeatherResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: Current
  minutely: Minutely[]
  hourly: Hourly[]
  daily: Daily[]
}
  
interface Daily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: Temp
  feels_like: Feelslike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  clouds: number
  pop: number
  rain: number
  uvi: number
}
  
interface Feelslike {
  day: number
  night: number
  eve: number
  morn: number
}
  
interface Temp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}
  
interface Hourly {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  pop: number
  rain?: Rain
}
  
interface Minutely {
  dt: number
  precipitation: number
}
  
interface Current {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  rain: Rain
}
  
interface Rain {
  '1h': number
}
  
interface Weather {
  id: number
  main: string
  description: string
  icon: string
}
  
