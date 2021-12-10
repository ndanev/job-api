const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe("GET /api/jobs/get-jobs", () => {
    it("There should not be any jobs.", (done) => {
        chai.request(server)
            .get('/api/jobs/get-jobs')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(0);
                done();
            });
    })
});

