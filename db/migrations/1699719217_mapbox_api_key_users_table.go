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

		collection, err := dao.FindCollectionByNameOrId("users")

		if err != nil {
			return err
		}

		collection.Schema.AddField(&schema.SchemaField{
			Name:   "mapboxAPIKey",
			Type:   schema.FieldTypeText,
			System: false,
		})

		err = dao.SaveCollection(collection)

		if err != nil {
			return err
		}

		return nil
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("users")

		if err != nil {
			return err
		}

		mapboxAPIKeyField := collection.Schema.GetFieldByName("mapboxAPIKey")

		collection.Schema.RemoveField(mapboxAPIKeyField.Id)

		err = dao.SaveCollection(collection)

		if err != nil {
			return err
		}

		return nil
	})
}
