angular
		.module("prostudyApp")
		.controller(
				"homeCtr",
				[
						'$scope',
						'$window',
						'$mdToast',
						
					

						function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
								$log, $q,$location, objectFactory, appEndpointSF,
								tableTestDataFactory ) {
							
							/*$scope.loadAuth = function()
							{
								
								console.log("inside Auth service data:" );
								AuthService.logout();
								$log.debug("inside Auth service data.data:" );
							}
							
							$scope.loadAuth();*/
							
							/*$scope.loadUsernameList = function() {
								console.log("inside getusernameList")
								$scope.users = [];
								$scope.selected = [];
								tableTestDataFactory.getusernameList().then(
										function(data) {
											$scope.users = data;
											$log.debug("inside ctr then $scope.getusernameList"
													+ $scope.users);
											console.log("inside getusernameList");

										});

							}// end of loadInstituteList load
							console.log("Inside homeCtr");
							
							$scope.loadUsernameList();

							$scope.loginUser = function() {
								var loggedin = false;
								var totalUsers = $scope.users.length;
								var usernameTyped = $scope.username;
								var userpwdTyped = $scope.pwd;

								for (i = 0; i < $scope.users.length; i++) {
									if ($scope.users[i].username === usernameTyped
											&& $scope.users[i].pwd === userpwdTyped) {
										loggedin = true;
										break;
									}
								}

								if (loggedin === true) {
									// alert("login successful");
									$location.path("/home");
								} else {
									alert("username does not exist")
								}
							}*/
							
							
							/*$scope.redirect = function()
							{
								alert("username does not exist")
								$location.path("/login");
								
							}*/
							
							$scope.showSimpleToast = function() {
								$mdToast.show($mdToast.simple().content(
										'Customer Saved!').position("top")
										.hideDelay(3000));
							};

							$scope.loadCustomerList = function() {
								console.log("loadCustomerList");
								gapi.client.customerservice.getAllCustomers()
										.execute(function(resp) {
											console.log(resp);
										});
							};

							$scope.addCustomer = function() {
								console.log("in side addCustomer");
								gapi.client.customerservice
										.addCustomer($scope.cust)
										.execute(
												function(resp) {
													console
															.log("Add Customer Response: "
																	+ resp.msg);
													$scope.showSimpleToast();
													$scope.cust = $scope
															.newCustomer();

												})
							};// end of call to addCustomer

							$scope.newCustomer = function() {
								return {
									firstName : '',
									lastName : '',
									mobileNo : '',
									email : '',
									address : {
										line1 : '',
										line2 : '',
										city : '',
										state : '',
										pin : '',
									}
								};
							}

							$scope.cust = $scope.newCustomer();

							// initialize local objects
							$scope.customer = $scope.newCustomer();
							$scope.customerList = {};

						} ]);