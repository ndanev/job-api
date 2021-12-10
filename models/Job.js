const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: false
    },
    jobDesc: {
        type: String,
        required: true
    },
    applicationTarget: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyImageUrl: {
        type: String,
        required: false
    },
    skills: {
        type: Array,
        required: true
    },
    currency: {
        type: String,
        required: false
    },
    minSalary: {
        type: Number,
        required: false
    },
    maxSalary: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Job = mongoose.model('job', JobSchema);