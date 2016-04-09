var app = angular.module("stockApp");

app.controller("customerListCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF) {

	$log.debug("Inside customerListCtr");

	$scope.query = {
		order : 'name',
		limit : 5,
		page : 1
	};
	$scope.selected = [];
		
	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	$scope.getAllCustomersByBusiness = function() {

		var customerService = appEndpointSF.getCustomerService();

		customerService.getAllCustomersByBusiness(
				$scope.curUser.business.id).then(
				function(custList) {
					$log.debug("Inside Ctr getAllCustomers");
					$scope.customers = custList.items;
					$log.debug("Inside Ctr $scope.customers:"
							+ angular.toJson($scope.customers));
				});
	}

	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			$scope.getAllCustomersByBusiness();
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}
	

	$scope.customers = [];
	$scope.selected = [];	
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
		$mdToast.show($mdToast.simple().content('Customer Data Saved!')
				.position("top").hideDelay(3000));
	};

	$scope.back = function() {
		window.history.back();
	}
	
	$scope.getSOListByID = function() {
		var salesOrderService = appEndpointSF.getSalesOrderService();

		salesOrderService.getSOListByID($scope.selected[0].id).then(
				function(sOListByID) {
					$scope.sOListByID = sOListByID;
					$log.debug("$scope.getSOByID:"
							+ angular.toJson($scope.sOListByID));
				});
	}
	
	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			if ($scope.customers != "") {
				$scope.getSOByID();
			}
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}

	$scope.sOListByID = [];
	$scope.waitForServiceLoad();
	
/*	
	$scope.getInvoiceListByCustId = function() {
		var invoiceService = appEndpointSF.getInvoiceService();

		invoiceService.getInvoiceListByCustId($scope.customerId).then(
				function(invoiceListByID) {
					$scope.invoiceListByID = invoiceListByID;
					$log.debug("$scope.invoiceListByID:"
							+ angular.toJson($scope.invoiceListByID));
				});
	}
	
	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			if ($scope.selectedSupplierNo != "") {
				$scope.getInvoiceListByCustId();
			}
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}

	$scope.invoiceListByID = [];
	$scope.waitForServiceLoad();
*/
});
