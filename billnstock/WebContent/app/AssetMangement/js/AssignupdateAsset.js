angular.module("stockApp").controller(
		"AssignupdateAsset",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			$scope.selectedasetNo = $stateParams.selectedasetNo;

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

		
			
			$scope.getselectedasset = function() {
				var assetService = appEndpointSF.getAssetManagementService();
				if (typeof $scope.selectedasetNo != "undefined") {
					assetService.getselectedasset($scope.selectedasetNo).then(
							function(assetdetail) {
								$scope.asset = assetdetail.result;
							});
				}
			}
			$scope.asset=[];
			$scope.getselectedasset();

			$scope.updateAsset=function(){
			var assetService = appEndpointSF.getAssetManagementService();
				assetService.updateAsset($scope.asset).then(function(msgBean) {
					$scope.showSimpleToast(msgBean.msg);
					
				});
			}
			
			
			$scope.getAllemps = function() {
				$log.debug("Inside Ctr $scope.getAllemps");
				var hrService = appEndpointSF.gethrService();

				hrService.getAllemp($scope.curUser.businessAccount.id).then(function(empList) {
					$log.debug("Inside Ctr getAllemps");
					$scope.emps = empList.items;
					
			});
			}
			
			$scope.emps = [];
		$scope.getAllemps();
		
		$scope.Assignasset={
				assetEntity:"",
				userEntity:"",
					qty:""
		}
		
		
			
		$scope.AssignAsset=function(){
			$log.debug("id======="+$scope.user);
			$scope.Assignasset.assetEntity=$scope.asset;
			var setupService = appEndpointSF.getsetupService();
				setupService.getuserById($scope.user).then(
						function(userList) {
							$log.debug("Inside Ctr getAllleads");
							$scope.userL = userList.result;
							$scope.Assignasset.userEntity=$scope.userL;
						
						var assetService = appEndpointSF.getAssetManagementService();
							
						assetService.addAssignAsset($scope.Assignasset).then(function(msgBean) {
								$scope.showSimpleToast(msgBean.msg);
								
							});
						
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
