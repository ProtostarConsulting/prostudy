angular
		.module("prostudyApp")
		.controller(
				"userEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,
						tableTestDataFactory, $state, appEndpointSF,
						$stateParams) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Student Updated!').position("top").hideDelay(
								3000));
					};

					$scope.selectedID = $stateParams.selectedID;
					$scope.user = [];

					$scope.getUsers = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.curUser.instituteID)
								.then(
										function(userList) {
											$scope.users = userList;
											for (i = 0; i < $scope.users.length; i++) {
												if ($scope.selectedID == $scope.users[i].id) {
													$scope.user.push($scope.users[i]);
												}
											}

										});
					}
					$scope.getUsers();
					
					
					$scope.updateUser = function() {
						
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.user[0]).then(
								function(msgBean) {
									
									$scope.showSavedToast();
									$state.go("^", {});
								});

					}
					
					$scope.cancel = function() {
						$state.go("^", {});
					}
					
					
				});
