/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o2x1kspd",
    "name": "imageURL",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  // remove
  collection.schema.removeField("o2x1kspd")

  return dao.saveCollection(collection)
})
