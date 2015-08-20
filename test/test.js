/* Acceptance criteria:
       List all entries in the phonebook
       Create new entry into the phonebook
       Find an entry by surname
       Remove an existing entry
       Update an existing entry in the phonebook
       The details are:
       name 
       surname
       phone number 
       address (optional)
*/




//Create new entry -> POST request
//Find an entry by surname -> GET request
//Remove an existing entry -> DELETE request
//Update an existing entry -> PUT request

var should = require('chai'),
app = require("../server.js"),
supertest = require('supertest-as-promised'),
request = supertest('http://localhost:3001'),
entry = require('./testentries.js');

describe('phonebook', function() {
//List all entries -> GET request
//The entries will be listed in json format so,
//to start with we are expecting a 200 response
//+ json.
    
    it('is reachable and responds with json', function(done) {
	request.get('/phonebook')
	    .expect('Content-Type', /json/)
	    .expect(200, done);
    });
});
