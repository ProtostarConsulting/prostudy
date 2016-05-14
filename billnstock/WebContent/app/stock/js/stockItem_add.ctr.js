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
				if ($scope.selectedStocksId == "") {
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
			//	$log.debug("$rootScope.selectedWarehouse:---"+angular.toJson($rootScope.selectedWarehouse));
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

			function DialogController($scope, $mdDialog, curBusi,curUser, $state,
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
								$state.reload();
								//$state.go("stock.stockItemAdd");
							});
					$scope.hide();
				}	
				$scope.hide = function() {
					$mdDialog.hide();
				};
			}
			
			
			
			// ----------------------UPLODE EXCEL FILE-------------------------------

			$scope.UplodeExcel = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog
						.show(
								{
									controller : ExcelController,
									templateUrl : '/app/stock/stock_UploadStockExcel.html',
									parent : angular
											.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals : {
										curuser : $scope.curUser
										
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

			function ExcelController($scope, $mdDialog, curuser) {
			
				$scope.loding=false;
				$scope.bizID;
				$scope.uplodeimage=function(){
					$scope.WareHouseID = $scope.warehouseNmae.id;
					 document.excelform.action = $scope.ExcelStockUploadURL;
				      document.excelform.submit();
				      $scope.loding=true;
				}
				$scope.getAllWarehouseByBusiness = function() {
					$log.debug("Inside function $scope.getAllWarehouseByBusiness");
					var warehouseService = appEndpointSF
							.getWarehouseManagementService();

					warehouseService.getAllWarehouseByBusiness(
							curuser.business.id).then(
							function(warehouseList) {
								$scope.warehouses = warehouseList;
								$scope.bizID=curuser.business.id;
								$log.debug("$scope.warehouses:"
										+ angular.toJson($scope.warehouses));
							});
				
				}
				
				$scope.getExcelStockUploadURL=function(){
					var uploadUrlService = appEndpointSF.getuploadURLService();
					uploadUrlService.getExcelStockUploadURL()
							.then(function(url) {
								$scope.ExcelStockUploadURL=url.msg;
							
							});
					
				}
				$scope.ExcelStockUploadURL;
				
				$scope.waitForServiceLoad = function() {
					if (appEndpointSF.is_service_ready) {
						$scope.getExcelStockUploadURL();
						$scope.getAllWarehouseByBusiness();
					} else {
						$log.debug("Services Not Loaded, watiting...");
						$timeout($scope.waitForServiceLoad, 1000);
					}
				}
				$scope.waitForServiceLoad();
				}

			// -------------------------------------------------------
			
			
		});