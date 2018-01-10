var express = require('express');
var app = express();
app.listen(3000, function() {
     console.log("Start server on port 3000!");
});
app.use(express.static('dist'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/dist/index.html');
});