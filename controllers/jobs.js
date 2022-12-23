const Job = require('../models/Job');
const mongoose = require('mongoose');

const create = async (req, res) => {
    try {
        const userId = req.user
        const { title, type, level, description, target, email, companyName, companyImageUrl, skills, currency, minSalary, maxSalary, location } = req.body;
        const newJob = new Job({
            userId,
            title,
            type,
            level,
            description,
            target,
            email,
            companyName,
            companyImageUrl,
            skills,
            currency,
            minSalary,
            maxSalary,
            location
        })
        await newJob.save()
        console.log("newJob", newJob)
        const jobs = await Job.find().sort({ date: -1 })
        res.status(201).send(jobs);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "Internal Server Error" })
    }
}

const getAll = async (req, res) => {
    try {
        let jobs = null
        const search = req.query.search;
        if (search) {
            jobs = await Job.find({
                $or: ['location', 'type', 'title', 'level', 'companyName', 'skills'].map(key => ({
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
        console.log(err.message);
        res.status(500).send({ error: "Internal Server Error" })
    }
}

const getById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).send(job);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "Internal Server Error" })
    }
}

const update = async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new: true });
        res.send(req.body);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: "Internal Server Error" })
    }
}

module.exports = { create, getAll, getById, update }