import type { ItemsRecord, LandmarksRecord, UsersRecord } from './pocketbase-types'

export interface ItemsRecordWithID extends ItemsRecord {
  id: string
  lastForaged: string
}

export interface LandmarksRecordWithID extends LandmarksRecord {
  id: string
}

export interface UserRecordWithID extends UsersRecord {
  email: string
  id: string
  images: UserImage[]
}

export interface UserImage {
  name: string
  url: string
  colour: string
  startMonth: string
  endMonth: string
}
