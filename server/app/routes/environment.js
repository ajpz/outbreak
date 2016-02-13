var app = require('express').Router();

app.get('/', function(req,res,next){
	console.log('received', process.env)
	res.status(201).send(process.env)
})

module.exports = app;
