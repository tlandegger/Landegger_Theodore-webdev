var mongoose = require("mongoose");
var usersSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    tag: String,
    email: String,
    dateCreated: {type: Date, default: Date.now},
    following: [{type: mongoose.Schema.ObjectId, ref: "usersModel"}],
    tournaments: [{type: mongoose.Schema.ObjectId, ref: "tournamentModel"}],
    role: {type: String, enum:["ADMIN", "User"]},
}, {collection: "users"});
module.exports = usersSchema;