const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});

app.use(cors());
app.use(express.static('public'));

const router = require('./router/index')(app, fs);