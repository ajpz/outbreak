var app = require('express').Router();
var mongoose = require('mongoose')
var Lobby =  mongoose.model('Lobby');
var User =  mongoose.model('User')


app.post('/', function(req, res, next){
	let user = req.body.user;
	let typeOfGame = req.body.type;
	let title = req.body.title
	if(typeOfGame === 'public'){
		typeOfGame = true;
	}else{
		typeOfGame = false;
	}
  let lobbyId;
	Lobby.create({
		users: [user._id],
		public: typeOfGame,
		title: title,
		status: 'inProgress',
    playerCount: req.body.playerCount,
    difficulty: req.body.difficulty
	}).then(function(lobby){
    lobbyId = lobby._id
		return User.findByIdAndUpdate(user._id, {$push: {'lobbies': lobbyId}}, {new: true}).populate('lobbies')
  }).then(function(updatedUser){
		return Lobby.findOne({_id:lobbyId}).populate('users')
	}).then(function(populatedLobby){
		res.status(201).send(populatedLobby)
	}).then(null,next)


});

app.get('/', function(req, res, next){
	Lobby.getPublicLobbies()
	.then(function(lobbies){
		res.status(200).send(lobbies)
	}).then(null,next)
})

app.get('/:id', function(req, res, next){
	Lobby.findById(req.params.id).populate('users')
	.then(function(lobby){
		res.status(200).send(lobby)
	})
})

app.put('/:id', function(req,res,next){
	Lobby.addUserToLobby(req.body)
	.then(function(updatedLobby){
		console.log(updatedLobby)
		res.status(200).send(updatedLobby)
	}).then(null,next)
})

module.exports = app;
