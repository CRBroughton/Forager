/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Services = "Services",
	Images = "images",
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

export type ServicesRecord = {
	canCreateAccounts?: boolean
}

export type ImagesRecord = {
	name?: string
	imageURL?: string
}

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
	imageURL?: string
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
	disclaimerAgreed?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type ServicesResponse<Texpand = unknown> = Required<ServicesRecord> & BaseSystemFields<Texpand>
export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>
export type ItemsResponse<Texpand = unknown> = Required<ItemsRecord> & BaseSystemFields<Texpand>
export type PolygonsResponse<Tcoords = unknown, Texpand = unknown> = Required<PolygonsRecord<Tcoords>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Services: ServicesRecord
	images: ImagesRecord
	items: ItemsRecord
	polygons: PolygonsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Services: ServicesResponse
	images: ImagesResponse
	items: ItemsResponse
	polygons: PolygonsResponse
	users: UsersResponse
}