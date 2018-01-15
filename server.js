const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/index');

app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});

app.use(cors());
app.use(express.static('public'));
app.use(router);