angular
		.module("customerApp")
		.controller(
				"homeCtr",
				[
						'$scope',
						'$window',
						'$mdToast',

						function($scope, $window, $mdToast) {
							console.log("Inside homeCtr");
							// console.log("Via Serice:" +
							// customerservice.addCustomer());

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

							$window.initGAPI = function() {
								console.log("Came to initGAPI");
								// alert("Came to initGAPI");
								// $scope.$apply($scope.loadCustomService);
								// $scope.loadCustomService();

								// temp. Loading customer list here
								// $scope.loadCustomerList();

							};

							$scope.loadCustomService = function() {
								console.log("Inside window.loadCustomServices");
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								// Loads the OAuth and helloworld APIs
								// asynchronously, and
								// triggers login
								// when they have completed.
								var apisToLoad;

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()

								gapi.client.load('customerservice', 'v0.1',
										function() {
											$scope.is_backend_ready = true;
											// $scope.loadCustomerList();

										}, apiRoot);

							};

							// initialize local objects
							$scope.customer = $scope.newCustomer();
							$scope.customerList = {};

						} ]);