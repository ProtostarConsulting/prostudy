angular
		.module("prostudyApp")
		.controller(
				"classroomCourseViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {
					
					$scope.selectedCourseId=$stateParams.selectedCourseId;
					$scope.courseStateList	=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];
					
					$scope.tempCourse = {
							'name' : "",
							'section' : "",
							'descriptionHeading' : "",
							'description' : "",
							'room' : "",
							'ownerId' : "me",
							'enrollmentCode' : "",
							'courseState':"",
							'alternateLink' : ""
						};
										
					$scope.getCourse = function() {											
						var request = gapi.client.classroom.courses.get({
							id : $scope.selectedCourseId					
								});
					
						request.execute(function(resp) {
							$scope.tempCourse = resp.result;
														
						});
					}	
					$scope.cancelButton = function() {
						$state.go("^", {});
					}
			
					$scope.getCourse();
				});

