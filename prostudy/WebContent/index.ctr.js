function init() {
	// alert("Inside init");
	console.log("###Inside init###");
	window.initGAPI(); // Calls the init function defined on the window
}

angular
		.module("prostudyApp")
		.controller(
				"indexCtr",
				[
						'$scope',
						'$window',
						'$mdToast',

						function($scope, $window, $mdToast) {
							console.log("Inside indexCtr");
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
								$scope.loadCustomService();

							};

							$scope.loadCustomService = function() {
								console.log("Inside Loading Google Endpoints");
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

						} ]).controller('AppCtrl',
				function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
					$scope.toggleLeft = buildToggler('left');
					//$scope.toggleRight = buildToggler('right');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}
				}).controller('LeftCtrl',
				function($scope, $timeout, $mdSidenav, $log) {
					$scope.close = function() {
						$mdSidenav('left').close().then(function() {
							$log.debug("close LEFT is done");
						});
					};
				});