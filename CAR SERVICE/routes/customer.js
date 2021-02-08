const express = require('express');
const router = express.Router();

const csrf = require('../middleware/csrf');

const customerController = require('../controllers/customer');

router.get('/', csrf, customerController.getIndex);

router.get('/search', csrf, customerController.getSearch);

router.post('/search', csrf, customerController.postSearch);

module.exports = router;