angular
		.module("prostudyApp")
		.controller(
				"directoryViewUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					console.log("Inside directoryViewUserAccountCtr");
					
					
					$scope.selectedUserPrimaryEmail = $stateParams.selectedUserPrimaryEmail;
							
				
				$scope.cancelButton = function() {
					$state.go("gfe.directoryUserList", {});
				}
				$scope.getUserAccount = function() {											
					var request = gapi.client.directory.users.get({userKey:$scope.selectedUserPrimaryEmail});				
					request.execute(function(resp) {
						$scope.selectedUser=resp;
													
					});
				
				}
				$scope.getUserAccount();
			
				});