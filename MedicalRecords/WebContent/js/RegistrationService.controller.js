function init() {
	// alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

angular.module("amclinapp", []).controller(
		"MyController",
		[
				'$scope',
				'$window',
				function($scope, $window) {
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.serMsg = {};
					$scope.person = {};

					$scope.person.id = "";
					$scope.person.firstName = "";
					$scope.person.lastName = "";
					$scope.person.emailID = "";
					$scope.person.mobileNumber = "";

//For Save Record 
					$scope.clickDiv.saveRegiUser = function() {
						gapi.client.registrationservice.saveRegiUser(
								$scope.person).execute(function(resp) {
							alert(resp.token);

							if (resp.token == "U") {
								$("#formDiv").addClass('hidden');
							//	$("#update").addClass('hidden');
								$("#actionMsgDivU").removeClass('hidden');
								$("#main").removeClass('hidden');
							} 
							else if (resp.token == "R") {
								// $scope.serMsg = resp.data;
								$("#formDiv").addClass('hidden');
							//	 $("#register").addClass('hidden');
								$("#actionMsgDivR").removeClass('hidden');
								$("#main").removeClass('hidden');
							}
						});
					}
//For Fetch All Records From Database
					$scope.fetchRegisterUser = function() {
						gapi.client.registrationservice.getAllRegisteredUsers()
								.execute(function(resp) {
									// alert(resp.items[0].medicineName);
									// console.log(resp.items);
									// $scope.serMsg = resp.items;
									$scope.items = resp.items;
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

//To Disply Record in TextBox
					
					$scope.seletctUser = function(i) {
						// alert("Hi" + i.firstName);
						$scope.person = i;
					}

					//OR
					
/*					$scope.removePerson = function(index) {
						  $scope.person.splice(index, 1);
						};
*/						
					$scope.clickDiv.addPatient = function() {
						$scope.person.id = "";
						$scope.person.firstName = "";
						$scope.person.lastName = "";
						$scope.person.emailID = "";
						$scope.person.mobileNumber = "";

						$("#formDiv").removeClass('hidden');
						$("#actionMsgDivR").addClass('hidden');
						$("#actionMsgDivU").addClass('hidden');
						$("#main").addClass('hidden');
						$scope.fetchRegisterUser();
					}

					$scope.clickDiv.cancelBtn = function() {
						document.location = '/index.html';
					}
				
						
	// New code in ctler

					$window.initGAPI = function() {
						// $scope.$apply($scope.initgapi);
						$scope.$apply($scope.loadCustomServices);
						// alert("Inside window.initGAPI");
					};

					$scope.loadCustomServices = function() {
						// alert("Inside loadCustomServices");

						var apiRoot = '//' + window.location.host + '/_ah/api';

						// Loads the OAuth and helloworld APIs
						// asynchronously, and
						// triggers login
						// when they have completed.
						var apisToLoad;

						apisToLoad = 1; // must match number of calls to

						gapi.client.load('registrationservice', 'v0.1',
								function() {
									$scope.is_backend_ready = true;
									$scope.fetchRegisterUser();
								}, apiRoot);
					};
				} ]);
