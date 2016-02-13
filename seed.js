/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var User2 = mongoose.model('User');
var Lobby = mongoose.model('Lobby');

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            username: 'TESTING'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            username: 'ELPRESIDENTE'
        },
        {
            email: 'victor@gmail.com',
            password: 'victor',
            username: 'VICTORISPOOPY'
        },
        {
            email: 'daniel@gmail.com',
            password: 'daniel',
            username: 'DANIELISAWESOME'
        }
    ];

    return User.createAsync(users);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function() {
      return User.find({}).exec();
    }).then(function(fourUsers){
      fourUsers = fourUsers.map(function(user){
        return user._id;
      })
      return Lobby.create({
        users: fourUsers,
        public: true,
        title: 'Test game from seed.js',
        status: 'inProgress',
        playerCount : 4,
        difficulty :  "Heroic"
      })
    }).then(function(lobby) {
      return User2.findById(lobby.users[0]).exec()
      .then(function(user){
        return [lobby._id, user]
      })
    }).then(function (lobbyAndUserIds) {
        console.log(chalk.green('Seed successful!'));
        console.log(chalk.green('Seed LobbyId: ', lobbyAndUserIds[0]));
        console.log(chalk.green('Sedd user is ', lobbyAndUserIds[1]));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
