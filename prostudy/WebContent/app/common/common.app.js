angular.module(
		"prostudyApp",
		[ 'ngRoute', 'ngMaterial', 'ngMessages', "xeditable", "ui.bootstrap",
				"ui.router"/* , "datatables" */]).config(
		[ '$routeProvider', function($routeProvider) {

			// Do your config1 here.

		} ]).config(function($stateProvider, $urlRouterProvider) {
	// This adds config 2
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/state1");

	// Now set up the states
	$stateProvider.state('state1', {
		url : "/state1",
		templateUrl : "/app/demo/state1.html"
	}).state('state1.list', {
		url : "/list",
		templateUrl : "/app/demo/state1.list.html",
		controller : function($scope) {
			$scope.items = [ "A", "List", "Of", "Items" ];
		}
	}).state('state2', {
		url : "/state2",
		templateUrl : "/app/demo/state2.html"
	}).state('state2.list', {
		url : "/list",
		templateUrl : "/app/demo/state2.list.html",
		controller : function($scope) {
			$scope.things = [ "A", "Set", "Of", "Things" ];
		}
	}).state('home', {
		templateUrl : '/home.html',
		controller : 'homeCtr'
	}).state('student', {
		url : "/student",
		templateUrl : '/app/student/student.html',
		controller : 'studentPageCtr'
	}).state('student.list', {
		url : "/list",
		templateUrl : '/app/student/student.list.html',
		controller : 'studentListPageCtr'
	});
});