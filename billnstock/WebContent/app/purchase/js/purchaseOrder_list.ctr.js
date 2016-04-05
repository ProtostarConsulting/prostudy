app = angular.module("stockApp");

app.controller("purchaseOrderListCtr", function($scope, $window, $mdToast, $timeout,
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
	
	$scope.purchaseOrderObj = {
			
			purchaseOrderNo: '',
			customer:'',
			to: '',
			shipTo: '',
			poDate:'',
			requisitioner: '',
			shippedVia: '',
			fOBPoint: '',
			terms: '',
			pOLineItemList : [],
			subTotal : '',
			taxCodeName : '',
			taxPercenatge : '',
			taxTotal : 0,
			finalTotal : ''
	};

	$scope.getAllPurchaseOrder = function() {
		$log.debug("Inside Ctr $scope.getAllPurchaseOrder");
		var purchaseService = appEndpointSF.getPurchaseOrderService();

		purchaseService.getAllPurchaseOrder($scope.curUser.businessAccount.id).then(
				function(purchaseOrderList) {
					$log.debug("Inside Ctr getAllPurchaseOrder");
					$scope.purchaseOrderList = purchaseOrderList;
					$log.debug("@@@@@@@getAllPurchaseOrder"+angular.toJson($scope.purchaseOrderList));
//					$scope.temppurchaseOrder = $scope.purchaseOrderList.length + 1;
//					$scope.purchaseOrderObj.purchaseOrderNo = $scope.temppurchaseOrder;
				});
	}

	$scope.purchaseOrderList = [];
//	$scope.temppurchaseOrder;
	$scope.getAllPurchaseOrder();

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
	
	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content(
				'Purchase Order Saved!').position("top")
				.hideDelay(3000));
	};
	
	$scope.back = function() {
		 window.history.back();
	}
});
