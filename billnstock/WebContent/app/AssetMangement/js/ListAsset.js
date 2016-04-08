angular.module("stockApp").controller(
		"ListAsset",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			$scope.printempidsalslip = $stateParams.printempidsalslip;

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();


			$scope.getallAsset = function() {
				var assetService = appEndpointSF.getAssetManagementService();
				assetService.getallAsset($scope.curUser.business.id)
						.then(
								function(assetList) {
									$scope.assetlist = $scope
											.initDateFields(assetList.items);
								});

			}

			$scope.initDateFields = function(assetlist) {
				for (var asset in assetlist) {
					asset.purchasedate = new Date(asset.purchasedate);
					asset.expirydate = new Date(asset.expirydate);
				}
				return assetlist;
			}

			$scope.assetlist = [];
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					$scope.getallAsset();
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

		});
