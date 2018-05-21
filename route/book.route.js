'use strict';

const express = require('express');
const mongoose = require('mongoose');

mongoose.set('debug', false);

const BookModel = mongoose.model('Book');

const Router = express.Router();

Router.get('/', (req, res) => {
    BookModel.find().exec().then(books => {
        res.json(books);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:name', (req, res) => {
    BookModel.find({"name":req.params.name}).exec().then(books => {
        res.json(books);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    BookModel.findById(req.params.id).exec().then(book => {
        res.json(book || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const book = new BookModel(req.body);
    book.save().then(book => {
        res.json(book);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const book = req.body;
    delete book._id;
    const ID = req.params.id;
    BookModel.findByIdAndUpdate(ID, {$set: book}).then(book => {
        res.json(book);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    BookModel.findByIdAndRemove(req.params.id)
    .then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;