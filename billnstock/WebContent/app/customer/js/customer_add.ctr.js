var app = angular.module("stockApp");

app.controller("customerAddCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF) {

	$log.debug("Inside customerCtr");

	$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
	$log.debug("$scope.curUser++++++++" + angular.toJson($scope.curUser));

	
	$scope.cust = {
		customerName : "",
		mobile : "",
		email : "",
		address : "",
		loggedInUser : ""
	};

	$scope.addCustomer = function() {
		$log.debug("No1");
		$scope.cust.loggedInUser = $scope.curUser;
		var customerService = appEndpointSF.getCustomerService();
		customerService.addCustomer($scope.cust).then(function(msgBean) {
			$log.debug("No6");
			$log.debug("Inside Ctr addCustomer");
			$log.debug("msgBean.msg:" + msgBean.msg);
			$scope.showSimpleToast();

		});
		$log.debug("No4");
		$scope.cust = {};
		
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

	/*
	 * $scope.validate = function(){
	 * 
	 * name: { inputType: 'text', required: true } };
	 */
});
