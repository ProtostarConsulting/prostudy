angular
		.module("prostudyApp")
		.controller(
				"homeCtr",
				[
						'$scope',
						'$window',
						'$mdToast',

						function($scope, $window, $mdToast) {
							console.log("Inside homeCtr");
						

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