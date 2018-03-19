const express = require('express');
const { HealthCheckController } = require('../controllers');

const router = express.Router();

router.get('/healthcheck', HealthCheckController.ping);

module.exports = router;
