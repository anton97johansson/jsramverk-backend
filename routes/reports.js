var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

let config = require('../config/config.json');

const jwtSecret = process.env.JWT_SECRET || config.secret;

router.get('/week/:week', function(req, res, next) {
    const week = req.params.week;
    db.get("SELECT data FROM week WHERE week = ?", [week], (err, row) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (row === undefined) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/report",
                    title: "Week does not exist",
                    detail: "Week does not exist"
                }
            });
        }
        return res.status(200).json(row);

    });
});

router.get('/weeks/', function(req, res, next) {
    db.all("SELECT week FROM week", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (rows === undefined) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/report",
                    title: "Could not retrive weeks",
                    detail: "Could not retrive weeks"
                }
            });
        }
        let weeks = [];
        rows.forEach((row) => {
            weeks.push(row.week);
        });
        return res.status(200).json(weeks);

    });
});

router.post('/',
    (req, res, next) => checkToken(req, res, next),
    function(req, res, next) {
    db.run("REPLACE INTO week (week, data) VALUES (?, ?)",
    req.body.week,
    req.body.data, (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        // returnera korrekt svar
        return res.status(201).send();
    });
});


function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/report",
                    title: "Could not autheticate token",
                    detail: "Could not autheticate token"
                }
            });
        }

        // Valid token send on the request
        next();
    });
}
module.exports = router;