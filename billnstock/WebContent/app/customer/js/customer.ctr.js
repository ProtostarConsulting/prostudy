angular.module("stockApp").controller(
		"customerCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Data Saved!')
						.position("top").hideDelay(3000));
			};

			// $scope.cust = objectFactory.newCustomer();

			$scope.cust = {
				customerName : "",
				mobile : "",
				email : "",
				customerAddress : ""
			};

			$scope.addCustomer = function() {
				$log.debug("No1");
				var customerService = appEndpointSF.getCustomerService();
				// $scope.students =
				// studentService.addStudent($scope.tempStudent);

				customerService.addCustomer($scope.cust).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addCustomer");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
						
						});
				$log.debug("No4");
				$scope.cust = {};
			}

			$scope.getAllCustomers = function() {
				$log.debug("Inside Ctr $scope.getAllCustomers");
				var customerService = appEndpointSF.getCustomerService();

				customerService.getAllCustomers().then(
						function(custList) {
							$log.debug("Inside Ctr getAllCustomers");
							$scope.customers = custList;
							$log.debug("Inside Ctr $scope.customers:"
									+ angular.toJson($scope.customers));
						});
			}

			$scope.customers = [];
			$scope.getAllCustomers();

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
		});
