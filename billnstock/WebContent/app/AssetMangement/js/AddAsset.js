angular.module("stockApp").controller(
		"AddAsset",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			$scope.printempidsalslip = $stateParams.printempidsalslip;

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.Asset = {
					business:"",
				loggedInUser : "",
				assetName : "",
				category : "",
				value : "",
				purchasedate : new Date,
				expirydate : new Date
			}

			$scope.addAsset = function() {
				$scope.Asset.loggedInUser = $scope.curUser;
				$scope.Asset.business=$scope.curUser.business;
				var assetService = appEndpointSF.getAssetManagementService();
				assetService.addAsset($scope.Asset).then(function(msgBean) {
						$scope.showAddToast();
				});

				$scope.Asset = {};
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
