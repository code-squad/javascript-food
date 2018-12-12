const express = require('express');
const router = express.Router();
const path = require('path');
const best = require('../data/best.json');

router.get('/', (req, res) => {
    res.send({ woowahan: 'woogie' });
})

router.get('/best', (req, res) => {
    res.send(best);
})

best.forEach(v => {
    router.get(`/best/${v.category_id}`, (req, res) => {
        res.send(v);
    })
})

router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/main.json'));
})

router.get('/side', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/side.json'));
})

router.get('/soup', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/soup.json'));
})

router.get('/course', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/course.json'));
})

module.exports = router;
