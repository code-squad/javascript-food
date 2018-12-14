const express = require('express');
const router = express.Router();
const banchan = require('../data/banchan.json');

function getBanchanApi(query) {
    let api;
    const boolean = banchan.some(v => api = v.qs === query ? v : undefined)
    return boolean ? Object.values(api) : { error: "not found" };
}

router.get(`/:query`, (req, res) => {
    const query = req.params.query.toUpperCase();
    res.send(getBanchanApi(query));
})

router.get('/', (req, res) => {
    res.send({ welcome: 'autoComplete' })
})

module.exports = router;