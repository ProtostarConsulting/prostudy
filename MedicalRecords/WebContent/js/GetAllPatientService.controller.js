function init() {
	alert("Inside init");
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

/*					$scope.patient.firstName = "";
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
*/

					$scope.getAllPatients = function() {
						// alert("getAllPatients");
						gapi.client.patientservice.getAllPatients().execute(
								function(resp) {
									alert(resp.items[0].fname);
									console.log(resp.items);
									// $scope.serMsg = resp.items;
									$scope.items = resp.items;
									console.log($scope.items);
									$scope.$apply();// This
									// is
									// required
									// for
									// data
									// changed
									// in
									// behind
									// in
									// controller
									// to be
									// applied
									// to UI

								});
					}
					
					// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
						alert("Inside window.initGAPI");

					};

					$scope.loadCustomServices = function() {
						alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';

						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('patientservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllPatients();
						}, apiRoot);

					};

				} ]);
