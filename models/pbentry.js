var mongoose = require('mongoose');
Schema = mongoose.Schema;


//This defines each entry in the phonebook and the data
//which is required and optional for it. 
var entrySchema = new Schema({
    'name': 
    {type: String,
     required: true,
     trim: true},
    'surname':
    {type: String,
     required: true,
     trim:true},
    'phonenumber': 
    {type: String,
     required: true,
     trim:true},
    'address': String
});

mongoose.model('Entry', entrySchema);
