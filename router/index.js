const express = require('express');
const router = express.Router();
const woowaRouter = require('./woowa');
const acRouter = require('./autoComplete');

router.use('/woowa', woowaRouter);
router.use('/ac', acRouter);

module.exports = router;