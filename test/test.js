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

var should = require('chai').should(),
expect = require('chai').expect,
app = require("../server.js"),
supertest = require('supertest-as-promised'),
request = supertest(app),
mockEntry = require('./testentries.js'),
mongoose = require('mongoose'),
Phonebook = mongoose.model('Entry');

describe('phonebook', function() {

/*
If the test database had been modified outside this test suite, the results
could be compromised and certain assumptions on the contents of the database
invalidated. So before starting the tests all the entries in the database are 
removed. 

*/
    beforeEach(function(done) {
	request
	.get('/phonebook')
	.expect('Content-Type', /json/)
	.expect(200)
	.end(function(err, res) {
	    if(err) done(err)
	    var entries = res.body;
	    if(entries.length > 0) {
		entries.forEach(function(entry) {
		    Phonebook.remove({_id: entry._id}, function(err) {
				     if(err) done(err);
		    });
		});
	    }
	    done();
	});
    });

//List all entries -> GET request
//The entries will be listed in json format so,
//to start with we are expecting a 200 response
//+ json.
	
    
    it('is reachable and responds with json', function(done) {
	request.get('/phonebook')
	    .expect('Content-Type', /json/)
	    .expect(200)
	.end(function(err, res) {
	    if(err) done(err);
	    else done();
	});
    });

//If we succesfully create a new entry we'll receive a 201 and the _id for the 
//entry created. We'll then check whether the entry was correctly created by 
//

    it('allows creating new entries in the phonebook', function(done) {
	request
	    .post('/phonebook')
	    .set('Accept', 'applicaton/json')
	    .send(mockEntry.fullEntry)
	    .expect('Content-Type', /json/)
	    .expect(201)
	    .end(function(err, res) {
		//expect(res.status).to.equal(201);
		if(err) done(err);
		else {
		    var id = res.body;
		    request
			.get('/phonebook')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
			    if(err) done(err);
			    else {
				var entries = res.body;
				var entryExists = false;
				//var entryExists = findByField(entries, '_id', id);
				entries.forEach(function(entry){
				    if(entry._id === id) { 
					expect(entry.name).to.equal(mockEntry.fullEntry.name);
					expect(entry).to.have.property('surname');
					expect(entry.surname).to.equal(mockEntry.fullEntry.surname);	
					expect(entry).to.have.property('phonenumber');
					expect(entry.phonenumber).to.equal(mockEntry.fullEntry.phonenumber);
					expect(entry).to.have.property('address');
					expect(entry.address).to.equal(mockEntry.fullEntry.address);
					entryExists = true;
					//done();
				    }
				
				});
				if(!entryExists) {
				    done(new Error("Reported as created but the id returned in the response was not found in the db"));
				} else {
				    done();
				}
			    }
			    
			    
			});
		    
		    
		}
	    });
      });

    it('allows creating new entries without the optional address field', function(done) {
	done();
    });

    it('prevents creation of entries without the required "name" field', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.errNoName)
	    .expect(400)
	    .end(function(err, res) {
		if(err) done(err);
		else done();
	    });

    });

    it('prevents creation of entries where name is only formed by whitespaces', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.errWSName)
	    .expect(400)
	    .end(function(err, res) {
		if(err) done(err);
		else {console.log(res); done();}
	    });

    });

    it('prevents creation of entries without the required "surname" field', function(done) {

	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.errNoSurname)
	    .expect(400)
	    .end(function(err, res) {
		if(err) done(err);
		else done();
	    });
    });

    it('prevents creation of entries where surname is only formed by whitespaces', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.errWSName)
	    .expect(400)
	    .end(function(err, res) {
		if(err) done(err);
		else done();
	    });

    });
    
    it('prevents creation of entries without the required "phoneNumber" field', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.errNoPhone)
	    .expect(400)
	    .end(function(err, res) {
		if(err) done(err);
		else done();
	    });
    });

    it('prevents creation of entries where phonenumber is only formed by whitespaces', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.errWSPhone)
	    .expect(400)
	    .end(function(err, res) {
		if(err) done(err);
		else done();
	    });

    });


	

    

    

    

    
});


