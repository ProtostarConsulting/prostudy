angular.module("stockApp").controller(
		"stockAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http, $stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));

			$scope.stock = {
				id : "",
				warehouse : "",
				itemName : "",
				category : "",
				qty : "",
				price : "",
				thresholdValue : '',
				notes : '',
				createdDate : new Date(),
				modifiedDate : new Date(),
				modifiedBy : '',
				business : ""
			};
			$scope.addStock = function() {
				$log.debug("No1");
				var stockService = appEndpointSF.getStockService();
				if ($scope.selectedStocksId == undefined) {
					$scope.stock.business = $scope.curUser.business;
					$scope.stock.modifiedBy =$scope.curUser.email_id;
					$scope.stock.createdDate =$scope.tempStock.createdDate;
				}

				stockService.addStock($scope.stock).then(function(msgBean) {
					$scope.showSimpleToast();

				});
				$log.debug("No4");
				$scope.stockForm.$setPristine();
				$scope.stockForm.$setValidity();
				$scope.stockForm.$setUntouched();
				$scope.stock = {};
			}
/*
			$scope.updateStock = function() {
				$log.debug("No1");
				var stockService = appEndpointSF.getStockService();
				$scope.stock.userBusiness = $scope.curUser.business;

				stockService.addStock($scope.stock).then(function(msgBean) {
					$scope.showSimpleToast();

				});
				$log.debug("No4");
				$scope.stock = {};
			}
*/
			$scope.getAllWarehouseByBusiness = function() {
				$log.debug("Inside function $scope.getAllWarehouseByBusiness");
				var warehouseService = appEndpointSF
						.getWarehouseManagementService();

				warehouseService.getAllWarehouseByBusiness(
						$scope.curUser.business.id).then(
						function(warehouseList) {
							$scope.warehouses = warehouseList;
							$log.debug("$scope.warehouses:"
									+ angular.toJson($scope.warehouses));
						});
			}
/*
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getAllWarehouseByBusiness();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.waitForServiceLoad();
*/
			$scope.warehouseDDLChange = function(index, selectedWarehouse) {
				$log.debug("##Came to warehouseDDLChange...");

				$scope.stock.warehouse = selectedWarehouse;
			};

			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedStocksId:",
					$stateParams.selectedStocksId);

			$scope.selectedStocksId = $stateParams.selectedStocksId;

			$scope.getStockById = function() {
				var stockService = appEndpointSF.getStockService();
				stockService.getStockById($scope.selectedStocksId).then(
						function(stock) {

							$scope.stock = stock;
							$scope.tempStock = stock;
							$log.debug("Inside Ctr $scope.stockData:"
									+ angular.toJson($scope.stockData));

						});
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					if ($scope.selectedStocksId != undefined) {
						$scope.getStockById();
					}
					$scope.getAllWarehouseByBusiness();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}

			$scope.stock = [];
			$scope.waitForServiceLoad();
			
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