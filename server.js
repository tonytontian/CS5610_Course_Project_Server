//GET NEEDED PACKAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');            //library required for parsing json
var session = require('express-session');           //library for session management

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    secret: 'any string'                            //sign the cookie with a string (encrypt cookie)
}));

app.use((function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://rocky-shore-19700.herokuapp.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}));
// app.use((function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// }));

require('./services/user.service.server')(app);
require('./services/movie.service.server')(app);
require('./services/communication.service.server')(app);
require('./data/db')(); //pass app to student service


//API ROUTES
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'API route working!' });

});
app.use('/api', router);


//START SERVER
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});

