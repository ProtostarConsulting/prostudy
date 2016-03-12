angular.module("stockApp").controller(
		"newBusinessAccountCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.showSimpleToast = function(msgBean) {
				$mdToast.show($mdToast.simple().content(msgBean)
						.position("top").hideDelay(3000));
			};

			//////////////////////////////////////////////////////////////////////////////////

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.business = {
				businessName : "",
				adminGmailId : "",
				adminFirstName : "",
				adminLastName : "",
				password : "",
				isGoogleUser : true,
				accounttype:""
			}

			$scope.addBusiness = function() {
				
				var proadminService = appEndpointSF.getproadminService();
					proadminService.getAccountTypeById($scope.accounttype).then(
							function(assetList) {
								$scope.business.accounttype = assetList.result;
				
								var UserService = appEndpointSF.getUserService();
									UserService.addNewBusiness($scope.business).then(
											function(msgBean) {
												$scope.showSimpleToast(msgBean.msg);
												$state.go("login");
						});
					});
							
				
			}
			$scope.condition = function() {
				if ($scope.business.isGoogleUser == false) {
					return true;
				} else {
					return false
				}
			}
			
			
			
	/* get Account Type */
			
			$scope.getallAccountType = function() {
				var proadminService = appEndpointSF.getproadminService();
				proadminService.getallAccountType().then(function(assetList) {
					$scope.accountlist = assetList.items;
				});
			}
			$scope.accountlist = [];
			$scope.getallAccountType();
			
		

			// //////////////////////////////////////////////////////////////////////////////

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