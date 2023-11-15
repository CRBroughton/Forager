package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("Services")
		if err != nil {
			return err
		}

		record := models.NewRecord(collection)

		record.Set("id", 1)
		record.Set("canCreateAccounts", true)

		err = dao.SaveRecord(record)
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

		record, err := dao.FindRecordById(collection.Id, "1")
		if err != nil {
			return err
		}

		err = dao.DeleteRecord(record)
		if err != nil {
			return err
		}

		return nil
	})
}
