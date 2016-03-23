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

	
			
			$scope.business = {
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

			$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();

			/*$scope.getCurUserByEmailId = function() {
				var setupService = appEndpointSF.getsetupService();
				setupService.getCurUserByEmailId($scope.curuser.email_id).then(
						function(user) {
							$scope.business = user.items[0].businessAccount;
							$scope.id = $scope.business.id;
							$log.debug("$scope.business.id"+ $scope.business.id);
						});
			}
			
			$scope.getCurUserByEmailId();*/

			$scope.updateBusiness = function() {
				var setupService = appEndpointSF.getsetupService();
				var UserService = appEndpointSF.getUserService();
				
				$scope.business.businessName=$scope.curuser.businessAccount.businessName;
				$scope.business.accounttype=$scope.curuser.businessAccount.accounttype;
				$scope.business.address1=$scope.curuser.businessAccount.address1;
				$scope.business.address2=$scope.curuser.businessAccount.address2;
				$scope.business.registerDate=$scope.curuser.businessAccount.registerDate;
				$scope.business.id=$scope.curuser.businessAccount.id;
				
				setupService.updateBusiness($scope.business).then(
						function(respbusiness) {
							
							$scope.userEntity.businessAccount=respbusiness.result;
							$scope.userEntity.authority.push("admin");
							$scope.userEntity.email_id=$scope.curuser.email_id;
							$scope.userEntity.firstName=$scope.curuser.firstName
							$scope.userEntity.lastName=$scope.curuser.lastName
							$scope.userEntity.id=$scope.curuser.id							
							UserService.addUser($scope.userEntity).then(function(msg){
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
