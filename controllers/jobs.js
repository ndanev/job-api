const Job = require('../models/Job');
const mongoose = require('mongoose');

const create = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).send(job);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying create the new job."
        })
    }
}

const getAll = async (req, res) => {
    try {
        let jobs = null
        const search = req.query.search;
        if (search) {
            jobs = await Job.find({
                $or: ['location', 'jobType', 'jobTitle', 'level', 'companyName', 'skills'].map(key => ({
                    [key]: {
                        $regex: ".*" + search + ".*",
                        $options: "-i"
                    }
                }))
            }).sort({ date: -1 })
        } else {
            jobs = await Job.find().sort({ date: -1 });
        }
        res.status(200).send(jobs);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying get the jobs."
        })
    }
}

const getById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        res.status(200).send(job);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying get the single job."
        })
    }
}

const update = async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.jobId, req.body, { useFindAndModify: false, new: true });
        res.send(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying update the job."
        })
    }
}

module.exports = { create, getAll, getById, update }