var express = require('express');
const { MongoClient } = require("mongodb");
var router = express.Router();
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/chat";

router.get('/', async (req, res, next) => {
    try {
        let result = await findInCollection(dsn, "messages");
        let chatArr = [];
        result.forEach(function(item) {
            chatArr.push(item.message);
        });
        return res.status(200).json(chatArr);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }

});

async function findInCollection(dsn, colName) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const response = await col.find().toArray();

    await client.close();

    return response;
}

module.exports = router;