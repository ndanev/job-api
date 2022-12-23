const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User')

const JobSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    email: {
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
    }
}, { timestamps: true })

module.exports = Job = mongoose.model('job', JobSchema);