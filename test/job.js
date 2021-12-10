const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

// Assertion Style
chai.should();

chai.use(chaiHttp);

var numberOfJobs = 0;

describe('Testing Jobs API', () => {

    // GET all jobs
    describe("GET /api/jobs/get-jobs", () => {
        it("There should not be any jobs.", (done) => {
            chai.request(server)
                .get('/api/jobs/get-jobs')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    numberOfJobs = response.body.length;
                    console.log("Number of Jobs:", numberOfJobs);
                    done();
                });
        })
    });


    // POST Create one job
    describe("Create some jobs", () => {
        it("Create one job", (done) => {
            const jobBody = {
                "jobTitle": "junior developer",
                "jobType": "full-time",
                "level": "medior",
                "jobDesc": "some description text text text text text text",
                "applicationTarget": "vuejs javascript html css",
                "emailAddress": "company@test.com",
                "companyName": "companyName",
                "skills": "vuejs javascript",
                "currency": "EUR",
                "minSalary": "500",
                "maxSalary": "1000",
                "location": "Belgrade"
            }
            chai.request(server)
                .post('/api/jobs/create-job')
                .send(jobBody)
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                });
        })
    });

    // GET all current jobs 
    describe("GET /api/jobs/get-jobs", () => {
        it("There should be added one more job.", (done) => {
            chai.request(server)
                .get('/api/jobs/get-jobs')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(numberOfJobs + 1);
                    done();
                });
        });
    });

});