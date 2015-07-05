var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var isValidUrl = function (url) {
	return url && url.indexOf('https://content.viaplay.se/web-se') === 0;
};

var getBlock = function (body) {
	if(body.type === "page") {
		return body._embedded['viaplay:blocks'][0];
	}

	return body;
};

var getProduct = function (responseAndBody) {
	return getBlock(JSON.parse(responseAndBody[1]))._embedded['viaplay:product'];
};

var extractImdbId = function (responseAndBody) {
	return getProduct(responseAndBody).content.imdb.id;
};

var getImdbId = function (url) {
	return request(url).then(extractImdbId);
};

module.exports = {
	getImdbId: getImdbId,
	isValidUrl: isValidUrl
};