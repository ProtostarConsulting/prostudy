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
				
				var UserService = appEndpointSF.getUserService();
				UserService.getBusinessByEmailID($scope.business.adminGmailId).then(function(assetList) {
					$scope.user = assetList;
					 if (typeof $scope.user.adminGmailId === 'undefined'){
				
				var proadminService = appEndpointSF.getproadminService();
					proadminService.getAccountTypeById($scope.accounttype).then(
							function(accounttyperecord) {
								$scope.business.accounttype = accounttyperecord.result;
				
								var UserService = appEndpointSF.getUserService();
									UserService.addNewBusiness($scope.business).then(
											function(msgBean) {
												$scope.showSimpleToast(msgBean.msg);
												$state.go("login");
						});
					});
				}else{
			
			angular.element('#adminGmailId').focus();
				}	
					 
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
			
		
			
			/////////////////Checkemail
				$scope.Checkemail=function(emailid){
					var UserService = appEndpointSF.getUserService();
					UserService.getBusinessByEmailID(emailid).then(function(assetList) {
						$scope.user = assetList;
						 if (typeof $scope.user.adminGmailId != 'undefined'){
							 $scope.userexists="user already exists"
							/*$scope.usediffemail="checked";*/
						 }else{
							 $scope.userexists="";
						 }
						
					});
					
					}
				$scope.user;
				$scope.userexist="";
				/*$scope.usediffemail="unchecked";*/
			
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