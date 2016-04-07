angular
		.module("stockApp")
		.controller(
				"editBusiness",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $mdMedia, $mdDialog, $log,
						objectFactory, appEndpointSF) {

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					$scope.selecteduserNo = $stateParams.selecteduserNo;
					$scope.businessNo = $stateParams.businessNo;
					$scope.id;

				
					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.updateBusiness = function() {
						var setupService = appEndpointSF.getsetupService();
						var UserService = appEndpointSF.getUserService();
						setupService
								.updateBusiness($scope.curuser.business)
								.then(
										function(respbusiness) {
											UserService
													.addUser($scope.curuser)
													.then(
															function(msg) {
																$scope
																		.showSimpleToast("Business updated Sucessfully");

															});

										});
					}

				
					// ----------hide and show ---------------------------

					$scope.IsHidden = true;
					$scope.ShowHide = function() {
						$scope.IsHidden = $scope.IsHidden ? false : true;
					}
					// -----------------------------------------------------

				
					

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
