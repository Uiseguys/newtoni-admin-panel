const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
//require multer for the file uploads
const app = express();
// API file for interacting with MongoDB


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create a cors middleware

// createFolder();





app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Angular DIST output folder




app.use(express.static(path.join(__dirname, 'dist')));
// API location
// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port

// get your dynamic subdomain



const port = process.env.PORT || '8080';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));