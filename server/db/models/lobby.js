'use strict'

const mongoose = require('mongoose');
const User =  mongoose.model('User')
const Schema = mongoose.Schema;


const schema = new mongoose.Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  public: {
    type: Boolean,
    default: true
  },
  title: {
    type: String
  },
  status: {
    type: String,
    enum: ['inProgress', 'gameOver']
  },
  playerCount: {
    type: Number
  },
  difficulty: {
    type: String,
    enum: ['Introductory', 'Standard', 'Heroic']
  }
});

schema.statics.getPublicLobbies = function(){
  let self = this;
  return self.find().populate('users')
  .then(function(lobbies){
    return lobbies.filter(function(lobby){
      return lobby.users.length<4 && lobby.public === true
    })
  })
}

schema.statics.addUserToLobby = function(data){
  let self = this;
  let updatedLobbyId;
  return self.findById(data.lobby).populate('users')
  .then(function(lobby){
    lobby.users.push(data.user);
    return lobby.save()
  }).then(function(updatedLobby){
    updatedLobbyId = updatedLobby._id
    return User.findByIdAndUpdate(data.user, {$push: {'lobbies': updatedLobbyId}}, {new: true}).populate('lobbies')
  }).then(function(){
    return self.findById(updatedLobbyId).populate('users')
  })
}
mongoose.model('Lobby', schema);
