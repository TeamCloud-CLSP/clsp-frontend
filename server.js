var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
// var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');

app.use(express.static(__dirname + '/src'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
// app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
// app.use(bodyParser.json());                                     // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.all('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});
app.listen(3000);
console.log("App listening on port 3000");