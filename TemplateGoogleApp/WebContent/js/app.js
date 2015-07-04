//Define an angular module for our app
var sampleApp = angular.module('sampleApp', [ 'ngRoute' ]);

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController

sampleApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/AddNewOrder', {
		templateUrl : 'views/add_order.html',
		controller : 'AddOrderController'
	}).when('/ShowOrders/:orderId', {
		templateUrl : 'views/show_orders.html',
		controller : 'ShowOrdersController'
	}).otherwise({
		redirectTo : '/AddNewOrder'
	});
} ]);

sampleApp.controller('AddOrderController', function($scope) {

	$scope.message = 'This is Add new order screen';

});

sampleApp.controller('ShowOrdersController', [ '$scope', '$routeParams',
		function($scope, $routeParams) {
			$scope.message = 'This is view order screen';
			$scope.orderId = $routeParams.orderId;
		} ]);