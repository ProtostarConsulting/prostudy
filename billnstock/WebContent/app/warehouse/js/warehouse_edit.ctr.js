var app= angular.module("stockApp");

app.controller(
		"warehouseEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Data Saved!')
						.position("top").hideDelay(3000));
			};
		
			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedWarehouseId:",
					$stateParams.selectedWarehouseId);

			$scope.selectedWarehouseId = $stateParams.selectedWarehouseId;
		
			$scope.getWarehouseById = function() {
				var warehouseService = appEndpointSF.getWarehouseManagementService();
				warehouseService
						.getWarehouseById($scope.selectedWarehouseId)
						.then(
								function(warehouse) {

									$scope.warehouse = warehouse;
								});
			}

			$scope.warehouse = [];
			$scope.getWarehouseById();
			
			
			$scope.updateWarehouse = function() {
				var warehouseService = appEndpointSF.getWarehouseManagementService();
				warehouseService.updateWarehouse($scope.warehouse).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg);
				});
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
			
			$scope.back = function() {
				 window.history.back();
			}
		});
