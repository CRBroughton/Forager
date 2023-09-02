/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Items = "items",
	Polygons = "polygons",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ItemsRecord = {
	name?: string
	date?: IsoDateString
	lastForaged?: IsoDateString
	owners?: RecordIdString[]
	lng?: number
	lat?: number
	colour?: string
	startMonth?: string
	endMonth?: string
}

export type PolygonsRecord<Tcoords = unknown> = {
	coords?: null | Tcoords
	owners?: RecordIdString[]
}

export type UsersRecord = {
	name?: string
	avatar?: string
	lng?: number
	lat?: number
}

// Response types include system fields and match responses from the PocketBase API
export type ItemsResponse<Texpand = unknown> = Required<ItemsRecord> & BaseSystemFields<Texpand>
export type PolygonsResponse<Tcoords = unknown, Texpand = unknown> = Required<PolygonsRecord<Tcoords>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	items: ItemsRecord
	polygons: PolygonsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	items: ItemsResponse
	polygons: PolygonsResponse
	users: UsersResponse
}