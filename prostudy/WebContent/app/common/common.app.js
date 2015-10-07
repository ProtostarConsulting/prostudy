var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "xeditable", "ui.bootstrap", "ui.router",
		'md.data.table', 'ngResource', 'textAngular' ]);
app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('light-green')
			.accentPalette('orange');
});
app.config(function($logProvider) {
	//$logProvider.debugEnabled(false);	
	$logProvider.debugEnabled(true);//this is default	
});
app.config(function($stateProvider, $urlRouterProvider) {
	// This adds config 2
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");

	// Now set up the states
	$stateProvider.state('state1', {
		url : "/state1",
		templateUrl : "/app/demo/state1.html",
		controller : 'statesPageCtr'
	}).state('state1.list', {
		url : "/list",
		templateUrl : "/app/demo/state1.list.html",
		controller : 'statesPageCtr'
	}).state('state2', {
		url : "/state2",
		templateUrl : "/app/demo/state2.html",
		controller : 'statesPageCtr'
	}).state('state2.list', {
		url : "/list",
		templateUrl : "/app/demo/state2.list.html",
		controller : 'statesPageCtr'
	}).state('home', {
		url : "/home",
		templateUrl : '/home.html',
		controller : 'homeCtr'
	}).state('exam', {
		url : "/exam",
		templateUrl : '/app/exam/exam_module.html',
		controller : 'examModuleCtr'
	}).state('exam.view', {
		url : "/exam/view",
		templateUrl : '/app/exam/exam_view.html',
		controller : 'examCtr'
	}).state('exam.question', {
		url : "/exam/question",
		templateUrl : '/app/question/question_add.html',
		controller : 'questionCtr'
	}).state('exam.questionlist', {
		url : "/exam/question/list",
		templateUrl : '/app/question/question_list.html',
		controller : 'questionListCtr'
	}).state('student', {
		url : "/student",
		templateUrl : '/app/student/student_module.html',
		controller : 'studentModuleCtr'
	}).state('student.add', {
		url : "/add",
		templateUrl : '/app/student/student_add.html',
		controller : 'studentPageCtr'
	}).state('student.list', {
		url : "/list",
		templateUrl : '/app/student/student_list.html',
		controller : 'studentListPageCtr'
	}).state('student.listtest', {
		url : "/listtest",
		templateUrl : '/app/demo/table_demo3_view.html',
		controller : 'nutritionController'
	});
});