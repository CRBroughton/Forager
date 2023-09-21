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

		routesCollection := &models.Collection{
			Name:       "routes",
			Type:       models.CollectionTypeBase,
			ListRule:   ownerOnly,
			ViewRule:   ownerOnly,
			CreateRule: types.Pointer(""),
			UpdateRule: ownerOnly,
			DeleteRule: ownerOnly,
			Schema: schema.NewSchema(
				&schema.SchemaField{
					Name:     "name",
					Type:     schema.FieldTypeText,
					Required: true,
					System:   false,
				},
				&schema.SchemaField{
					Name:     "date",
					Type:     schema.FieldTypeText,
					Required: true,
					System:   false,
				},
				&schema.SchemaField{
					Name:     "points",
					Type:     schema.FieldTypeJson,
					Required: true,
					System:   false,
				},
			),
		}

		err := dao.SaveCollection(routesCollection)

		if err != nil {
			return err
		}

		return nil
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.Clone().FindCollectionByNameOrId("routes")
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
