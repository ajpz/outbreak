var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firebaseUrl: {type: String}
});

mongoose.model('Game', schema);
