'use strict'

module.exports = function(app){
	var phonebook = require('./actions/phonebook');
	app.get('/phonebook', phonebook.findAll);
    	app.get('/phonebook/:surname', phonebook.findBySurname);
    	app.post('/phonebook', phonebook.add);
    	app.put('/phonebook/:id', phonebook.update);
    	app.delete('/phonebook/:id', phonebook.delete);
}

