import type { ImagesRecord, ItemsRecord } from './pocketbase-types'

export interface ItemsRecordWithID extends ItemsRecord {
  id: string
}

export interface ImagesRecordWithID extends ImagesRecord {
  id: string
}
