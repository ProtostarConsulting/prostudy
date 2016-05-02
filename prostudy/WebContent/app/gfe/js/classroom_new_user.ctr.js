angular.module("prostudyApp")
		.controller(
				"classroomNewUserCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$stateParams, $mdUtil, $log, $q, tableTestDataFactory,
						appEndpointSF, $state) {

					$scope.selectedCourseId = $stateParams.selectedCourseId;
					$scope.userType = $stateParams.userType;

					$scope.GlobalPermission = {
						'permission' : ""
					}

					$scope.name = {
						'givenName' : "",
						'familyName' : "",
						'fullName' : ""
					}

					$scope.profile = {

						'id' : "",
						'name' : $scope.name,
						'emailAddress' : "",
						'photoUrl' : "",
						'permissions' : []

					}
					$scope.tempUser = {
						'courseId' : $scope.selectedCourseId,
						'userId' : "",
						'profile' : $scope.profile
					};

					$scope.createTeacher = function() {

						$scope.tempUser.userId = $scope.profile.emailAddress;

						$log.debug("Inside $scope.tempUser .."
								+ angular.toJson($scope.tempUser));
						var request = gapi.client.classroom.courses.teachers
								.create($scope.tempUser);

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showTeacherAddedToast();
						});
					}

					$scope.createStudent = function() {
						$scope.tempUser.userId = $scope.profile.emailAddress;

						$log.debug("Inside $scope.tempUser .."
								+ angular.toJson($scope.tempUser));
						var request = gapi.client.classroom.courses.students
								.create($scope.tempUser);

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showStudentAddedToast();
						});
					}

					$scope.showTeacherAddedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Teacher Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showStudentAddedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Student Added!').position("top")
								.hideDelay(3000));
					};
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList", {});
					}

				});
