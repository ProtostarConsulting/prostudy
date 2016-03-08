var app = angular.module("stockApp");

app.controller("accountPayableCtr", function($scope, $window, $mdToast,
		$timeout, $mdSidenav, $mdUtil, $log, $stateParams, objectFactory,
		appEndpointSF) {

	$log.debug("Inside accountAddCtr");

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	$scope.accountPayable = {
		customer:[],
		invoiceId : '',
		invoiceDate : '',
		invoiceAmount : '',
		invoiceDueDate : '',
		purchaseOrderId : '',
		purchaseOrderDate : '',
		loggedInUser : ''
	};

	$scope.addPayable = function() {
		
		$scope.accountPayable.loggedInUser = $scope.curUser;
		var payableService = appEndpointSF.getAccountService();
		
		payableService.addPayable($scope.accountPayable).then(function(msgBean) {
			$scope.showSimpleToast();
		});
		
		$scope.accountPayable = {};
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
		$mdToast.show($mdToast.simple().content('Account Data Saved!')
				.position("top").hideDelay(3000));
	};

	$scope.getAllCustomersByCurrUser = function() {
		$log.debug("Inside Ctr $scope.getAllCustomers");
		var customerService = appEndpointSF.getCustomerService();

		customerService.getAllCustomersByCurrUser(
				$scope.curUser.businessAccount.id).then(
				function(custList) {
					$scope.customersforPayable = custList;
					$log.debug("$scope.customersforPayable:"
							+ angular.toJson($scope.customersforaccount));
				});
	}

	$scope.customersforPayable = [];
	$scope.getAllCustomersByCurrUser();
	
	$scope.CustomerddlChange = function (index, selectedcustomerName){
		$log.debug("##Came to CustomerddlChange...");
	}	
});
