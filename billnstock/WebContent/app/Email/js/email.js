angular.module("stockApp").controller(
		"email",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil, $http,
				$stateParams, $log, objectFactory, appEndpointSF) {

		/*	$scope.url = 'email';

			$scope.formsubmit = function(isValid) {

				if (isValid) {
					$http.post($scope.url, {
						"name" : $scope.name,
						"email" : $scope.email,
						"message" : $scope.message
					}).success(function(data, status) {
						console.log(data);
						$scope.status = status;
						$scope.data = data;
						$scope.result = data;
					})
				} else {

					alert('Form is not valid');
				}

			}*/

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
