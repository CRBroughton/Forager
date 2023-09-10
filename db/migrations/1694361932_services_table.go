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

		collection := &models.Collection{
			Name:     "Services",
			Type:     models.CollectionTypeBase,
			ViewRule: types.Pointer(""),
			System:   false,
			Schema: schema.NewSchema(
				&schema.SchemaField{
					Name:   "canCreateAccounts",
					Type:   schema.FieldTypeBool,
					System: false,
				},
			),
		}

		err := dao.SaveCollection(collection)

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

		err = dao.DeleteCollection(collection)
		if err != nil {
			return err
		}

		return nil
	})
}
