angular.module("prostudyApp").controller(
		"homeCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory) {

			$scope.myDate = new Date();

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('X Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.showDateValue = function() {
				console.log("in side showDateValue");
				$log.debug("$scope.myDate:" + $scope.myDate);

			};// end of call to addCustomer

		});