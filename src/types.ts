import type { ItemsRecord } from './pocketbase-types'

export interface ItemsRecordWithID extends ItemsRecord {
  id: string
}
