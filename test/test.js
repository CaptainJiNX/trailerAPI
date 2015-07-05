var request = require('supertest');
var should = require('should');

var viaplay = require("./../viaplay");
var app = require("./../app.js");

// Unit tests
describe('isValidUrl', function () {
	it('should return false when the url is not a viaplay api url', function () {
		viaplay.isValidUrl('https://blahonga.org').should.be.false();
	});

	it('should return true when the url is a viaplay api url', function () {
		viaplay.isValidUrl('https://content.viaplay.se/web-se').should.be.true();
	});
});

// Integration tests
describe('When requesting a movie page', function () {
	this.timeout(10000);

	it('should return correct trailer url', function (done) {
		request(app).
			get('/trailer?url=https%3A%2F%2Fcontent.viaplay.se%2Fweb-se%2Ffilm%2Fevil-alien-conquers-2003').
			expect({ trailerUrl: 'https://v.traileraddict.com/25836' }, done);
	});
});

describe('When requesting a movie product', function () {
	this.timeout(10000);

	it('should return correct trailer url', function (done) {
		request(app).
			get('/trailer?url=https%3A%2F%2Fcontent.viaplay.se%2Fweb-se%2Ffilm%2Fthe-internship-2013%3Fpartial%3Dtrue%26block%3D1').
			expect({ trailerUrl: 'https://v.traileraddict.com/92106' }, done);
	});
});
