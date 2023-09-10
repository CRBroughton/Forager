package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.Clone().FindCollectionByNameOrId("users")

		if err != nil {
			return err
		}

		collection.Schema.AddField(
			&schema.SchemaField{
				Name:     "lng",
				Type:     schema.FieldTypeNumber,
				Required: true,
				System:   false,
			},
		)

		collection.Schema.AddField(
			&schema.SchemaField{
				Name:     "lat",
				Type:     schema.FieldTypeNumber,
				Required: true,
				System:   false,
			},
		)

		collection.Schema.AddField(
			&schema.SchemaField{
				Name:     "disclaimerAgreed",
				Type:     schema.FieldTypeBool,
				Required: true,
				System:   false,
			},
		)

		collection.Schema.AddField(
			&schema.SchemaField{
				Name:     "images",
				Type:     schema.FieldTypeJson,
				Required: true,
				System:   false,
			},
		)

		err = dao.SaveCollection(collection)

		if err != nil {
			return err
		}
		return nil
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.Clone().FindCollectionByNameOrId("users")

		if err != nil {
			return err
		}

		collection.Schema.RemoveField("lng")
		collection.Schema.RemoveField("lat")
		collection.Schema.RemoveField("disclaimerAgreed")
		collection.Schema.RemoveField("images")

		dao.SaveCollection(collection)

		return nil
	})
}
