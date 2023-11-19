package main

import (
	"embed"
	"log"
	"os"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "github.com/crbroughton/forager/migrations"
	"github.com/crbroughton/forager/seeder"
)

//go:embed all:dist
var distDir embed.FS

func main() {
	app := pocketbase.New()

	seeder.AddSeederCommand(app)

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Admin UI
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the /market/dist directory
		subFs := echo.MustSubFS(distDir, "dist")
		e.Router.GET("/*", apis.StaticDirectoryHandler(subFs, false))

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
