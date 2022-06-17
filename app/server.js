const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const path = require('path');

//initialize express.
const app = express();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support,
    methods: "GET, PUT, POST, DELETE"
}
//app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(cors(corsOptions));

// Initialize variables.
const port = 3000; // process.env.PORT || 3000;

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
//app.use(express.static('JavaScriptSPA'))
app.use(express.static('views'))

// Set up a route for index.html.
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server.
app.listen(port);
console.log('Listening on port ' + port + '...');