var app= angular.module("stockApp");

app.controller(
		"warehouseListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside warehouseListCtr");

			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			2
//			$scope.cust.businessAccount =$scope.curUser.businessAccount;
			
			$scope.getAllWarehouseByBusiness = function() {
				$log.debug("Inside function $scope.getAllWarehouseByBusiness");
				var warehouseService = appEndpointSF.getWarehouseManagementService();

				warehouseService.getAllWarehouseByBusiness($scope.curUser.businessAccount.id).then(
						function(warehouseList) {
							$scope.warehouses = warehouseList;
							$log.debug("Inside Ctr $scope.warehouses:"
									+ angular.toJson($scope.warehouses));
						});
			}

			$scope.getAllWarehouseByBusiness();
			
			
			$scope.selected = [];
			$scope.updateWarehouse = function() {
				var warehouseService = appEndpointSF.getWarehouseManagementService();

				warehouseService.updateWarehouse($scope.selected[0]).then(
						function(msgBean) {
							$scope.showSimpleToast();
						});
				$log.debug("Selected Warehouse updated");
				$scope.selected[0].id = "";
				$scope.selected[0].warehouseName = "";
				$scope.selected[0].description = "";
				$scope.selected[0].address1 = "";
				$scope.selected[0].address2 = "";
				$scope.selected[0].city = ""; 
				$scope.selected[0].state = "";
				$scope.selected[0].country = "";
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
				$mdToast.show($mdToast.simple().content('Customer Data Saved!')
						.position("top").hideDelay(3000));
			};
	
			$scope.back = function() {
				 window.history.back();
			}
		});
