var app= angular.module("stockApp");

app.controller(
		"customerCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

		

			// $scope.cust = objectFactory.newCustomer();		
			
			$scope.cust = {
				customerId : "",
				customerName : "",
				mobile : "",
				email : "",
				customerAddress : ""
			};

			$scope.addCustomer = function() {
				$log.debug("No1");
				var customerService = appEndpointSF.getCustomerService();
				customerService.addCustomer($scope.cust).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addCustomer");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showAddToast();

						});
				$log.debug("No4");
				$scope.cust = {};
			}
			
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
