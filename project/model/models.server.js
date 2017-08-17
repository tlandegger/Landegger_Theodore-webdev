var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer2_2017'; // for local
 if(process.env.MLAB_USER) { // check if running remotely
     var username = process.env.MLAB_USER; // get from environment
     var password = process.env.MLAB_PASS;
     connectionString = 'mongodb://' + username + ':' + password;
     connectionString += '@ds023448.mlab.com:23448/heroku_st9v6pfq'; // user yours
 }
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;
