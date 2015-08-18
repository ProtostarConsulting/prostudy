angular.module(
		"customerApp",
		[ 'ngRoute', 'ngMaterial', 'ngMessages', "xeditable", "ui.bootstrap"/*, "datatables"*/]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : '/home.html',
				controller : 'homeCtr'
			}).when('/customer', {
				templateUrl : '/app/cust/customer.html',
				controller : 'customerCtr'
			}).when('/customer.list', {
				templateUrl : '/app/cust/customer.list.html',
				controller : 'customerListCtr'
			}).when('/stock', {
				templateUrl : '/app/stock/stock.html',
				controller : 'homeCtr'
			}).when('/tax', {
				templateUrl : '/app/tax/tax.html',
				controller : 'homeCtr'
			}).when('/homet1', {
				templateUrl : '/app/cust/customer.html',
				controller : 'homeCtr'
			}).when('/homet2', {
				templateUrl : '/app/cust/customer.html',
				controller : 'homeCtr'
			}).when('/homet3', {
				templateUrl : '/app/cust/customer.html',
				controller : 'homeCtr'
			}).when('/homet4', {
				templateUrl : '/app/cust/customer.html',
				controller : 'homeCtr'
			}).otherwise({
				redirectTo : '/home'
			});
		} ]);