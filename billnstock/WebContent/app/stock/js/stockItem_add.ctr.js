angular.module("stockApp").controller(
		"stockAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));

			$scope.stock = {
				id : "",
				warehouseId : "",
				itemName : "",
				category : "",
				qty : "",
				price : "",
				thresholdValue : '',
				notes : '',
				loggedInUser : ""
			};
			$scope.addStock = function() {
				$log.debug("No1");
				var stockService = appEndpointSF.getStockService();
				$scope.stock.loggedInUser = $scope.curUser;

				stockService.addStock($scope.stock).then(function(msgBean) {
					$log.debug("No6");
					$log.debug("Inside Ctr addStock");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSimpleToast();

				});
				$log.debug("No4");
				$scope.stock = {};
			}

			$scope.getAllWarehouseByBusiness = function() {
				$log.debug("Inside function $scope.getAllWarehouseByBusiness");
				var warehouseService = appEndpointSF
						.getWarehouseManagementService();

				warehouseService.getAllWarehouseByBusiness(
						$scope.curUser.businessAccount.id).then(
						function(warehouseList) {
							$scope.warehouses = warehouseList;
							$log.debug("$scope.warehouses:"
									+ angular.toJson($scope.warehouses));
						});
			}

			$scope.getAllWarehouseByBusiness();

			$scope.warehouseDDLChange = function(index, selectedWarehouse) {
				$log.debug("##Came to warehouseDDLChange...");

				$scope.stock.warehouseId = selectedWarehouse;
			};

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Stock Item Saved!')
						.position("top").hideDelay(3000));
			};

			// Setup menu
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