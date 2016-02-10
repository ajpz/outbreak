var app = require('express').Router();
var mongoose = require('mongoose')
var Lobby =  mongoose.model('Lobby');
var Game =  mongoose.model('Game')


app.post('/', function(req, res, next){
	let user = req.body.user;
	let typeOfGame = req.body.type;
	let title = req.body.title
	Game.create({
		firebaseUrl: 'victor_is_a_butt'
	}).then(function(game){
		return Lobby.create({
			users: [user._id],
			type: typeOfGame,
			game: game._id,
			title: title
		})
	}).then(function(lobby){
		return Lobby.findOne({_id:lobby._id}).populate('users game')
	}).then(function(populatedLobby){
		console.log(populatedLobby)
		res.status(201).send(populatedLobby)
	}).then(null,next)
	

});

app.get('/', function(req, res, next){
	Lobby.find().populate('users game')
	.then(function(lobbies){
		res.status(200).send(lobbies)
	}).then(null,next)
})

module.exports = app;