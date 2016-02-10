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
  type: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  }
});


mongoose.model('Lobby', schema);
