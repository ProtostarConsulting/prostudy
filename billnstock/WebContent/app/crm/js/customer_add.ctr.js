var app = angular.module("stockApp");

app
		.controller(
				"customerAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, objectFactory,
						appEndpointSF) {

					$log.debug("Inside customerAddCtr");

					$scope.customerId = $stateParams.selectedCustomerId;

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.customer = {
						isCompany : false,
						createdDate : new Date(),
						modifiedDate : new Date(),
						modifiedBy : ''
					}
					$scope.Address = {
						line1 : "",
						line2 : "",
						city : "",
						state : "",
						country : "",
						pin : ""
					}

					$scope.addCustomer = function() {
						$scope.customer.business = $scope.curUser.business;
						$scope.customer.address = $scope.Address;
						var customerService = appEndpointSF
								.getCustomerService();

						if ($scope.customerId == undefined) {
							$scope.customer.business = $scope.curUser.business;
							$scope.customer.modifiedBy = $scope.curUser.email_id;
							// $scope.customer.createdDate
							// =$scope.tempCustomer.createdDate;
							if ($scope.customerId != undefined) {
								$scope.customer.modifiedDate = $scope.tempCustomer.modifiedDate;
							}

						}
						customerService.addCustomer($scope.customer).then(
								function(msgBean) {
									if ($scope.customerId != "") {
										$scope.showUpdateToast();
									} else {

										$scope.showAddToast();
									}
								});

						$scope.custForm.$setPristine();
						$scope.custForm.$setValidity();
						$scope.custForm.$setUntouched();
						$scope.customer = {};
						$scope.Address = {}
					}

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.customerId:",
							$stateParams.customerId);

					$scope.getCustomerByID = function() {

						var customerService = appEndpointSF
								.getCustomerService();

						customerService
								.getCustomerByID($scope.customerId)
								.then(
										function(custList) {
											$scope.customer = custList;
											$scope.Address = $scope.customer.address;
											$scope.tempCustomer = $scope.customer;
											$scope.customer.mobile = parseInt($scope.customer.mobile);
											$log
													.debug("Inside Ctr $scope.customers:"
															+ angular
																	.toJson($scope.customers));
										});
					}
					$scope.customer = [];
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedSupplierNo != "") {
								$scope.getCustomerByID();
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();

					$scope.Checkemail = function(emailid) {

						var customerService = appEndpointSF
								.getCustomerService();
						customerService
								.isCustomerExists(emailid)
								.then(
										function(responce) {
											if (responce.result.returnBool == true) {
												$scope.userexists = "customer already exists";
												$scope.user.firstName = "";
												$scope.user.lastName = "";
												angular
														.element(document
																.getElementById('line1'))[0].disabled = true;
												angular
														.element(document
																.getElementById('state'))[0].disabled = true;
												angular
														.element(document
																.getElementById('city'))[0].disabled = true;
											} else {
												$scope.userexists = "";
												angular
														.element(document
																.getElementById('line1'))[0].disabled = false;
												angular
														.element(document
																.getElementById('state'))[0].disabled = false;
												angular
														.element(document
																.getElementById('city'))[0].disabled = false;

											}

										});

					}
					$scope.user11 = [];
					$scope.userexist = "";

					$scope.toggleRight = buildToggler('right');

					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Data Saved!').position("top")
								.hideDelay(3000));
					}

				});
