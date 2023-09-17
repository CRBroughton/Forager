import type { ItemsRecord, UsersRecord } from './pocketbase-types'

export interface ItemsRecordWithID extends ItemsRecord {
  id: string
}

export interface UserRecordWithID extends UsersRecord {
  email: string
  id: string
}

export interface UserImage {
  name: string
  url: string
  colour: string
}
