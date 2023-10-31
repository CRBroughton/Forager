package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)

		ownerOnly := types.Pointer("@request.auth.id != '' && owner.id ?= @request.auth.id")
		usersCollection, err := dao.FindCollectionByNameOrId("users")

		if err != nil {
			return err
		}

		collection := &models.Collection{
			Name:       "items",
			Type:       models.CollectionTypeBase,
			ListRule:   ownerOnly,
			ViewRule:   ownerOnly,
			CreateRule: types.Pointer(""),
			UpdateRule: ownerOnly,
			DeleteRule: ownerOnly,
			System:     false,
			Schema: schema.NewSchema(
				&schema.SchemaField{
					Name:     "name",
					Type:     schema.FieldTypeText,
					Required: true,
					System:   false,
				},
				&schema.SchemaField{
					Name:     "date",
					Type:     schema.FieldTypeDate,
					Required: true,
					System:   false,
				},
				&schema.SchemaField{
					Name:   "lastForaged",
					Type:   schema.FieldTypeText,
					System: false,
				},
				&schema.SchemaField{
					Name:     "owner",
					Type:     schema.FieldTypeRelation,
					Required: true,
					System:   false,
					Options: &schema.RelationOptions{
						CollectionId:  usersCollection.Id,
						CascadeDelete: false,
						MinSelect:     types.Pointer(1),
						MaxSelect:     types.Pointer(1),
					},
				},
				&schema.SchemaField{
					Name:     "sharedWith",
					Type:     schema.FieldTypeRelation,
					Required: false,
					System:   false,
					Options: &schema.RelationOptions{
						CollectionId:  usersCollection.Id,
						CascadeDelete: false,
					},
				},
				&schema.SchemaField{
					Name:     "lng",
					Type:     schema.FieldTypeNumber,
					Required: true,
					System:   false,
				},
				&schema.SchemaField{
					Name:     "lat",
					Type:     schema.FieldTypeNumber,
					Required: true,
					System:   false,
				},
				&schema.SchemaField{
					Name:   "colour",
					Type:   schema.FieldTypeText,
					System: false,
				},
				&schema.SchemaField{
					Name:   "startMonth",
					Type:   schema.FieldTypeText,
					System: false,
				},
				&schema.SchemaField{
					Name:   "endMonth",
					Type:   schema.FieldTypeText,
					System: false,
				},
				&schema.SchemaField{
					Name:   "imageURL",
					Type:   schema.FieldTypeText,
					System: false,
				},
			),
		}

		err = dao.SaveCollection(collection)

		if err != nil {
			return err
		}
		return nil
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("items")
		if err != nil {
			return err
		}

		err = dao.DeleteCollection(collection)
		if err != nil {
			return err
		}

		return nil
	})
}
