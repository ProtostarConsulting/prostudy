angular
		.module("prostudyApp")
		.controller(
				"directoryNewUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					console.log("Inside directoryNewUserAccountCtr");
					
					$scope.checkConfirmPassword = appEndpointSF
					.getUtilityService().checkConfirmPassword;
					
					$scope.currentClassroomUserDomain = $stateParams.currentClassroomUserDomain;
					
					
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
					var request = gapi.client.directory.users.insert($scope.tempUser);				
					request.execute(function(resp) {						
						$log.debug("resp:" + angular.toJson(resp));		
						$scope.tempUser={};
						$scope.showNewUserAccountAddedToast();
						$state.go("gfe.directoryUserList", {});
					});
				
				}
			
				});