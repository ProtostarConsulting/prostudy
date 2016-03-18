angular
		.module("prostudyApp")
		.controller(
				"studentEditCtr",
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
					$scope.student = [];

					$scope.getStudents = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.curUser.instituteID)
								.then(
										function(studentList) {
											$scope.Students = studentList;
											for (i = 0; i < $scope.Students.length; i++) {
												if ($scope.selectedID == $scope.Students[i].id) {
													$scope.student.push($scope.Students[i]);
												}
											}

										});
					}
					$scope.getStudents();
					
					
					$scope.updateUser = function() {
						
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.student[0]).then(
								function(msgBean) {
									
									$scope.showSavedToast();
									$state.go("^", {});
								});

					}
					
					$scope.cancel = function() {
						$state.go("^", {});
					}
					
					
				});
