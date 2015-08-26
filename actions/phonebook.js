'use strict'

var mongoose = require('mongoose');
var Phonebook = mongoose.model('Entry');

//Returns all the records in the database
exports.findAll = function(req, res) {
    Phonebook.find({}, function(err, results) {
	if(err) return res.status(404).send("The request could not be satisfied");
	return res.status(200).send(results);	
    });
};

//Returns all the matching records in the database
exports.findBySurname = function(req, res) {
    var surname = req.params.surname;
    Phonebook.find({'surname':surname}, function(err, results) {
	if(err) return res.status(404).end("An error occured when trying to find by surname!");
	return res.status(200).send(results);
	
    });
};

//If the request is well formed, adds a new record
exports.add = function(req, res) {
    Phonebook.create(req.body, function(err, newEntry) {
	if(err) return res.status(404).send("An error occured when trying to create an entry!");
	return res.status(201).send(newEntry._id);
    });

};

//If the request is well formed modifies a specific record
exports.update = function(req, res) {
    var id = req.params.id;
    
    
    Phonebook.findOneAndUpdate({'_id': id}, req.body, {'new': true}, function(err, newData) {
	if(err) return res.status(404).send("An error occured when trying to update an entry!");
	return res.status(200).send(newData._id);

    });

};

//Deletes a record from the database. Since the only unique 
//field will be the _id which is automatically added by mongoose
exports.delete = function(req, res) {
    var id = req.params.id;
    Phonebook.remove({'_id':id}, function(err, id) {
	if(err) return res.status(404).send("An error occured while trying to delete an entry!");
	return res.status(200).send(id);
    });

};

    


