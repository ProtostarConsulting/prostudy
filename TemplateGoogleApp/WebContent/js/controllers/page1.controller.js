function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular
		.module("myapp", [])
		.controller(
				"MyController",
				[
						'$scope',
						'$window',
						function($scope, $window) {
							$scope.fname = "Default Name"
							$scope.serMsg = "";

							alert("Inside Controller");
							var ps = 

							$scope.doClickCallSayHi = function() {
								gapi.client.myhelloservice.say2Hi({
									'myName2' : $scope.fname
								}).execute(function(resp) {
									alert(resp.data);
									$scope.serMsg = resp.data;
									$scope.$apply();
								});
							};

							$scope.savePatient = function() {
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

							$scope.addPatient = function() {
								$scope.fname = "";
								$scope.lname = "";
								$scope.city = "";
								$("#formDiv").removeClass('hidden');
								$("#actionMsgDiv").addClass('hidden');
							}

							$scope.getPatientList = function() {
								gapi.client.patientservice
										.getAllPatients()
										.execute(
												function(resp) {
													alert(resp.items[0].firstName);
													// $scope.serMsg =
													// resp.data;
													$scope.items = resp.items;

													console
															.log("Got Patient list successfully!");
													$scope.$apply(); // This
																		// is
																		// required
																		// for
																		// data
																		// changed
																		// in
																		// hehind
																		// in
																		// controller
																		// to be
																		// applied
																		// to UI
												});
							}
							$scope.cancelBtn = function() {
								document.location = '/index.html';
							}

							// New code in ctler

							$window.initGAPI = function() {
								// $scope.$apply($scope.initgapi);
								$scope.$apply($scope.loadCustomServices);
								alert("Inside window.initGAPI");

							};

							$scope.loadCustomServices = function() {
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								// Loads the OAuth and helloworld APIs
								// asynchronously, and
								// triggers login
								// when they have completed.
								var apisToLoad;

								apisToLoad = 2; // must match number of calls to
								// gapi.client.load()
								gapi.client.load('myhelloservice', 'v0.1',
										function() {
											$scope.is_backend_ready = true;
											$scope.doClickCallSayHi();
										}, apiRoot);
								gapi.client.load('patientservice', 'v0.1',
										function() {
											$scope.is_backend_ready = true;
											$scope.getPatientList();
										}, apiRoot);

							};

						} ]);
