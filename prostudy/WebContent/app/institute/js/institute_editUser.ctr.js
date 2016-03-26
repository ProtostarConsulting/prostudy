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
					$scope.currentInstID = $stateParams.currentInstID;
					$scope.selectedID = $stateParams.selectedID;
					$log.debug("$scope.selectedID :"+$scope.selectedID);
					$log.debug("$scope.currentInstID :"+$scope.currentInstID);
					$scope.user = [];
					$scope.flag1;
					$scope.role;

					$scope.getUsers = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.currentInstID)
								.then(
										function(userList) {
											$scope.users = userList;
											for (i = 0; i < $scope.users.length; i++) {
												if ($scope.selectedID == $scope.users[i].id) {
													$scope.user.push($scope.users[i]);
													$scope.role = $scope.users[i].role;
													
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

					$scope.changeRole = function() {
						
						if ($scope.curUser.role == $scope.role) {
							return $scope.flag1 = true;

						} else if ($scope.role == "Admin"
								&& $scope.curUser.role == "Teacher"
								|| $scope.curUser.role == "Student") {
							return $scope.flag1 = true;
						} 
						
						else if ($scope.role == "Student"
								&& $scope.curUser.role == "Teacher"
								|| $scope.curUser.role == "Admin") {
							return $scope.flag1 = false;
						}
						
						else if ($scope.role == "Teacher"
								&& $scope.curUser.role == "Student") {
							return $scope.flag1 = true;
						}

					}

				});
