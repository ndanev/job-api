const OpenAPIBackend = require('openapi-backend').default;
const config = require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoURI = global.gConfig.mongoURI;
const jobController = require('./controllers/jobs');
const userController = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

const api = new OpenAPIBackend({
    definition: './openapi.yml'
});

api.register({
    getAllJobs: jobController.getAll,
    getJobsById: jobController.getById,
    addNewJob: jobController.create,
    updateJobsById: jobController.update,
    createUserAccount: userController.register,
    loginUser: userController.login,
    userProfile: userController.profile
});

api.init();
// use as express middleware
app.use((req, res) => api.handleRequest(req, req, res));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => { console.log('MongoDB has been connected...') })
    .catch(error => { console.log(error, 'MongoDB error connection...') });


const port = process.env.PORT || 5001;


// module.exports = app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;