process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
chai.should();
const db = require("../db/database.js");
chai.use(chaiHttp);

describe('me api', () => {
    before(() => {
        return new Promise((resolve) => {
            db.run("REPLACE INTO week (week, data) VALUES (1, 'hej')", (err) => {
                if (err) {
                    console.error("Could not replace week", err.message);
                }
                db.run("REPLACE INTO users (email, password) VALUES ('test', '$2a$10$X3ozgkcu08vOrAUR6LJo..oG.4TNaf2778uZJRNQyW/rxLdFGNpEy')", (err) => {
                    if (err) {
                        console.error("Could not replace user", err.message);
                    }

                    resolve();
                });
            });
        });
    });
    describe('GET /', () => {
        it('index', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/weeks', () => {
        it('200 get weeks', (done) => {
            chai.request(server)
                .get("/reports/weeks")
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.an("object");
                    res.body.should.be.an("array");
                    res.body.length.should.be.equal(1);

                    done();
                });
        });
    });
    describe('GET /reports/week/1', () => {
        it('get week 1', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a("string");

                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('POST login', (done) => {
            let user = {
                email: "test",
                password: "test"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    // res.text.should.be.a("string");

                    done();
                });
        });
    });
    describe('POST wrong password /login', () => {
        it('POST login', (done) => {
            let user = {
                email: "test",
                password: "wrongpw"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    // res.text.should.be.a("string");

                    done();
                });
        });
    });
});