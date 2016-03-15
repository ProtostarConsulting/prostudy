angular.module("stockApp").controller(
		"proadminctr",
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
							$scope.showSimpleToast(msgBean.msg);

						});

				$scope.AccountType = {};
			}

			$scope.getallAccountType = function() {
				var proadminService = appEndpointSF.getproadminService();
				proadminService.getallAccountType().then(function(assetList) {
					$scope.accountlist = assetList.items;
				});
			}
			$scope.accountlist = [];
			$scope.getallAccountType();

			$scope.getAccountTypeById = function() {
				var proadminService = appEndpointSF.getproadminService();
				if (typeof $scope.typeid != 'undefined') {
					proadminService.getAccountTypeById($scope.typeid).then(
							function(assetList) {
								$scope.accounttype = assetList.result;
							});
				}
			}
			$scope.accounttype = [];
			$scope.getAccountTypeById();

			$scope.updateAccountType = function() {
				$scope.AccountType.loggedInUser = $scope.curUser;

				var proadminService = appEndpointSF.getproadminService();
				proadminService.updateAccountType($scope.accounttype).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean.msg);

						});
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
