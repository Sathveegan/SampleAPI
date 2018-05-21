'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./model/book.model.js');

const BookRouter = require('./route/book.route.js');

const app = express();

app.use(bodyParser.json());

app.use('/app', express.static(__dirname + '/public'));


mongoose.connect('mongodb://localhost:27017/bookDetails', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("MongoDB connected."); 
});

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/books', BookRouter);

app.get('/app/*', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, err => { 
    if (err) { 
        console.error(err); 
        return; 
    } 
    console.log('app listening on port 3000'); 
}); 
