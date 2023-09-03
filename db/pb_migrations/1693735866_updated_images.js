/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("un8mmspzvxpw9mf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fyf4qezb",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("un8mmspzvxpw9mf")

  // remove
  collection.schema.removeField("fyf4qezb")

  return dao.saveCollection(collection)
})
