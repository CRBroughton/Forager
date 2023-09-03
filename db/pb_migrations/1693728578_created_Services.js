/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "c96mtjimeexn93o",
    "created": "2023-09-03 08:09:38.399Z",
    "updated": "2023-09-03 08:09:38.399Z",
    "name": "Services",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qp8wxnx9",
        "name": "canCreateAccounts",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c96mtjimeexn93o");

  return dao.deleteCollection(collection);
})
