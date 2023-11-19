package seeder

import (
	"encoding/json"
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/spf13/cobra"
)

func AddSeederCommand(app *pocketbase.PocketBase) {
	app.RootCmd.AddCommand(&cobra.Command{
		Use:   "seed",
		Short: "Seeds the database with a default admin user, item markers and landmarks",
		Run: func(cmd *cobra.Command, args []string) {
			seedTestUser(app)
			seedTestUsersMarkers(app)
			seedTestUsersLandmarks(app)
		},
	})
}

func seedTestUsersLandmarks(app *pocketbase.PocketBase) {
	db := app.Dao()

	collection, err := db.FindCollectionByNameOrId("landmarks")
	if err != nil {
		log.Fatal(err)
	}

	type item struct {
		Id    int    `json:"id"`
		Name  string `json:"name"`
		Owner int    `json:"owner"`
		Lng   string `json:"lng"`
		Lat   string `json:"lat"`
	}

	items := []item{
		{
			Id:    1,
			Name:  "The Level",
			Owner: 1,
			Lng:   "-0.13308322562591002",
			Lat:   "50.83105275081468",
		},
	}

	app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
		for _, item := range items {
			record := models.NewRecord(collection)

			record.Set("id", item.Id)
			record.Set("name", item.Name)
			record.Set("owner", item.Owner)
			record.Set("lng", item.Lng)
			record.Set("lat", item.Lat)

			err = txDao.Save(record)
			if err != nil {
				log.Fatal(err)
			}

		}
		return nil
	})

}

func seedTestUsersMarkers(app *pocketbase.PocketBase) {
	db := app.Dao()

	collection, err := db.FindCollectionByNameOrId("items")
	if err != nil {
		log.Fatal(err)
	}

	type item struct {
		Id          int    `json:"id"`
		Name        string `json:"name"`
		Date        string `json:"date"`
		LastForaged string `json:"lastForaged"`
		Owner       int    `json:"owner"`
		Lng         string `json:"lng"`
		Lat         string `json:"lat"`
		Colour      string `json:"colour"`
		StartMonth  string `json:"startMonth"`
		EndMonth    string `json:"endMonth"`
		ImageURL    string `json:"imageURL"`
	}

	items := []item{
		{
			Id:         1,
			Name:       "Blackberries",
			Date:       "2023-11-14 19:23:57",
			Owner:      1,
			Lng:        "-0.13107839490911033",
			Lat:        "50.8315128991386",
			Colour:     "purple",
			StartMonth: "August",
			EndMonth:   "September",
			ImageURL:   "https://upload.wikimedia.org/wikipedia/commons/7/78/Ripe%2C_ripening%2C_and_green_blackberries.jpg",
		},
		{
			Id:         2,
			Name:       "Hawthorn",
			Date:       "2023-11-14 19:23:58",
			Owner:      1,
			Lng:        "-0.13254663509749776",
			Lat:        "50.8304424332006",
			Colour:     "deeppink",
			StartMonth: "January",
			EndMonth:   "December",
			ImageURL:   "https://images.immediate.co.uk/production/volatile/sites/23/2019/09/GettyImages-513147101-hawthorn-Neil-Holmes-dba76ab.jpg",
		},
		{
			Id:         3,
			Name:       "Elderberries",
			Date:       "2023-11-14 19:23:60",
			Owner:      1,
			Lng:        "-0.13364328363357458",
			Lat:        "50.83169035368675",
			Colour:     "cadetblue",
			StartMonth: "January",
			EndMonth:   "December",
			ImageURL:   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Sambucus-berries.jpg/1280px-Sambucus-berries.jpg",
		},
		{
			Id:         4,
			Name:       "Rhubarb",
			Date:       "2023-11-14 19:23:12",
			Owner:      1,
			Lng:        "-0.13408738097555783",
			Lat:        "50.83086604297725",
			Colour:     "purple",
			StartMonth: "January",
			EndMonth:   "December",
			ImageURL:   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rheum_rhabarbarum.2006-04-27.uellue.jpg/1280px-Rheum_rhabarbarum.2006-04-27.uellue.jpg",
		},
	}

	app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
		for _, item := range items {
			record := models.NewRecord(collection)

			record.Set("id", item.Id)
			record.Set("name", item.Name)
			record.Set("date", item.Date)
			record.Set("owner", item.Owner)
			record.Set("lastForaged", item.LastForaged)
			record.Set("lng", item.Lng)
			record.Set("lat", item.Lat)
			record.Set("colour", item.Colour)
			record.Set("startMonth", item.StartMonth)
			record.Set("endMonth", item.EndMonth)
			record.Set("imageURL", item.ImageURL)

			err = txDao.Save(record)
			if err != nil {
				log.Fatal(err)
			}

		}
		return nil
	})

}

func seedTestUser(app *pocketbase.PocketBase) {
	db := app.Dao()

	collection, err := db.FindCollectionByNameOrId("users")
	if err != nil {
		log.Fatal(err)
	}

	record := models.NewRecord(collection)

	type image struct {
		Colour     string `json:"colour"`
		Name       string `json:"name"`
		Url        string `json:"url"`
		StartMonth string `json:"startMonth"`
		EndMonth   string `json:"endMonth"`
	}

	images := []image{
		{
			Colour:     "purple",
			Name:       "Blackberries",
			Url:        "https://upload.wikimedia.org/wikipedia/commons/7/78/Ripe%2C_ripening%2C_and_green_blackberries.jpg",
			StartMonth: "August",
			EndMonth:   "September",
		},
		{
			Colour:     "deeppink",
			Name:       "Hawthorn",
			Url:        "https://images.immediate.co.uk/production/volatile/sites/23/2019/09/GettyImages-513147101-hawthorn-Neil-Holmes-dba76ab.jpg",
			StartMonth: "January",
			EndMonth:   "December",
		},
		{
			Name:       "Rhubarb",
			Url:        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rheum_rhabarbarum.2006-04-27.uellue.jpg/1280px-Rheum_rhabarbarum.2006-04-27.uellue.jpg",
			StartMonth: "January",
			EndMonth:   "December",
		},
		{
			Colour:     "cadetblue",
			Name:       "Elderberries",
			Url:        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Sambucus-berries.jpg/1280px-Sambucus-berries.jpg",
			StartMonth: "January",
			EndMonth:   "December",
		},
	}

	JSON, err := json.MarshalIndent(images, "", " ")
	if err != nil {
		log.Fatal(err)
	}

	log.Default().Println(JSON, images)

	record.Set("id", 1)
	record.Set("name", "testuser")
	record.Set("username", "testuser")
	record.Set("password", "testuser")
	record.Set("lng", -0.13309169393016873)
	record.Set("lat", 50.83106120191778)
	record.Set("disclaimerAgreed", true)
	record.Set("tokenKey", 1)
	record.Set("images", JSON)

	err = db.SaveRecord(record)
	if err != nil {
		log.Fatal(err)
	}
}
