'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Lobby =  mongoose.model('Lobby');
const User =  mongoose.model('User');

router.get('/:id', function(req,res,next) {
	User.findById(req.params.id).populate('lobbies')
	.then( foundUser => {
		res.status(201).send(foundUser);
	})
	.catch(next);
});

module.exports = router;