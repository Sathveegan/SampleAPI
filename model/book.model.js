'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    ID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;