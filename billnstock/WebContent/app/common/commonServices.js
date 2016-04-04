var app = angular.module("stockApp");

app.factory('MathService', function() {
	var factory = {};
	factory.multiply = function(a, b) {
		return a * b
	}
	return factory;
});

app.service('CalcService', function(MathService) {

	this.square = function(a) {
		return MathService.multiply(a, a);
	}
});