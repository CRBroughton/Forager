/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  collection.listRule = "@request.auth.id = owners.id && @request.auth.id != ''"
  collection.viewRule = "@request.auth.id = owners.id && @request.auth.id != ''"
  collection.updateRule = "@request.auth.id = owners.id && @request.auth.id != ''"
  collection.deleteRule = "@request.auth.id = owners.id && @request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  collection.listRule = "@request.auth.id = owners.id"
  collection.viewRule = "@request.auth.id = owners.id"
  collection.updateRule = "@request.auth.id = owners.id"
  collection.deleteRule = "@request.auth.id = owners.id"

  return dao.saveCollection(collection)
})
