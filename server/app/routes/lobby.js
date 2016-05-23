'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Lobby = mongoose.model('Lobby');
const User = mongoose.model('User');

router.post('/', function(req, res, next){
	const user = req.body.user;
	let typeOfGame = req.body.type;
	const title = req.body.title;

	if(typeOfGame === 'public') {
		typeOfGame = true;
	} else {
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
	})
	.then( lobby => {
    	lobbyId = lobby._id;
		return User.findByIdAndUpdate(user._id, {$push: {'lobbies': lobbyId}}, {new: true}).populate('lobbies');
  	})
  	.then( updatedUser => {
		return Lobby.findOne({_id:lobbyId}).populate('users');
	})
	.then( populatedLobby => {
		res.status(201).send(populatedLobby);
	})
	.catch(next);
});

router.get('/', function(req, res, next){
	Lobby.getPublicLobbies()
	.then( lobbies => {
		res.json(lobbies);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Lobby.findById(req.params.id).populate('users')
	.then( lobby => {
		res.json(lobby);
	})
	.catch(next);
});

router.put('/:id', function(req,res,next){
	Lobby.addUserToLobby(req.body)
	.then( updatedLobby => {
		res.json(updatedLobby);
	})
	.catch(next);
});

module.exports = router;
