app = angular.module("stockApp");

app.controller("supplierListCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter, objectFactory, appEndpointSF) {

	  $scope.query = {
			    order: 'name',
			    limit: 5,
			    page: 1
			  };
	  
	$scope.curUser = appEndpointSF.getLocalUserService()
	.getLoggedinUser();
	$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
	
	$scope.getAllSuppliersByBusiness = function() {
		var supplierService = appEndpointSF.getSupplierService();

		supplierService.getAllSuppliersByBusiness($scope.curUser.business.id).then(
				function(supplierList) {

					$scope.supplierList = supplierList;
					$log.debug("@@@@@@@getAllSuppliersByBusiness"+angular.toJson($scope.supplierList));
//					$scope.temppurchaseOrder = $scope.purchaseOrderList.length + 1;
//					$scope.purchaseOrderObj.purchaseOrderNo = $scope.temppurchaseOrder;
				});
	}

	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			$scope.getAllSuppliersByBusiness();
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}
	
	$scope.supplierList = [];
//	$scope.temppurchaseOrder;
	$scope.waitForServiceLoad();

	/* Setup menu */
	$scope.toggleRight = buildToggler('right');
	/**
	 * Build handler to open/close a SideNav; when animation finishes report
	 * completion in console
	 */
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
