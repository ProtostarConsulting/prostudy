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

	
			
			/*$scope.business = {
					businessName : "",
					accounttype:"",
						address1:"",
						address2:"",
						registerDate:""
				}
				$scope.userEntity={
						businessAccount:"",
						email_id : "",
						firstName : "",
						lastName : "",	
						authority:[],
						isGoogleUser:true
				}	
*/
			$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();

			$scope.updateBusiness = function() {
				var setupService = appEndpointSF.getsetupService();
				var UserService = appEndpointSF.getUserService();
				setupService.updateBusiness($scope.curuser.businessAccount).then(
						function(respbusiness) {
							UserService.addUser($scope.curuser).then(function(msg){
						    $scope.showSimpleToast("Business updated Sucessfully");
							
							});
							
							
						});
			}

			$scope.getAllUserOfOrg = function() {
				var setupService = appEndpointSF.getsetupService();
				if (typeof $scope.curuser.businessAccount.id != 'undefined') {
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
