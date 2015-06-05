angular.module("myapp", []).controller("MyController", function($scope) {
	// $scope.serMsg = "";
	// Initialize
	// $("#actionMsgDiv").addClass('hidden');

	// Initialize ends
	$scope.clickDiv = {};

	$scope.clickDiv.doClick = function() {
		gapi.client.myhelloservice.say2Hi({
			'myName2' : $scope.name
		}).execute(function(resp) {
			alert(resp.data);
			// $scope.serMsg = resp.data;
			// alert(resp.data);
			$scope.serMsg = resp.data;
		});
	};

	$scope.clickDiv.savePatient = function() {
		gapi.client.patientservice.savePatient({
			"firstName" : $scope.fname,
			"lastName" : $scope.lname,
			"city" : $scope.city
		}).execute(function(resp) {
			// alert(resp.data);
			// $scope.serMsg = resp.data;
			$("#formDiv").addClass('hidden');
			$("#actionMsgDiv").removeClass('hidden');
			console.log("Patient saved successfully!");
		});
	}

	$scope.clickDiv.addPatient = function() {
		$scope.fname = "";
		$scope.lname = "";
		$scope.city = "";
		$("#formDiv").removeClass('hidden');
		$("#actionMsgDiv").addClass('hidden');
	}

	$scope.clickDiv.cancelBtn = function() {
		/*
		 * $scope.fname = ""; $scope.lname = ""; $scope.city = "";
		 */
		document.location = '/index.html';
	}

});

function init() {
	// Can I load all services once and then use accross pages?

	var apiRoot = '//' + window.location.host + '/_ah/api';

	// Loads the OAuth and helloworld APIs asynchronously, and triggers login
	// when they have completed.
	var apisToLoad;

	var callback = function() {
		// This function is called, when custom API is loaded into JS

		// alert("Inside callback111 : apiRoot: " + apiRoot);
		// myhelloservice.say2Hi("Ravi").execute();
		/*
		 * gapi.client.myhelloservice.say2Hi({ 'myName2' : "Ravi"
		 * }).execute(function(resp) { alert(resp.data); });
		 */
		console.log("Custom Service Loaded successfully!");
	};

	apisToLoad = 2; // must match number of calls to gapi.client.load()
	gapi.client.load('myhelloservice', 'v0.1', callback, apiRoot);
	gapi.client.load('patientservice', 'v0.1', callback, apiRoot);
}
