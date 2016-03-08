angular.module("stockApp").controller(
		"AssetMangementCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, 
				appEndpointSF) {
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			$scope.printempidsalslip = $stateParams.printempidsalslip;

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.Asset = {
				loggedInUser : "",
				assetName : "",
				category : "",
				value : "",
				purchasedate : "",
				expirydate : ""
			}

			$scope.addAsset = function() {
				$scope.Asset.loggedInUser = $scope.curUser;

				var assetService = appEndpointSF.getAssetManagementService();
				assetService.addAsset($scope.Asset).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg);
					// $scope.getAllemps();
				});

				$scope.Asset = {};
			}
			$scope.getallAsset = function() {
				var assetService = appEndpointSF.getAssetManagementService();
				assetService.getallAsset($scope.curUser.businessAccount.id).then(function(assetList) {
					$scope.assetlist=assetList.items;
				});

		
			}
			$scope.assetlist=[];
			$scope.getallAsset();
			
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
