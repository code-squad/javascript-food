const express = require('express');
const app = express();
const indexRouter = require('./router/index');
const port = '3000';

app.listen(port, () => console.log('start server'));

app.use(express.static('src'));
app.use(indexRouter);