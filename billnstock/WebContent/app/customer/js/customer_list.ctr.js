var app= angular.module("stockApp");

app.controller(
		"customerListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside customerListCtr");

			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));

//			$scope.cust.businessAccount =$scope.curUser.businessAccount;
			
			$scope.getAllCustomersByBusiness = function() {
	
				var customerService = appEndpointSF.getCustomerService();

				customerService.getAllCustomersByBusiness($scope.curUser.businessAccount.id).then(
						function(custList) {
							$log.debug("Inside Ctr getAllCustomers");
							$scope.customers = custList.items;
							$log.debug("Inside Ctr $scope.customers:"
									+ angular.toJson($scope.customers));
						});
			}

			$scope.customers = [];
			$scope.getAllCustomersByBusiness();
			
			
			$scope.selected = [];
			
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
