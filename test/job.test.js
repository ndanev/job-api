let server;
const chai = require('chai');
const chaiHttp = require('chai-http');
const dbHandler = require('./db-handler');

// Assertion Style
chai.should();

chai.use(chaiHttp);

/* Connect to a new in-memory database before running any tests. */
before(async () => {
    await dbHandler.connect()
    server = require('../index');
});

/* Clear all test data after every test. */
// afterEach(async () => await dbHandler.clearDatabase());

/* Remove and close the db and server. */
after(async () => await dbHandler.closeDatabase());

// GET all jobs
describe("GET /api/job", () => {
    it("There should not be any jobs.", (done) => {
        chai.request(server)
            .get('/api/job')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
    })
});

// POST Create one job
describe("Create some jobs", () => {
    it("Create one job", (done) => {
        const jobBody = {
            "title": "junior developer",
            "type": "full-time",
            "level": "medior",
            "description": "some description text text text text text text",
            "target": "vuejs javascript html css",
            "email": "company@test.com",
            "companyName": "companyName",
            "skills": "vuejs javascript",
            "currency": "EUR",
            "minSalary": "500",
            "maxSalary": "1000",
            "location": "Belgrade"
        }
        chai.request(server)
            .post('/api/job')
            .send(jobBody)
            .end((err, response) => {
                response.should.have.status(201);
                done();
            });
    })
});

// GET all current jobs
describe("GET /api/job", () => {
    it("There should be added one more job.", (done) => {
        chai.request(server)
            .get('/api/job')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(1);
                done();
            });
    });
});