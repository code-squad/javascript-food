const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/mainSlide', function (req, res) {
    fs.readFile(__dirname + '/../public/mainSlide.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

router.get('/best', function (req, res) {
    fs.readFile(__dirname + '/../public/best.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

router.get('/main', function (req, res) {
    fs.readFile(__dirname + '/../public/main.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

router.get('/side', function (req, res) {
    fs.readFile(__dirname + '/../public/side.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

router.get('/soup', function (req, res) {
    fs.readFile(__dirname + '/../public/soup.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

module.exports = router;