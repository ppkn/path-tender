/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwb9pvztu2ovc9d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lzirdnmj",
    "name": "latitude",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "asnzq9xy",
    "name": "longitude",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jwb9pvztu2ovc9d")

  // remove
  collection.schema.removeField("lzirdnmj")

  // remove
  collection.schema.removeField("asnzq9xy")

  return dao.saveCollection(collection)
})
