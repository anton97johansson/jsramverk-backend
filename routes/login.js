var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let config;
try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}


const jwtSecret = process.env.JWT_SECRET || config.secret;

router.post('/', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    db.get("SELECT password FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (row === undefined) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "User does not exist",
                    detail: "User does not exist"
                }
            });
        }
        bcrypt.compare(password, row.password, function(err, result) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
                }
            if (result) {
                let payload = { email: email };
                let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
                return res.status(201).json({data: {
                                user: payload,
                                token: jwtToken
                            }});
                }
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "wrong password",
                        detail: "wrong password"
                    }
                });

            // res innehåller nu true eller false beroende på om det är rätt lösenord.

        });

    });


});

function checkPassword(plain, hash) {

    bcrypt.compare(plain, hash, function(err, res) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/login",
                    title: "bcrypt error",
                    detail: "bcrypt error"
                }
            });
            }
        if (res) {
            check = res;
            return res.status(201).json(res);
            }

        // res innehåller nu true eller false beroende på om det är rätt lösenord.

    });
}
module.exports = router;