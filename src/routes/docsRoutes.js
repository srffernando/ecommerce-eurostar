const express = require('express');
const docsController = require('../controllers/docsController');

const router = express.Router();

router.use('/docs', docsController.serve, docsController.setup);

module.exports = router;
