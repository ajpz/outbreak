var app = require('express').Router();
var mongoose = require('mongoose')
var Lobby =  mongoose.model('Lobby')


app.post('/', function(req, res){
	let user = req.body.user;
	let typeOfGame = req.body.type;
	console.log(Lobby)

})

module.exports = app;