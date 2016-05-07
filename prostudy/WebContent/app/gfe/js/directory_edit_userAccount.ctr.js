angular
		.module("prostudyApp")
		.controller(
				"directoryEditUserAccountCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					console.log("Inside directoryEditUserAccountCtr");
					
					$scope.checkConfirmPassword = appEndpointSF.getUtilityService().checkConfirmPassword;					
					$scope.selectedUser = $stateParams.selectedUser;					
					
					$scope.cancelButton = function() {
						$state.go("gfe.directoryUserList", {});
					}
					//{userKey:$scope.selectedUser.primaryEmail}
				$scope.updateUser = function() {					
					$log.debug("$scope.selectedUser.primaryEmail"+$scope.selectedUser.primaryEmail);
					var request = gapi.client.directory.users.update({userKey:$scope.selectedUser.primaryEmail},$scope.selectedUser);

					request.execute(function(resp) {
						$log.debug("resp:" + angular.toJson(resp));
						$scope.showUserUpdatedToast();
						$state.go("gfe.directoryUserList", {});
					});
				}
				$scope.showUserUpdatedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'Selected User Updated Successfully!').position("top")
							.hideDelay(3000));
				};
			
				});