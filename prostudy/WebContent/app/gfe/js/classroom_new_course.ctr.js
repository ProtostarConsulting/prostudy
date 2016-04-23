angular
		.module("prostudyApp")
		.controller(
				"classroomNewCourseCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF,$state) {

					
					$scope.courseState=["COURSE_STATE_UNSPECIFIED","ACTIVE","ARCHIVED","PROVISIONED","DECLINED"];
					
					$scope.tempCourse = {
						'name' : "",
						'section' : "",
						'descriptionHeading' : "",
						'description' : "",
						'room' : "",
						'ownerId' : "me",
						'enrollmentCode' : "",
						'courseState':"PROVISIONED",
						'alternateLink' : ""
					};
					
					$scope.createCourse = function() {
						

						var request = gapi.client.classroom.courses
								.create($scope.tempCourse);

						request.execute(function(resp) {
						
							$scope.showSavedToast();
							$state.go("gfe.classroomCourseList",{});
							//$scope.sendEmailMessage();
						});
					}

					/*	$scope.currentUser = null;

					$scope.getCurrentUser = function() {
						var request = gapi.client.plus.people.get({
							'userId' : 'me'
						});
						request.execute(function(resp) {
							$scope.currentUser = resp;
							console.log('Retrieved profile for:'
									+ resp.displayName);
						});
					}

					$scope.getCurrentUser();

					$scope.sendEmailMessage = function() {
						$log.debug("$scope.currentUser:" + $scope.currentUser);
						var base64EncodedEmail = btoa("Course is created in the Classroom app by you. Course Name:"
								+ $scope.tempCourse.name);
						
					
						var request = gapi.client.gmail.users.messages
								.send({
									'userId' : "info@protostar.co.in",
									'message' : {
										'raw' : base64EncodedEmail
									}
								});
						request.execute(function(resp) {
							$log.debug("Send Emnail resp:"
									+ angular.toJson(resp));

						});
					}*/
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Course Saved!').position("top").hideDelay(
								3000));
					};

				});

