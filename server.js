var path = require('path');
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 8080;

import registerApi from './backend/routes';

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

registerApi(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info("Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
    }
});