var fullEntry = {
    name: "Samuel",
    surname: "Vimes",
    phonenumber: "88888888",
    address: "The Shadows"
},
partialEntry = {
    name: "Didio",
    surname: "Falco",
    phonenumber: "00000000"
},
errNoPhone = {
    name: "Sybil",
    surname: "Ramkin",
    address: "Scoon Avenue"
},
errWSPhone = {
    name: "Sybil",
    surname: "Ramkin",
    phonenumber: "   ",
    address: "Scoon Avenue"
},

errNoSurname = {
    name: "Cut-Me-Own-Throat",
    phonenumber: "56785678",
},
errWSSurname = {
    name: "Cut-Me-Own-Throat",
    surname : "    ",
    phonenumber: "56785678",
},
errNoName = {
    surname: "Barnabas",
    phonenumber: "10101010" 
},
errWSName = {
    name: "     ",
    surname: "Barnabas",
    phonenumber: "10101010" 
};

exports.fullEntry = fullEntry;
exports.partialEntry = partialEntry;
exports.errNoPhone = errNoPhone;
exports.errWSPhone = errWSPhone;
exports.errNoSurname = errNoSurname;
exports.errWSSurname = errWSSurname;
exports.errNoName = errNoName;
exports.errWSName = errWSName;
