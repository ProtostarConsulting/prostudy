angular.module("stockApp").factory('appEndpointSF', appEndpointSFFn);

function appEndpointSFFn($log) {

	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services

	endpointFactory.getExamService = function() {
		return gapi.client.examService;
	};

	endpointFactory.getQuestionService = function() {
		return gapi.client.questionService;
	};

	endpointFactory.loadAppGoogleServices = function(deferred) {
		console.log("###Inside appEndpointSF.loadAppGoogleServices###");

		if (endpointFactory.is_service_ready) {
			console.log("Already Initialized returning back...");
			deferred.resolve();
			return;
		}

		var apiRoot = '//' + window.location.host + '/_ah/api';

		var apisToLoad;

		apisToLoad = 2; // must match number of calls to
		// gapi.client.load()

		gapi.client.load('examService', 'v0.1', function() {
			console.log("exameService Loaded....");
			// $scope.addTaxToDB();
		}, apiRoot);

		gapi.client.load('questionService', 'v0.1', function() {
			console.log("questionService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('stockcustomerservice', 'v0.1', function() {
			console.log("stockcustomerservice Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('addItemInBillServices', 'v0.1', function() {
			console.log("addItemInBillServices Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('saveBillServices', 'v0.1', function() {
			console.log("saveBillServices Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('stockServices', 'v0.1', function() {
			console.log("stockServices Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('taxServices', 'v0.1', function() {
			console.log("taxServices Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('addItemInBillServices', 'v0.1', function() {
			console.log("addItemInBillServices Loaded....");
			endpointFactory.is_service_ready = true;
			$scope.loadAllBillItems();
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('saveBillServices', 'v0.1', function() {
			console.log("saveBillServices Loaded....");
			endpointFactory.is_service_ready = true;
			$scope.loadAllBills();
			deferred.resolve();

		}, apiRoot);

	};	
	return endpointFactory;
}
