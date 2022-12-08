const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User')

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
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = Job = mongoose.model('job', JobSchema);