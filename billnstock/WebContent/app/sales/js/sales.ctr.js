app = angular.module("stockApp");
app.controller("salesCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter, objectFactory, appEndpointSF) {

	$scope.salesOrder = {
		salesOrderId : "",
		customerName : "",
		customerRefId : "",
		quotationDate : "",
		salesOrderDate : "",
		paymentDays : "",
		quickPay : "",
		quickPayDays : "",
		paymentTerms : "",
		dispatchDetails : ""
	};
	
	$scope.addSalesOrder = function() {

		var salesService = appEndpointSF.getSalesService();
		salesService.addSalesOrder($scope.salesOrder).then(function(msgBean) {

			$log.debug("Inside Ctr salesOrder");
			$log.debug("msgBean.msg:" + msgBean.msg);
			$scope.showSimpleToast(msgBean.msg);
			$scope.getAllSalesOrder();
		});

		$scope.salesOrder = {};
	}

	$scope.getAllSalesOrder = function() {
		$log.debug("Inside Ctr $scope.getAllSalesOrder");
		var salesService = appEndpointSF.getSalesService();

		salesService.getAllSalesOrder().then(
				function(salesOrderList) {
					$log.debug("Inside Ctr getAllSalesOrder");
					$scope.salesOrderList = salesOrderList;
					$log.debug("@@@@@@@getAllSalesOrder"+angular.toJson($scope.salesOrderList));
					$scope.tempSalesOrder = $scope.salesOrderList.length + 1;
					$scope.salesOrder.salesOrderId = $scope.tempSalesOrder;
				});
	}

	$scope.salesOrderList = [];
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
