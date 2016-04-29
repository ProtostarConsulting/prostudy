angular.module("stockApp").controller(
		"stockAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $http, $stateParams,$mdMedia, $mdDialog, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
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
					if ($scope.selectedStocksId != "") {
					$scope.stock.createdDate =$scope.tempStock.createdDate;
					}
					
				}

				stockService.addStock($scope.stock).then(function(msgBean) {
				});
				if ($scope.selectedStocksId == "") {
				$scope.showAddToast();
				}else{
					$scope.showUpdateToast();
				}
				$scope.stockForm.$setPristine();
				$scope.stockForm.$setValidity();
				$scope.stockForm.$setUntouched();
				$scope.stock = {};
			}

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
									+ $scope.stockData);

						});
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					if ($scope.selectedStocksId != "") {
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
			
			$scope.query = {
					order : 'name',
					limit : 5,
					page : 1
				};
			
			$scope.addWarehouse = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog
						.show({
							controller : DialogController,
							templateUrl : '/app/stock/warehouse_add.html',
							parent : angular.element(document.body),
							targetEvent : ev,
							clickOutsideToClose : true,
							fullscreen : useFullScreen,
							locals : {
								curBusi : $scope.curUser.business,
								warehouse : $scope.warehouse,
								curUser :  $scope.curUser
							}
						})
						.then(
								function(answer) {
									$scope.status = 'You said the information was "'
											+ answer + '".';
								},
								function() {
									$scope.status = 'You cancelled the dialog.';
								});
			};

			function DialogController($scope, $mdDialog, curBusi,curUser,
					warehouse) {

				$scope.addWarehouse = function() {
					 $scope.warehouse.business = curUser.business;
					 $scope.warehouse.createdDate = new Date();
					 $scope.warehouse.modifiedBy = curUser.email_id;
					var warehouseService = appEndpointSF.getWarehouseManagementService();

					warehouseService.addWarehouse($scope.warehouse).then(
							function(warehouse) {
								$scope.selectedWarehouse = warehouse.warehouseName;
								$log.debug("$scope.selectedWarehouse"+$scope.selectedWarehouse);
								console.log("####################");
							});
					$scope.hide();
				}	
				$scope.hide = function() {
					$mdDialog.hide();
				};
			}
		});