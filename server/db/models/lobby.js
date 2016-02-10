'use strict'

var mongoose = require('mongoose');
var User = require('./user');
var Game = require('./game');
var Schema = mongoose.Schema;


var schema = new mongoose.Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  },
  public: {
    type: Boolean,
    default: true
  },
  title: {
    type: String
  }
});

schema.statics.getPublicLobbies = function(){
  let self = this;
  return self.find().find().populate('users game')
  .then(function(lobbies){
    return lobbies.filter(function(lobby){
      return lobby.users.length<4 && lobby.public === true
    })
  })
}

schema.statics.addUserToLobby = function(data){
  let self = this;
  return self.findById(data.lobby).populate('users game')
  .then(function(lobby){
    lobby.users.push(data.user);
    return lobby.save()
  }).then(function(updatedLobby){
    return self.findById(updatedLobby._id).populate('users game')
  })
}
mongoose.model('Lobby', schema);
