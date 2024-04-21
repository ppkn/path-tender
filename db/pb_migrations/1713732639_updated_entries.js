/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwb9pvztu2ovc9d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o9uinvox",
    "name": "photo",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwb9pvztu2ovc9d")

  // remove
  collection.schema.removeField("o9uinvox")

  return dao.saveCollection(collection)
})
