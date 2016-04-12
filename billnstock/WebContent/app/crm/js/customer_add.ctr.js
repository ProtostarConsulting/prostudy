var app = angular.module("stockApp");

app.controller("customerAddCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF) {

	$log.debug("Inside customerAddCtr");

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));
	
	$scope.customer={isCompany:false}
	
	$scope.addCustomer = function() {
		$log.debug("No1");
		$scope.customer.business = $scope.curUser.business;
		var customerService = appEndpointSF.getCustomerService();
		customerService.addCustomer($scope.customer).then(function(msgBean) {

			$scope.showSimpleToast();
		});
		$scope.custForm.$setPristine();
		$scope.custForm.$setValidity();
		$scope.custForm.$setUntouched();
		$scope.customer = {};
	}

	
	$log.debug("$stateParams:", $stateParams);
	$log.debug("$stateParams.selectedCustomerId:",
			$stateParams.selectedCustomerId);

	$scope.customerId = $stateParams.selectedCustomerId;

	$scope.getCustomerByID = function() {

		var customerService = appEndpointSF.getCustomerService();

		customerService.getCustomerByID($scope.customerId).then(
				function(custList) {
					$scope.customer = custList;
					$scope.customer.mobile = parseInt($scope.customer.mobile);
					$log.debug("Inside Ctr $scope.customers:"
							+ angular.toJson($scope.customers));
				});
	}
	$scope.customer = [];
	$scope.waitForServiceLoad = function() {
		if (appEndpointSF.is_service_ready) {
			if ($scope.selectedSupplierNo != "") {
				$scope.getCustomerByID();
			}
		} else {
			$log.debug("Services Not Loaded, watiting...");
			$timeout($scope.waitForServiceLoad, 1000);
		}
	}
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
	}

});
