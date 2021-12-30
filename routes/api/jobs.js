const express = require('express');
const router = express.Router();
const jobController = require('../../controllers/jobs');

/* GET - Get all jobs */
router.get('', jobController.getAll);

/* POST - Create single job */
router.post('', jobController.create);

/* GET - Get single job by ID */
router.get('/:id', jobController.getById);

/* PUT - Update single job */
router.put('/:id', jobController.update);

module.exports = router;