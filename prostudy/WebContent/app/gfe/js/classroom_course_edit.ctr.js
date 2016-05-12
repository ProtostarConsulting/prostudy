angular
		.module("prostudyApp")
		.controller(
				"classroomCourseEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$stateParams,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {
					
					$scope.selectedCourseId=$stateParams.selectedCourseId;
					$scope.courseStateList	=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];
					
					$scope.loading = false;	
					$scope.updating = false;
					$scope.flag = true;
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
					
				
					$scope.updateCourse = function() {
						$scope.flag = false;
						$scope.loading = true;	
						$scope.updating = true;						
						var request = gapi.client.classroom.courses.update($scope.tempCourse);
						request.execute(function(resp) {							
							$scope.showSavedToast();
							$scope.loading = false;	
							$scope.updating = false;
							$state.go("gfe.classroomCourseList",{});
							
						});
					}					
					
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Course Updated Successfully!').position("top").hideDelay(
								3000));
					};
					$scope.cancelButton = function() {
						$state.go("gfe.classroomCourseList", {});
					}
			
					$scope.getCourse();
				});

