var express = require('express');
var app = express();

var viaplay = require('./viaplay');
var traileraddict = require('./traileraddict');

var cache = {};

var root = function(req, res) {
	res.send({status:'ok'});
};

var trailer = function(req, res) {

	var addToCache = function (trailerUrl) {
		cache[req.query.url] = trailerUrl;
		return trailerUrl;
	};

	var respondWithUrl = function (trailerUrl) {
		res.send({ trailerUrl: trailerUrl });
	};

	var handleError = function (err) {
		console.log(err);
		res.sendStatus(500);
	};

	if(!viaplay.isValidUrl(req.query.url)) {
		res.sendStatus(400);
	}

	if(cache[req.query.url]) {
		respondWithUrl(cache[req.query.url]);
		return;
	}

	viaplay.getImdbId(req.query.url).
		then(traileraddict.getTrailerUrl).
		then(addToCache).
		then(respondWithUrl).
		catch(handleError);

};

app.get('/', root);
app.get('/trailer', trailer);

module.exports = app;
