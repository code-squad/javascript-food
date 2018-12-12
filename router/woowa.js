const express = require('express');
const router = express.Router();
const path = require('path');
const best = require('../data/best.json');

function getCategoryApi(categoryId) {
    let api;
    const boolean = best.some(v => api = categoryId === v.category_id ? v : undefined)
    return boolean ? api : { error: 'not found' }
}

router.get('/', (req, res) => {
    res.send({ woowahan: 'woogie' });
})

router.get('/best', (req, res) => {
    res.send(best);
})

router.get('/best/:id', (req, res) => {
    const id = req.params.id.toUpperCase();
    res.send(getCategoryApi(id));
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

router.get('/main_slide', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/mainSlide.json'));
})

router.get('/sub_slide', (req, res) => {
    res.sendFile(path.join(__dirname, '../data/subSlide.json'));
})

module.exports = router;
