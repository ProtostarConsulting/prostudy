angular
		.module("prostudyApp")
		.controller(
				"classroomNewUserCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {		
					
					
					$scope.selectedCourseId = $stateParams.selectedCourseId;					
					$scope.userType = $stateParams.userType;
					
					$scope.permissionList=["PERMISSION_UNSPECIFIED","CREATE_COURSE"];
					
					$scope.name={
						  'givenName': "",
						  'familyName': "",
						  'fullName':""
						}

					$scope.profile={

							'id' : "",
							'name' : $scope.name,
							'emailAddress' : ""	,
							'photoUrl':"",
							'permissions':""		
							
					}
					$scope.tempUser = {
						'courseId' : $scope.selectedCourseId,
						'userId' : "",
						'profile' : $scope.profile
					};					
				
				
					$scope.createTeacher = function() {
						
						$scope.tempUser.userId=$scope.profile.emailAddress;					
						$scope.tempUser.profile.name.fullName=$scope.name.givenName+" "+$scope.name.familyName;
						
						$scope.tempUser.profile.permissions=$scope.pp;
						$log.debug("Inside $scope.tempUser .."+angular.toJson($scope.tempUser));
						var request = gapi.client.classroom.courses.teachers.create($scope.tempUser);

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showSavedToast();
							$log.debug("After createUser..");				
						});
					}

					$scope.createStudent = function() {
						
						$log.debug("Inside createStudent..");
						$scope.tempUser.profile.name.fullName=$scope.name.givenName+" "+$scope.name.familyName;
						$scope.tempUser.userId=$scope.profile.emailAddress;
						$log.debug("Inside $scope.tempUser .."+angular.toJson($scope.tempUser));
						var request = gapi.client.classroom.courses.students.create($scope.tempUser);

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showSavedToast();
							$log.debug("After createStudent..");				
						});
					}
					
			
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Course Saved!').position("top").hideDelay(
								3000));
					};
					

				});

