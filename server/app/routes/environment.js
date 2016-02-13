var app = require('express').Router();

app.get('/', function(req,res,next){
	if(process.env.NODE_ENV){
		res.status(201).send(true)
	}else{
		res.status(201).send(false)
	}
	
})

module.exports = app;
