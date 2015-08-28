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

//Returns all the records in the database whose surname matches the requested one
exports.findBySurname = function(req, res) {
    var surname = req.params.surname;
    Phonebook.find({'surname':surname}, function(err, results) {
	if(err) return res.status(404).end("An error occurred when trying to find by surname!");
	return res.status(200).send(results);
	
    });
};

//If the request is well formed, adds a new record
exports.add = function(req, res) {
    Phonebook.create(req.body, function(err, newEntry) {
	if(err) return res.status(404).send("An error occurred when trying to create an entry!");
	return res.status(201).send(newEntry._id);
    });

};

//If the request is well formed modifies a specific (by _id) record
exports.update = function(req, res) {
    var id = req.params.id;
    var updated = req.body;
    
    Phonebook.findOne({'_id': id}, function(err, entry) {
	if(err) return res.status(404).send("An error occurred when trying to modify an entry!");
	entry.name = updated.name;
	entry.surname = updated.surname;
	entry.phonenumber = updated.phonenumber;
	entry.address = updated.address;
	entry.validate(function(err) {
	    if(err) return res.status(400).send("The updated data cannot be validated!");
	    entry.save(function(err) {
		if(err) return res.status(404).send("An error occurred when trying to modify an entry!");
		return res.status(200).send(entry._id);
	    });
	});
    });
};

//Deletes a record from the database. Since the only unique 
//field will be the _id which is automatically added by mongoose
exports.delete = function(req, res) {
    var id = req.params.id;
    Phonebook.remove({'_id':id}, function(err, id) {
	if(err) return res.status(404).send("An error occurred while trying to delete an entry!");
	return res.status(200).send(id);
    });
};

    


