/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1c2q0glp906ejpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udhzcftv",
    "name": "startMonth",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmgog9og",
    "name": "endMonth",
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
  collection.schema.removeField("udhzcftv")

  // remove
  collection.schema.removeField("dmgog9og")

  return dao.saveCollection(collection)
})
