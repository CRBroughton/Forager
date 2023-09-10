import type { ItemsRecord } from './pocketbase-types'

export interface ItemsRecordWithID extends ItemsRecord {
  id: string
}

export interface UserImage {
  name: string
  url: string
  colour: string
}
