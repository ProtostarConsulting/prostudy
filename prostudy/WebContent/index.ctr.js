function init() {
	// alert("Inside init");
	console.log("###Inside init###");
	window.initGAPI(); // Calls the init function defined on the window
}

angular.module("prostudyApp").controller("indexCtr",
				[
						'$scope',
						'$window',
						'$mdToast',
						'$mdBottomSheet',
						/*'appEndpointSF',*/
						function($scope, $window, $mdToast, $mdBottomSheet/*, appEndpointSF*/) 
						{
							console.log("Inside indexCtr");

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
												function(resp) 
												{
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
								// This will load all server side end points
								//$scope.loadAppGoogleServices();

							};

							$scope.loadAppGoogleServices = function() {
								console
										.log("###Inside loadAppGoogleServices###");
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								var apisToLoad;

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()

								gapi.client
										.load(
												'examService',
												'v0.1',
												function() {
													console
															.log("exameService Loaded....");
													// $scope.addTaxToDB();
												}, apiRoot);

								gapi.client
										.load(
												'questionService',
												'v0.1',
												function() {
													console
															.log("questionService Loaded....");
													$scope.is_backend_ready = true;

												}, apiRoot);

							};

							$scope.openBottomSheet = function() {
								$mdBottomSheet
										.show({
											template : '<md-bottom-sheet>Hello!</md-bottom-sheet>'
										});
							};

							// initialize local objects
							$scope.customer = $scope.newCustomer();
							$scope.customerList = {};

						} ]).controller('AppCtrl',
				function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
					$scope.toggleLeft = buildToggler('left');
					// $scope.toggleRight = buildToggler('right');
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