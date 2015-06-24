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

					// Initialize
					$scope.serMsg = {};
					$scope.items = {};
					$scope.clickDiv = {};
					$scope.patient = {};

					$scope.getAllPatients = function() {
						// alert("getAllPatients");
						gapi.client.patientservice.getAllPatients().execute(
								function(resp) {
									// alert(resp.items[0].fname);
									// console.log(resp.items);
									// $scope.serMsg = resp.items;
									// $scope.items = resp.items;
									// console.log($scope.items);
									
									var table = $('#patientDataTable').DataTable();
									alert(resp.items.length);
									
									$scope.personList=resp.items;
									$('#patientDataTable').dataTable().fnClearTable();
									for(var i=0;i<resp.items.length;i++)
										{
										
										 var Id = resp.items[i].id;
							    		  var firstName = "'"+resp.items[i].firstName+"'";
							    		  var lastName = "'"+resp.items[i].lastName+"'";
							    		  var city = "'"+resp.items[i].city+"'";
							    		  var seq = +i + +1;
										
									table.row.add( ['<a href="#" onclick="seletctUser('+Id+','+firstName+','+lastName+','+city+')">'+resp.items[i].firstName+'</a>',
									                resp.items[i].lastName,resp.items[i].city] ).draw();
										}
									$scope.$apply();
								});
					}
					
					$scope.clickDiv.addPatient = function() {
						 alert("Go to New Patient Form");
						 document.location = '/newPatient.html';
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

						gapi.client.load('patientservice', 'v0.1', function() {
							$scope.is_backend_ready = true;
							$scope.getAllPatients();
						}, apiRoot);

					};

				} ]);
