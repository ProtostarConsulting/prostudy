angular.module("stockApp").controller(
		"setup",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, appEndpointSF) {
		
			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};
			$scope.selecteduserNo = $stateParams.selecteduserNo;
			$scope.id;

			$scope.business={
					businessName:"",
					adminEmailId:"",
					adminFirstName:"",
					adminLastName:""
						
			}
			$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();

			$scope.getCurUserByEmailId = function() {
				var setupService = appEndpointSF.getsetupService();
				setupService.getCurUserByEmailId($scope.curuser.email_id).then(
						function(user) {
							$scope.business = user.items[0].businessAccount;
							$scope.id = $scope.business.id;
							$log.debug("$scope.business.id"+ $scope.business.id);
						});
			}
			
			$scope.getCurUserByEmailId();

			$scope.updateBusiness = function() {
				var setupService = appEndpointSF.getsetupService();
				setupService.updateBusiness($scope.business).then(
						function(msgBean) {
							$scope.showSimpleToast(msgBean);
						});
			}

			$scope.getAllUserOfOrg = function() {
				var setupService = appEndpointSF.getsetupService();
				if (typeof $scope.id != 'undefined') {
				setupService.getAllUserOfOrg($scope.curuser.businessAccount.id).then(function(users) {
					$scope.userslist = users.items;

				});
				}
			}
			
			$scope.userslist = [];
			$scope.getAllUserOfOrg();

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
