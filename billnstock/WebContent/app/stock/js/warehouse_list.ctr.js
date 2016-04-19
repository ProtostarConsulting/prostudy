var app= angular.module("stockApp");

app.controller(
		"warehouseListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside warehouseListCtr");

			$scope.query = {
					order : 'name',
					limit : 5,
					page : 1
				};
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			2
//			$scope.cust.businessAccount =$scope.curUser.businessAccount;
			
			$scope.getAllWarehouseByBusiness = function() {
				$log.debug("Inside function $scope.getAllWarehouseByBusiness");
				var warehouseService = appEndpointSF.getWarehouseManagementService();

				warehouseService.getAllWarehouseByBusiness($scope.curUser.business.id).then(
						function(warehouseList) {
							$scope.warehouses = warehouseList;
							$log.debug("Inside Ctr $scope.warehouses:"
									+ angular.toJson($scope.warehouses));
						});
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getAllWarehouseByBusiness();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}
			$scope.warehouses = [];
			$scope.waitForServiceLoad();
			
			
			
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
