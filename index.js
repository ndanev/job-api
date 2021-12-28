const config = require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoURI = global.gConfig.mongoURI;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

const users = require('./routes/api/users');
const jobs = require('./routes/api/jobs');
app.use('/api/users', users);
app.use('/api/jobs', jobs);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => { console.log('MongoDB has been connected...') })
    .catch(error => { console.log(error, 'MongoDB error conncetion...') });


const port = process.env.PORT || 5001;


// module.exports = app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;