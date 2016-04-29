angular
		.module("prostudyApp")
		.controller(
				"classroomViewUserCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {

					$scope.selectedUserId = $stateParams.selectedUserId;					
					$scope.selectedCourseId=$stateParams.selectedCourseId;
					$scope.userType=$stateParams.userType;
					
					$scope.permissionList=["PERMISSION_UNSPECIFIED","CREATE_COURSE"];
			
					$scope.getCourseTeacher = function() {											
						var request = gapi.client.classroom.courses.teachers.get({
							courseId : $scope.selectedCourseId,
							userId : $scope.selectedUserId
								});
					
						request.execute(function(resp) {
							$scope.user = resp.result;
							$log.debug("$scope.teacher:" + angular.toJson($scope.user));							
						});
					}
					
					$scope.getCourseStudent = function() {											
						var request = gapi.client.classroom.courses.students.get({
							courseId : $scope.selectedCourseId,
							userId : $scope.selectedUserId
								});
					
						request.execute(function(resp) {
							$scope.user = resp.result;
							$log.debug("$scope.student:" + angular.toJson($scope.user));							
						});
					}
					if($scope.userType=="Teacher")
						{
						$scope.getCourseTeacher();
						}
					else if($scope.userType=="Student")
						{
						$scope.getCourseStudent();
						}
					
					$scope.cancelButton = function() {
						$state.go("^", {});
					}

					
				});

