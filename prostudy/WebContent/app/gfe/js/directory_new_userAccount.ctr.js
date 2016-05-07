angular
		.module("prostudyApp")
		.controller(
				"directoryNewUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					console.log("Inside directoryNewUserAccountCtr");
					
					$scope.checkConfirmPassword = appEndpointSF
					.getUtilityService().checkConfirmPassword;
					
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
				$scope.createNewUserAccount = function() {											
					var request = gapi.client.directory.users.insert($scope.tempUser);				
					request.execute(function(resp) {						
						$log.debug("resp:" + angular.toJson(resp));		
						$scope.tempUser={};
						$state.go("gfe.directoryUserList", {});
					});
				
				}
			
				});