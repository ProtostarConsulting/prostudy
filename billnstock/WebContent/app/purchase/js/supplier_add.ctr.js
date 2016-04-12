app = angular.module("stockApp");

app.controller("supplierAddCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $state, $http, $stateParams, $routeParams,
		$filter, $q, objectFactory, appEndpointSF) {

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	$scope.supplier = {
		supplierName : '',
		contactFName : '',
		contactLName : '',
		phone1 : '',
		mobile : '',
		address : '',
		email : '',
		business : ''
	};

	$scope.addSupplier = function() {
		var supplierService = appEndpointSF.getSupplierService();
		$scope.supplier.business = $scope.curUser.business;

		supplierService.addSupplier($scope.supplier).then(function(msgBean) {
			$scope.showSimpleToast();
			// $scope.getAllPurchaseOrder();
		});
		$scope.supplierForm.$setPristine();
		$scope.supplierForm.$setValidity();
		$scope.supplierForm.$setUntouched();
		$scope.supplier = {};
	}

	$log.debug("$stateParams:", $stateParams);
	$log.debug("$stateParams.selectedSupplierNo:",
			$stateParams.selectedSupplierNo);

	$scope.selectedSupplierNo = $stateParams.selectedSupplierNo;

	$scope.getSupplierByID = function() {

		var supplierService = appEndpointSF.getSupplierService();

		supplierService.getSupplierByID($scope.selectedSupplierNo).then(
				function(supplierList) {
					$scope.supplier = supplierList;
					$scope.supplier.mobile = parseInt($scope.supplier.mobile);
					$scope.supplier.phone1 = parseInt($scope.supplier.phone1);
					
					$log.debug("$scope.getSupplierByID:"
							+ angular.toJson($scope.customers));
				});
	}

	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			if ($scope.selectedSupplierNo != undefined) {
				$scope.getSupplierByID();
			}
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}

	$scope.supplier = [];
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

	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content('Supplier Order Saved!')
				.position("top").hideDelay(3000));
	};
});
