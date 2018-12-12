const express = require('express');
const router = express.Router();
const woowaRouter = require('./woowa');

router.use('/woowa', woowaRouter);

module.exports = router;