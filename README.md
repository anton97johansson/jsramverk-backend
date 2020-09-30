1. #### create file /config/config.json
make it look like This
`{
    "secret": "CHANGE TO YOUR SECRET CODE"
}
`
2. #### create migrate.sql with inside /db/

`CREATE TABLE IF NOT EXISTS week (
    week INT NOT NULL,
    data TEXT NOT NULL,
    UNIQUE(week)
);
`

`CREATE TABLE users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);
`

3. #### create sqlite3 file called texts.sqlite and run migrate.sql

4. #### npm install
install dependencies

5. #### npm start
Server runs at port 1337

[![Build Status](https://travis-ci.org/anton97johansson/jsramverk-backend.svg?branch=master)](https://travis-ci.org/anton97johansson/jsramverk-backend)