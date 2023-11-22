/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Services = "Services",
	Items = "items",
	Landmarks = "landmarks",
	Notifications = "notifications",
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

export type ItemsRecord = {
	colour?: string
	date: IsoDateString
	endMonth?: string
	imageURL?: string
	lastForaged?: string
	lat: number
	lng: number
	name: string
	owner: RecordIdString
	sharedWith?: RecordIdString[]
	startMonth?: string
}

export type LandmarksRecord = {
	lat: number
	lng: number
	name: string
	owner: RecordIdString
}

export type NotificationsRecord = {
	body: string
	owner: RecordIdString
	title: string
	type: string
}

export type UsersRecord<Timages = unknown> = {
	avatar?: string
	disclaimerAgreed?: boolean
	images?: null | Timages
	lat?: number
	lng?: number
	mapboxAPIKey?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ServicesResponse<Texpand = unknown> = Required<ServicesRecord> & BaseSystemFields<Texpand>
export type ItemsResponse<Texpand = unknown> = Required<ItemsRecord> & BaseSystemFields<Texpand>
export type LandmarksResponse<Texpand = unknown> = Required<LandmarksRecord> & BaseSystemFields<Texpand>
export type NotificationsResponse<Texpand = unknown> = Required<NotificationsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Timages = unknown, Texpand = unknown> = Required<UsersRecord<Timages>> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Services: ServicesRecord
	items: ItemsRecord
	landmarks: LandmarksRecord
	notifications: NotificationsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Services: ServicesResponse
	items: ItemsResponse
	landmarks: LandmarksResponse
	notifications: NotificationsResponse
	users: UsersResponse
}