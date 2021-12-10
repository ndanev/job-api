const express = require('express');
const router = express.Router();
const Job = require('../../models/Job');

router.post('/create-job', async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).send(job);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying create the new job."
        })
    }
});

router.get('/get-jobs', async (req, res) => {
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
        res.send(jobs);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying get the jobs."
        })
    }
});

router.get('/single-job/:jobId', async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        res.send(job);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying get the single job."
        })
    }
});

router.put('/edit-job/:jobId', async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.jobId, req.body, { useFindAndModify: false, new: true });
        res.send(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error has occured trying update the job."
        })
    }
});

module.exports = router;