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

		collection, err := dao.FindCollectionByNameOrId("Services")

		if err != nil {
			return err
		}

		collection.Schema.AddField(&schema.SchemaField{
			Name:   "enableWeatherNotifications",
			Type:   schema.FieldTypeBool,
			System: false,
		})

		err = dao.SaveCollection(collection)

		if err != nil {
			return err
		}

		return nil
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("Services")

		if err != nil {
			return err
		}

		weatherField := collection.Schema.GetFieldByName("enableWeatherNotifications")

		collection.Schema.RemoveField(weatherField.Id)

		err = dao.SaveCollection(collection)

		if err != nil {
			return err
		}

		return nil
	})
}
