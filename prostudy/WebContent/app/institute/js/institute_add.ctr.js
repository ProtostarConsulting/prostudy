angular.module("prostudyApp").controller(
		"instituteAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.addInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				$scope.institutes = InstituteService
						.addInstitute($scope.tempInstitute);
				$scope.tempInstitute = {
					name : "",
					city : "",
					state : ""
				};
				$scope.showSavedToast();
			}

			$scope.getInstitutes = function() {
				$scope.institutes = appEndpointSF.getInstituteService()
						.getInstitutes();
				$log.debug("Inside getInstitutes...");
				$log.debug("$scope.institutes:" + $scope.institutes);
			}

			$scope.tempInstitute = {
				name : "",
				city : "",
				state : ""
			};
			// $scope.institutes =[];

			$scope.getInstitutes();

			// Table related code

			$scope.selected = [];

			$scope.query = {
				order : 'name',
				limit : 5,
				page : 1
			};

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

			$scope.onorderchange = function(order) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

		});
