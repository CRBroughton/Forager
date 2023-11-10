import axios from 'axios'
import type {
  IHttpClient,
  IHttpClientRequestParameters,
} from './types'

// A basic abstraction class for axios requests

class HttpClient implements IHttpClient {
  get<T>(params: IHttpClientRequestParameters): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url } = params

      axios.get<T>(url).then(response => resolve(response.data as T))
        .catch(response => reject(response))
    })
  }
}

export const httpClient = new HttpClient()
