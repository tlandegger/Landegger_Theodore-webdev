var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "websiteModel"}],
    dateCreated: Date
}, {collection: "user"});
module.exports = userSchema;