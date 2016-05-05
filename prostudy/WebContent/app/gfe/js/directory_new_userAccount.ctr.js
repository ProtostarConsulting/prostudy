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
					'name': {
					 'givenName': "",
					 'familyName': ""
					},
					'primaryEmail': "",
					'password': ""				
					
					}			
		
				$scope.cancelButton = function() {
					$state.go("^", {});
				}
				$scope.createNewUserAccount = function() {											
					var request = gapi.client.directory.users.insert($scope.tempUser);				
					request.execute(function(resp) {
						
						$log.debug("resp:" + angular.toJson(resp));		
						$scope.tempUser={};
						$state.go("gfe",{});
					});
				
				}
			
				});