const express = require('express');
const router = express.Router();
const jobController = require('../../controllers/jobs');

/* GET - Get all jobs */
router.get('/get-jobs', jobController.getAll);

/* POST - Create single job */
router.post('/create-job', jobController.create);

/* GET - Get single job by ID */
router.get('/single-job/:jobId', jobController.getById);

/* PUT - Update single job */
router.put('/edit-job/:jobId', jobController.update);

module.exports = router;