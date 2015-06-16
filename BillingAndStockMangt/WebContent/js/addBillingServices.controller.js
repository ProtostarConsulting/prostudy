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

							            $scope.alldata = {};
										$scope.clickDiv = {};
										$scope.saveVechile = {};
										$scope.saveVechile.id = "";
										$scope.saveVechile.vechile_No = "";
										$scope.saveVechile.owner_Name = "";
										$scope.saveVechile.date_Time_Recevied = "";
										$scope.saveVechile.notes = "";

										$scope.clickDiv.addVechile = function() {
											
											gapi.client.vechileServices.addVechile($scope.saveVechile).execute(function(resp) {
												alert(resp.token);
												console.log(resp);
												if(resp.token=="R")
													{
													$("#updateForm").hide();
													$("#actionMsgDiv").show();
													}
												else
												{
													$("#updateForm").hide();
													$("#actionMsgDiv1").show();
												}
												
												
											});
										};
										
										
										$scope.addNewUser = function() {
											$scope.saveVechile.id = "";
											$scope.saveVechile.vechile_No = "";
											$scope.saveVechile.owner_Name = "";
											$scope.saveVechile.date_Time_Recevied = "";
											$scope.saveVechile.notes = "";
											$("#updateForm").show();
											$("#listofuser").hide();
											$("#actionMsgDiv").hide();
										
										}
										
										
										
										
										
										$scope.seletctUser = function(i) {
											alert(i.owner_Name);
											$("#updateForm").show();
											$("#listofuser").hide();
											$scope.saveVechile = i;
											}
										
										
										$scope.getAllVechile = function() {
										 gapi.client.vechileServices.getAllVechile().execute(function(resp) 
													{
														alert(resp);
														console.log(resp);
														$scope.alldata = resp.items;
														$("#listofuser").show();
														$("#updateForm").hide();
														$("#actionMsgDiv").hide();
														$("#actionMsgDiv1").hide();
														$scope.$apply();
													});
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

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()
								gapi.client.load('vechileServices', 'v0.1',
										function() {
											$scope.is_backend_ready = true;
											$scope.getAllVechile();
										}, apiRoot);
								
							};

						} ]);
