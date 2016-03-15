angular.module("stockApp").controller(
		"initsetup",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {

			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			var proadminService = appEndpointSF.getproadminService();
			proadminService.getallAccountType().then(function(assetList) {
				$scope.accountlist = assetList.items.length;
				 if ($scope.accountlist == 0){
					 		proadminService.initsetup().then(function(msgBean) {
					 				$scope.showSimpleToast("setup going on");
					 				
				});	
				 }else{
					 $scope.showSimpleToast("setup allredy done");
				 }

			});

			
			
			
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
