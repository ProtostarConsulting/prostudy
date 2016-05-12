angular
		.module("prostudyApp")
		.controller(
				"directoryNewUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					
					
					$scope.checkConfirmPassword = appEndpointSF
					.getUtilityService().checkConfirmPassword;
					
					$scope.currentUserDomain = $stateParams.currentUserDomain;
					
					
				$scope.tempUser={
					'id':"",
					'name': {
					 'givenName': "",
					 'familyName': ""
					},
					'primaryEmail': "",					
					'password': ""	,
					'includeInGlobalAddressList': true			
					}			
		
				$scope.cancelButton = function() {
					$state.go("gfe.directoryUserList", {});
				}
								
				$scope.showNewUserAccountAddedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'New User Account Added Successfully!').position("top")
							.hideDelay(3000));
				};
				$scope.createNewUserAccount = function() {	
					
					
					$scope.creating = true;	
					$scope.tempUser.primaryEmail=$scope.tempUser.primaryEmail+"@"+$scope.currentUserDomain;					
					var request = gapi.client.directory.users.insert($scope.tempUser);				
					request.execute(function(resp) {	
						$scope.creating = false;	
						
						$scope.tempUser={};
						$scope.showNewUserAccountAddedToast();
						$state.go("gfe.directoryUserList", {});
					});
				
				}
			
				});