var app= angular.module("stockApp");

app.controller(
		"customerEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams,$state,$location, objectFactory, appEndpointSF) {

			$log.debug("Inside customerEditCtr");
		
			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedCustomerId:",
					$stateParams.selectedCustomerId);

			$scope.customerId = $stateParams.selectedCustomerId;
	
			$scope.getCustomerByID = function() {
				
				var customerService = appEndpointSF.getCustomerService();

				customerService.getCustomerByID($scope.customerId).then(
						function(custList) {
							$scope.customer = custList;
							$log.debug("Inside Ctr $scope.customers:"
									+ angular.toJson($scope.customers));
						});
			}

			$scope.customer = [];
			$scope.getCustomerByID();

			$scope.updateCustomer = function() {
				var customerService = appEndpointSF.getCustomerService();
				customerService.updateCustomer($scope.customer).then(function(msgBean) {
					$scope.showSimpleToast();
				});			
				window.history.back();
			}			
			
			$scope.cancelUpdate = function() {
				window.history.back();
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
			
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Updated....')
						.position("top").hideDelay(3000));
			};
			$scope.back = function() {
				 window.history.back();
			}
		});
