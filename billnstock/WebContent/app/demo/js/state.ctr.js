angular.module("stockApp")
		.controller(
				"statesPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF) {
					console.log("Inside statesPageCtr");
					
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.someVal:", $stateParams.someVal);
					
					$scope.objectFromStateParam = [];
					$scope.objectFromStateParam = angular.fromJson($stateParams.someVal);
					
					$scope.testCtrVariable = [{name:'ganesh'}, {name:'ravi'}];
					
					$scope.things = [ "A", "Set", "Of", "Things", "out" ];
					$scope.items = [ "A", "List", "Of", "Items", "out" ];
					// console.log("Via Serice:" +
					// customerservice.addCustomer());
					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Saved!').position("top").hideDelay(
								3000));
					};



					/* Setup Menu */
					$scope.toggleRight = buildToggler('right');
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

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};
					
					$scope.getJson = function(object) {
						return angular.toJson(object);
					};
					
					
					$scope.tempCustomer = {cust_Name: "", mobile: ""};
					$scope.customers = []; 
					
					$scope.addCustomer = function(){
						var CustomerService = appEndpointSF.getCustomerService();
						//$scope.Customers = CustomerService.addCustomer($scope.tempCustomer);
												
						CustomerService.addCustomer($scope.tempCustomer)
						.then(
								function() {
									$log
											.debug("Inside Ctr addCustomer");
									$scope.showSimpleToast();
									$scope.tempCustomer = {cust_Name: "", mobile: ""};
								});
					}
					
					$scope.getAllCustomers = function(){
						//$scope.Customers = appEndpointSF.getCustomerService().getCustomers();
						var CustomerService = appEndpointSF.getCustomerService();					
												
						CustomerService.getAllCustomers($scope.tempCustomer)
						.then(
								function(custList) {
									$log
											.debug("Inside Ctr getCustomers");
									$scope.customers = custList;
								});
					}

				});