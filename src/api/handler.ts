import type { AxiosResponse } from 'axios'

// Template of a response handler for axios.
// The return type is dependent on the generic.

export function handleResponse<T>({ status, data }: Partial<AxiosResponse<T>>) {
  // can include status here if available
  if (data)
    return { response: data, status }

  else
    throw new Error('Response is not valid')
}
