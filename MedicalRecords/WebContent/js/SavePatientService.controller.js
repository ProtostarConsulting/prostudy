function init() {
//	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("amclinapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {

					// Initialize
					$scope.serMsg = {};
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.patient = {};

					$scope.patient.firstName = "";
					$scope.patient.lastName = "";
					$scope.patient.age = "";
					$scope.patient.sex = "";
					$scope.patient.occupation = "";
					$scope.patient.addr1 = "";
					$scope.patient.addr2 = "";
					$scope.patient.city = "";
					$scope.patient.pin = "";
					$scope.patient.firstvisit = "";
					$scope.patient.clinicalnote = "";
					$scope.patient.followup = "";
					$scope.patient.observations = "";
					$scope.patient.provdig = "";
					$scope.patient.investigationreport = "";
					$scope.patient.dignoafterinvestigation = "";
					$scope.patient.advice = "";

					$scope.clickDiv.savePatient = function() {
//						alert("In Save Patient");
						gapi.client.patientservice.savePatient($scope.patient
						).execute(function(resp) {
							alert(resp.token);
//							$scope.serMsg = resp.data;
						
							if (resp.token == "U") {								
								$("#formDiv").addClass('hidden');
								$("#actionMsgDivU").removeClass('hidden');
								$("#main").removeClass('hidden');
							} 
							else {
								$("#formDiv").addClass('hidden');
								$("#actionMsgDivR").removeClass('hidden');
								$("#main").removeClass('hidden');
							}
							/*$("#formDiv").addClass('hidden');
							$("#actionMsgDiv").removeClass('hidden');*/
						});
					}	

					
					$scope.clickDiv.addPatient = function() {
						$scope.patient.firstName = "";
						$scope.patient.lastName = "";
						$scope.patient.age = "";
						$scope.patient.sex = "";
						$scope.patient.occupation = "";
						$scope.patient.addr1 = "";
						$scope.patient.addr2 = "";
						$scope.patient.city = "";
						$scope.patient.pin = "";
						$scope.patient.firstvisit = "";
						$scope.patient.clinicalnote = "";
						$scope.patient.followup = "";
						$scope.patient.observations = "";
						$scope.patient.provdig = "";
						$scope.patient.investigationreport = "";
						$scope.patient.dignoafterinvestigation = "";
						$scope.patient.advice = "";
						
						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');

/*						$("#formDiv").removeClass('hidden');
						$("#actionMsgDiv").addClass('hidden');*/
					}

					$scope.clickDiv.clearall = function() {
						$scope.patient.firstName = "";
						$scope.patient.lastName = "";
						$scope.patient.age = "";
						$scope.patient.sex = "";
						$scope.patient.occupation = "";
						$scope.patient.addr1 = "";
						$scope.patient.addr2 = "";
						$scope.patient.city = "";
						$scope.patient.pin = "";
						$scope.patient.firstvisit = "";
						$scope.patient.clinicalnote = "";
						$scope.patient.followup = "";
						$scope.patient.observations = "";
						$scope.patient.provdig = "";
						$scope.patient.investigationreport = "";
						$scope.patient.dignoafterinvestigation = "";
						$scope.patient.advice = "";
					}
										
					$scope.seletctUser = function(i) {
//						alert("Hi" + i.firstName);
						$scope.patient = i;
					}

					
					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}
					
					$scope.getPatientByID = function(i){
						alert("Hi"+i.firstName)
						$scope.patient = i;
					}
					// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
//						alert("Inside window.initGAPI");

					};

					$scope.loadCustomServices = function() {
//						alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';

						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('patientservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getPatientByID(); 
						}, apiRoot);

					};

				} ]);
