/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jwb9pvztu2ovc9d",
    "created": "2024-04-21 15:15:27.490Z",
    "updated": "2024-04-21 15:15:27.490Z",
    "name": "entries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wvoxnb4q",
        "name": "notes",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "weatbvr9",
        "name": "isPublished",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "t5rxnl6q",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_K5qd3Y8` ON `entries` (`user`)"
    ],
    "listRule": "@request.auth.id = user.id || isPublished = true",
    "viewRule": "@request.auth.id = user.id || isPublished = true",
    "createRule": "@request.auth.id = user.id",
    "updateRule": "@request.auth.id = user.id",
    "deleteRule": "@request.auth.id = user.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jwb9pvztu2ovc9d");

  return dao.deleteCollection(collection);
})
