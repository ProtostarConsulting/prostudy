angular.module("stockApp").controller(
		"AddAccountType",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			$scope.typeid = $stateParams.typeid;

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.AccountType = {
				/*loggedInUser : "",*/
				accountName : "",
				description : "",
				maxuser : "",
				paymentDesc : ""
			}

			$scope.addAccountType = function() {
				/*$scope.AccountType.loggedInUser = $scope.curUser;*/
				var proadminService = appEndpointSF.getproadminService();
				proadminService.addAccountType($scope.AccountType).then(
						function(msgBean) {
							$scope.showAddToast();

						});
				$scope.AccountTypeForm.$setPristine();
				  $scope.AccountTypeForm.$setValidity();
				  $scope.AccountTypeForm.$setUntouched();
				$scope.AccountType = {};
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
