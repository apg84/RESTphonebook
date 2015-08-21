var mongoose = require('mongoose');
var Phonebook = mongoose.model('Entry');

//Returns all the records in the database
exports.findAll = function(req, res) {
    Phonebook.find({}, function(err, results) {
	if(err)
	    return res.status(404).send("The request could not be satisfied");
	return res.status(200).send(results);
	});
};

//Returns all the matching records in the database
exports.findBySurname = function() {};

//If the request is well formed, adds a new record
exports.add = function(req, res) {
    //console.log(req.body);
    Phonebook.create(req.body, function(err, newEntry) {
	if(err) return res.status(400).send("bad request");
	return res.status(201).send(newEntry._id);
    });

};

//If the request is well formed modifies a specific record
exports.update = function() {};

//Deletes a record from the database. Since the only unique 
//field will be the _id which is automatically added by mongoose
exports.delete = function() {};

