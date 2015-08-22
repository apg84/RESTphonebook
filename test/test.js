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

//Acceptance criteria -> List all entries
//List all entries -> GET request
//The entries will be listed in json format so,
//to start with, we are expecting a 200 response
    
    it('is reachable, speaks json', function(done) {
	request.get('/phonebook')
	    .expect(200)
	    .expect('Content-Type', /json/)
	    .end(function(err, res) {
		if(err) done(err);
		else{
		    var entries = res.body;
		    //Has to be uninitialised, we ensure no mock data has been left behind
		    expect(entries.length).to.equal(0); 
		}
	    });
    });

//Acceptance criteria: Create a new entry in the phonebook
//Create new entry -> POST request
//>>>>>>>>>>>>>>>>>>>>ENTRY CREATION TESTS<<<<<<<<<<<<<<<<<<<<
//Test whether entries can be created
//Test whether partial entries can be created (optional fields not present)
//Test whether malformed entries are accepted (required fields not present/formed by whitespaces)

    it('allows creating new entries in the phonebook', function(done) {
	request
	    .post('/phonebook')
	    .set('Accept', 'applicaton/json')
	    .send(mockEntry.fullEntry)
	    .expect('Content-Type', /json/)
	    .expect(201)
	    .end(function(err, res) {
		if(err) done(err);
		else {
		    var id = res.body;
		    //console.log(res);
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
					expect(entry).to.have.property('name');
					expect(entry.name).to.equal(mockEntry.fullEntry.name);
					
					expect(entry).to.have.property('surname');
					expect(entry.surname).to.equal(mockEntry.fullEntry.surname);	
					expect(entry).to.have.property('phonenumber');
					expect(entry.phonenumber).to.equal(mockEntry.fullEntry.phonenumber);
					expect(entry).to.have.property('address');
					expect(entry.address).to.equal(mockEntry.fullEntry.address);
					entryExists = true;
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

     it('allows creating new entries which do not contain the address optional field', function(done) {
	request
	    .post('/phonebook')
	    .set('Accept', 'applicaton/json')
	    .send(mockEntry.partialEntry)
	    .expect('Content-Type', /json/)
	    .expect(201)
	    .end(function(err, res) {
		if(err) done(err);
		else {
		    var id = res.body;
		    console.log(res.body);
		    request
			.get('/phonebook')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
			    if(err) done(err);
			    else {
				var entries = res.body;
				var entry = findById(entries, id);
				console.log(entry);
				expect(entry).to.have.property('name');
				expect(entry.name).to.equal(mockEntry.partialEntry.name);
				expect(entry).to.have.property('surname');
				expect(entry.surname).to.equal(mockEntry.partialEntry.surname);	
				expect(entry).to.have.property('phonenumber');
				expect(entry.phonenumber).to.equal(mockEntry.partialEntry.phonenumber);
				expect(entry).to.not.have.property('address');
				
				if(entry === false) {
				    done(new Error("Reported as created but the id returned in the response was not found in the db"));
				} else {
				    done();
				}
			    }
			    
			    
			});
		    
		    
		}
	    });
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
		else {done();}
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

//Acceptance criteria: Find an entry by surname
//Find entry -> GET request to /phonebook/surname
//>>>>>>>>>>>>>>>>>>>>FIND TESTS<<<<<<<<<<<<<<<<<<<<
//Test whether a result which has been inserted is available
//Test no data is returned if a random request is made
    
    it('is able to retrieve results which are stored in the db', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.fullEntry)
	    .expect(201)
	    .end(function(err, res) {
		if(err) done(err);
	    });

	request
	    .get('/phonebook/'+ mockEntry.fullEntry.surname)
	    .expect('Content-type', /json/)
	    .expect(200)
	    .end(function(err, res){
		if(err) done(err);
		else {
		    //There will be just one entry, the one we created
		    var entries = res.body;
		    expect(entries.length).to.equals(1);
		    expectRequiredsAsIn.call(entries[0], mockEntry.fullEntry);
		    done();
		    		
		}
		
	    });


    });

    it('returns an empty array if the surname does not exist in the database', function(done) {
	
	request
	    .post('/phonebook')
	    .set('Accept', '/application/json')
	    .send(mockEntry.fullEntry)
	    .expect(201)
	    .end(function(err, res) {
		if(err) done(err);
	    });
	
	request
	    .get('/phonebook/randonSurname')
	    .expect('Content-type', /json/)
	    .expect(200)
	    .end(function(err, res){
		if(err) done(err);
		else {
		    //The response must be empty (we ensure the method is not just doing a find{} and retrieving whatever was inserted)
		    var entries = res.body;
		    expect(entries.length).to.equals(0);
		    done();
		    
		}
		
	    });
    });
     
});




function findById(entries, id) {
    var entryFound = false;
    entries.forEach(function(entry) {
	if(entry._id === id) {
	    entryFound = entry;
	    //console.log(entryFound);
	}
    });
    //console.log(entryFound);
    return entryFound;
}

var expectRequiredsAsIn = function(entry){
    expect(this).to.have.property('name');
    expect(this.name).to.equal(entry.name);
    expect(this).to.have.property('surname');
    expect(this.surname).to.equal(entry.surname);	
    expect(this).to.have.property('phonenumber');
    expect(this.phonenumber).to.equal(entry.phonenumber);
}

