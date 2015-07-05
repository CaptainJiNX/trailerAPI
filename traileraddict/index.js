var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var parseString = Promise.promisify(parser.parseString);

var getRefinedId = function (id) {
	if(id.indexOf('tt') === 0) {
		return id.substr(2);
	}

	return id;
};

var parseXmlBody = function (responseAndBody) {
	return parseString(responseAndBody[1]);
};

var buildTrailerUrl = function (body) {
	return "https://v.traileraddict.com/" + body.trailers.trailer[0].trailer_id[0];
};

var getTrailerUrl = function (imdbId) {
	return request("http://api.traileraddict.com/?imdb=" + getRefinedId(imdbId)).
		then(parseXmlBody).
		then(buildTrailerUrl);
};

module.exports = {
	getTrailerUrl: getTrailerUrl
};