var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var OAuthServer = require('express-oauth-server');
import model from './model';

var app = express();
var PORT = process.env.PORT || 8080;

import registerApi from './backend/routes';

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.oauth = new OAuthServer({
    model: model
});

app.post('/api/oauth/token', app.oauth.token());

registerApi(app, app.oauth);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info("Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
    }
});