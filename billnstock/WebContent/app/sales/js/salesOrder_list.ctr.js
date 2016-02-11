app = angular.module("stockApp");
app.controller("salesOrderListCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter, objectFactory, appEndpointSF) {

	
	$scope.curUser = appEndpointSF.getLocalUserService()
	.getLoggedinUser();
	$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
	
	$scope.salesOrder = {};

	$scope.getAllSalesOrder = function() {
		$log.debug("Inside Ctr $scope.getAllSalesOrder");
		var salesOrderService = appEndpointSF.getSalesOrderService();

		salesOrderService.getAllSalesOrder($scope.curUser.businessAccount.id).then(
				function(salesOrderList) {
					$log.debug("Inside Ctr getAllSalesOrder");
					$scope.salesOrderList = salesOrderList;
					$log.debug("@@@@@@@getAllSalesOrder:"+angular.toJson($scope.salesOrderList));
//					$scope.tempSalesOrder = $scope.salesOrderList.length +1;
//					$log.debug("@@@@@@@getAllSalesOrder!!!!!!!!!!!!!!:"+angular.toJson($scope.tempSalesOrder));
//					$scope.salesOrder.salesOrderId = $scope.tempSalesOrder;
				});
	}

//	$scope.salesOrderList = [];
	$scope.tempSalesOrder;
	$scope.getAllSalesOrder();


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
});
