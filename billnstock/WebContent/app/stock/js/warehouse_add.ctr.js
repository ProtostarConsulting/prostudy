var app = angular.module("stockApp");

app.controller("warehouseAddCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF) {

	$log.debug("Inside customerCtr");

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	$scope.warehouse = {
		warehouseName : "",
		description : "",
		address1 : "",
		address2 : "",
		city : "",
		pin : "",
		state : "",
		country : "",
		business : ""
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
							$log.debug("$scope.warehouse"+$scope.warehouse);
							
						});
	}

	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			if ($scope.selectedSupplierNo != "") {
				$scope.getWarehouseById();
			}
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}

	$scope.warehouse = [];
	$scope.waitForServiceLoad();

	
	
	$scope.addWarehouse = function() {
		$log.debug("No1");
		$scope.warehouse.business = $scope.curUser.business;
		var WarehouseManagementService = appEndpointSF.getWarehouseManagementService();
		WarehouseManagementService.addWarehouse($scope.warehouse).then(function(msgBean) {
		});
		$scope.warehouse = {};
		$scope.warehouseForm.$setPristine();
		$scope.warehouseForm.$setValidity();
		$scope.warehouseForm.$setUntouched();
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

	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content('Customer Data Saved!')
				.position("top").hideDelay(3000));
	}
});
