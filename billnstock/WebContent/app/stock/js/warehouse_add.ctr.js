var app = angular.module("stockApp");

app
		.controller(
				"warehouseAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, objectFactory,
						appEndpointSF) {

					$log.debug("Inside customerCtr");

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));


		
	/*$scope.addWarehouse = function() {
		
		var WarehouseManagementService = appEndpointSF.getWarehouseManagementService();
		
		if ($scope.selectedWarehouseId == undefined) {
			$scope.warehouse.business = $scope.curUser.business;
			$scope.warehouse.modifiedBy =$scope.curUser.email_id;
			if ($scope.selectedWarehouseId != "") {
			$scope.warehouse.createdDate =$scope.tempWarehouse.createdDate;
			}
			
		}*/
/*		
		$scope.warehouse.business = $scope.curUser.business;
		$scope.warehouse.modifiedBy =$scope.curUser.email_id;
		$scope.warehouse.createdDate =$scope.tempWarehouse.createdDate;
*/		
	/*	WarehouseManagementService.addWarehouse($scope.warehouse).then(function(msgBean) {
		});
		if ($scope.selectedWarehouseId == "") {
			$scope.showAddToast();
					}else{
				$scope.showUpdateToast();
				
			}
		
	
		$scope.warehouse = {};
		$scope.warehouseForm.$setPristine();
		$scope.warehouseForm.$setValidity();
		$scope.warehouseForm.$setUntouched();
		
	}
	*/			$scope.warehouse = {
						warehouseName : "",
						description : "",
						address : [],
						createdDate : new Date(),
						modifiedDate : new Date(),
						modifiedBy : '',
						business : ""
					};


					$scope.addWarehouse = function() {

						var WarehouseManagementService = appEndpointSF
								.getWarehouseManagementService();

						if ($scope.selectedWarehouseId == "") {
							$scope.warehouse.business = $scope.curUser.business;
							$scope.warehouse.modifiedBy = $scope.curUser.email_id;
							if ($scope.selectedWarehouseId != "") {
								$scope.warehouse.modifiedDate = $scope.tempWarehouse.modifiedDate;
							}
						}
						WarehouseManagementService.addWarehouse(
								$scope.warehouse).then(function(msgBean) {
						});
						if ($scope.selectedWarehouseId == "") {
							$scope.showAddToast();
						} else {
							$scope.showUpdateToast();
						}
						$scope.warehouse = {};
						$scope.warehouseForm.$setPristine();
						$scope.warehouseForm.$setValidity();
						$scope.warehouseForm.$setUntouched();

					}

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedWarehouseId:",
							$stateParams.selectedWarehouseId);

					$scope.selectedWarehouseId = $stateParams.selectedWarehouseId;

					$scope.getWarehouseById = function() {
						var warehouseService = appEndpointSF
								.getWarehouseManagementService();
						warehouseService.getWarehouseById(
								$scope.selectedWarehouseId).then(
								function(warehouse) {

									$scope.warehouse = warehouse;
									$scope.tempWarehouse = warehouse;
									$log.debug("$scope.warehouse"
											+ $scope.warehouse);

								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.selectedWarehouseId != "") {
								$scope.getWarehouseById();
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.warehouse = [];
					$scope.waitForServiceLoad();

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
						$mdToast.show($mdToast.simple().content(
								'Customer Data Saved!').position("top")
								.hideDelay(3000));
					}
				});
