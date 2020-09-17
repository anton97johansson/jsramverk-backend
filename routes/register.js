var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Created"
        }
    };
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        req.body.email,
        hash, (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            // returnera korrekt svar
            return res.status(201).json(data);
        });

    });

});

module.exports = router;