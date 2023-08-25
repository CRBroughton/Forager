/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hr63a5o7",
    "name": "lng",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7zkkybm4",
    "name": "lat",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  // remove
  collection.schema.removeField("hr63a5o7")

  // remove
  collection.schema.removeField("7zkkybm4")

  return dao.saveCollection(collection)
})
