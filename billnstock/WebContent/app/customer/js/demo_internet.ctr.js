var app = angular.module("stockApp");

app.controller("demoInternetCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log, $stateParams, objectFactory, appEndpointSF) {

	$log.debug("Inside demoInternetCtr");

	$scope.showSimpleToast = function() {
		$mdToast.show($mdToast.simple().content('Internet Data Saved!')
				.position("top").hideDelay(3000));
	};

	// $scope.cust = objectFactory.newCustomer();

	$scope.internet = {
		internetName : "",
		plan : "",
		cost : "",
	};

	$scope.addInternet = function() {
		$log.debug("No1");
		var internetService = appEndpointSF.getInternetService();
		internetService.addInternet($scope.internet).then(function(msgBean) {
			$log.debug("No6");
			$log.debug("Inside Ctr addInternet");
			$log.debug("msgBean.msg:" + msgBean.msg);
			$scope.showSimpleToast();

		});
		$log.debug("No4");
		$scope.internet = {};
	}

	$scope.getAllInternet = function() {
		$log.debug("Inside Ctr $scope.getAllInternet");
		var internetService = appEndpointSF.getInternetService();

		internetService.getAllInternet().then(
				function(internetList) {
					$log.debug("Inside Ctr getAllInternet");
					$scope.internets = internetList;
					$log.debug("Inside Ctr $scope.getAllInternet:"
							+ angular.toJson($scope.internets));
				});
	}
	$scope.internets = [];
	$scope.getAllInternet();

	$scope.searchRecord = function() {
		$log.debug("Inside Ctr $scope.searchRecord");
		var internetService = appEndpointSF.getInternetService();

		internetService.searchRecord($scope.textForSearch).then(
				function(searchPlan) {
					$log.debug("Inside Ctr searchRecord");
					$scope.searchPlan = searchPlan;
					$log.debug("$scope.searchPlan:" + $scope.searchPlan.plan);
					$log.debug("Inside Ctr $scope.searchPlan:"
							+ angular.toJson($scope.searchPlan));
				});
	}

	$scope.searchByCost = function() {
		$log.debug("Inside Ctr $scope.searchByCost");
		var internetService = appEndpointSF.getInternetService();

		internetService.searchByCost($scope.cost).then(
				function(searchedRecByCost){
					$scope.searchedRecByCost = searchedRecByCost;
					$log.debug("Inside Ctr $scope.searchPlan:"
							+ angular.toJson($scope.searchedRecByCost));
				})
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
});
