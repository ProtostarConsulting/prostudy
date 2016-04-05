app = angular.module("stockApp");
app.controller("salesOrderViewCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter, objectFactory, appEndpointSF) {

	$scope.salesOrder = {};

	$log.debug("$stateParams:", $stateParams);
	$log.debug("$stateParams.selectedSOId:",
			$stateParams.selectedSOId);

	$scope.selectedSalesOrderNo = $stateParams.selectedSOId;
	
	$scope.getSOByID = function() {
		var salesService = appEndpointSF.getSalesOrderService();

		salesService
				.getSOByID($scope.selectedSalesOrderNo)
				.then(function(sOList) {
							$scope.sODetail = sOList;
							
							$scope.sODetail.finalTotal = Math.round($scope.sODetail.finalTotal);
							$scope.finalTotalInWord = NumToWord($scope.sODetail.finalTotal);
							
							$log
									.debug("$scope.showSales Order ===="
											+ angular
													.toJson($scope.sODetail));
						});

	}
	$scope.sODetail = [];
	$scope.getSOByID();

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

	var printDivCSS = new String(
			'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
					+ '<link href="/css/header.css"" rel="stylesheet" type="text/css">')
	$scope.printDiv = function(divId) {
		// window.frames["print_frame"].document.body.innerHTML
		// = printDivCSS
		// + document.getElementById(divId).innerHTML;
		window.frames["print_frame"].document.body.innerHTML = document
				.getElementById(divId).innerHTML;
		window.frames["print_frame"].window.focus();
		window.frames["print_frame"].window.print();
	}
	
	$scope.back = function() {
		 window.history.back();
	}
});
