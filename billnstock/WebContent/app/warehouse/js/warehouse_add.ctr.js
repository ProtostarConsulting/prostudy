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
	
	
	$scope.addWarehouse = function() {
		$log.debug("No1");
		$scope.warehouse.business = $scope.curUser.business;
		var WarehouseManagementService = appEndpointSF.getWarehouseManagementService();
		WarehouseManagementService.addWarehouse($scope.warehouse).then(function(msgBean) {
		});
		$scope.warehouse = {};
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
