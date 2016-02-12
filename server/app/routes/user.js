var app = require('express').Router();
var mongoose = require('mongoose');
var Lobby =  mongoose.model('Lobby');
var User =  mongoose.model('User');

app.get('/:id', function(req,res,next){
	console.log('hit backend')
	User.findById(req.params.id).populate('lobbies')
	.then(function(foundUser){
		res.status(201).send(foundUser)
	})

})

module.exports = app;