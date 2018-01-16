module.exports = function (app, fs) {
    app.get('/mainSlide', function (req, res) {
        fs.readFile(__dirname + '/../public/mainSlide.json', 'utf8', function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    app.get('/best', function (req, res) {
        fs.readFile(__dirname + '/../public/best.json', 'utf8', function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    app.get('/main', function (req, res) {
        fs.readFile(__dirname + '/../public/main.json', 'utf8', function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    app.get('/side', function (req, res) {
        fs.readFile(__dirname + '/../public/side.json', 'utf8', function (err, data) {
            res.json(JSON.parse(data));
        });
    });

    app.get('/soup', function (req, res) {
        fs.readFile(__dirname + '/../public/soup.json', 'utf8', function (err, data) {
            res.json(JSON.parse(data));
        });
    });

}