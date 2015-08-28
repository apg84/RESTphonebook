#REST Phonebook

##Synopsis

Simple phonebook web service that allows to store, retrieve, modify and delete entries which are formed by name, surname, phonenumber and address (being the latter the only optional field)

##API Reference

###API Methods

* Listing the contents of the phonebook: GET to `http://localhost:3001/phonebook`
* Finding an entry by surname: GET to `http://localhost:3001/phonebook/:surname`

If successful (status 200) the GETs will return an array of entries in the response body (json objects as described below). 404 otherwise.

* Creating an entry: POST to `http://localhost:3001/phonebook` the request body must be a well formed json object, as described below. 404 otherwise.

If successful (status 201) The POST will return the _id field of the new entry created in the response body. 404 otherwise.

* Updating an entry: PUT to `http://localhost:3001/phonebook/:id` the request body must be a well formed json object, as described below. 

If successful (status 200) The PUT will return the _id field of the entry which was modified in the response body. 404 if the id could not be found, 400 if the modified entry cannot be validated.

* Deleting an entry: DELETE to `http://localhost:3001/phonebook/:id`

If successful (status 200) DELETE will return the _id field of the entry which was deleted 


In these requests *:surname* represents the surname is being looked for and *:id* corresponds to the *_id* field which is automatically assigned to the entries when created. 

###Entry format

An entry comprises the fields name, surname and phonenumber (which are required) and address (which is optional).

e.g.- ` {"name":"validname","surname":"validsurname","phonenumber":"88888","address":"Scoon Avenue"}`


##Installation

###Prerequisites

Install all the prerequisites:

* node v0.12.x
* mocha v2.2.5
* mongodb v3.0.x

Mongo has to be started prior to running the server. After installing it, simply execute **`>mongod --dbpath pathToDataDir`** 

###Installing the REST phonebook

1. From the command line: **`>git clone https://github.com/apg84/RESTphonebook`**
2. Inside the directory where it was cloned, where the package.json resides: **`>npm install`**

At this point, if the prerequisites are met, and after having installed the dependencies we can test and run the application

##Testing and running the application

###The properties.js file

In the package there is a properties.js file which contains two variables:
* `test`: Will determine whether the app is run in test mode (set to true) or production (set to false)
* `dbURI`: Will contain the db URI (ie. `mongodb://localhost/phonebooktest`)

### To test the application

1. Check the test parameter is set to true in the properties.js file
2. In the command line **`>npm test`**

### To run the application
1. Check the test parameter is set to false AND the dbURI variable contains the correct path to the production database
2. In the command line **`>npm start`**  
3. The server is up and running at `http://localhost:3001/phonebook`, now it is possible to start making requests