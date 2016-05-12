angular
		.module("prostudyApp")
		.controller(
				"classroomCourseViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {
					
					$scope.selectedCourseId=$stateParams.selectedCourseId;
					$scope.courseStateList	=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];
					
					$scope.loading = false;	
					
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
						$scope.loading = true;	
						var request = gapi.client.classroom.courses.get({
							id : $scope.selectedCourseId					
								});
					
						request.execute(function(resp) {
							$scope.tempCourse = resp.result;
							$scope.loading = false;								
						});
					}	
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList",{});
					}
			
					$scope.getCourse();
				});

