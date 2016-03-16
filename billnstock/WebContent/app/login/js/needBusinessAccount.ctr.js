angular.module("stockApp").controller(
		"needBusinessAccountCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $state) {

			$scope.showSavedToast = function(msg) {
				$mdToast.show($mdToast.simple().content(msg).position("top")
						.hideDelay(3000));
			};

			// ////////////////////////////////////////////////////////////////////////////////

			$scope.curuser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.business = {
				businessName : "",
				adminGmailId : $scope.curuser.email_id,
				adminFirstName : $scope.curuser.firstName,
				adminLastName : $scope.curuser.lastName,
				accounttype:""
			}

			$scope.addBusiness = function() {
				var UserService = appEndpointSF.getUserService();
				UserService.getBusinessByEmailID($scope.business.adminGmailId).then(function(assetList) {
					$scope.user = assetList;
					 if (typeof $scope.user.adminGmailId === 'undefined'){
						 
					 
				var proadminService = appEndpointSF.getproadminService();
				proadminService.getAccountTypeById($scope.accounttype).then(
						function(assetList) {
							$scope.business.accounttype = assetList.result;
				
									var UserService = appEndpointSF.getUserService();
										UserService.addBusiness($scope.business).then(
												function(msgBean) {
													$scope.showSavedToast(msgBean.msg);
													$state.go("login");
												});
						});
					}else{
				
				angular.element('#adminGmailId').focus();
					}	
						 
					});
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