var app= angular.module("stockApp");

app.controller(
		"customerListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			2
//			$scope.cust.businessAccount =$scope.curUser.businessAccount;
			
			$scope.getAllCustomersByCurrUser = function() {
				$log.debug("Inside Ctr $scope.getAllCustomers");
				var customerService = appEndpointSF.getCustomerService();

				customerService.getAllCustomersByCurrUser($scope.curUser.businessAccount.id).then(
						function(custList) {
							$log.debug("Inside Ctr getAllCustomers");
							$scope.customers = custList;
							$log.debug("Inside Ctr $scope.customers:"
									+ angular.toJson($scope.customers));
						});
			}

			$scope.customers = [];
			$scope.getAllCustomersByCurrUser();
			
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
				$mdToast.show($mdToast.simple().content('Customer Data Saved!')
						.position("top").hideDelay(3000));
			};
	
			$scope.back = function() {
				 window.history.back();
			}
		});
