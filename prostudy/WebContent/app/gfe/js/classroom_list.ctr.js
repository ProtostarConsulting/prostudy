angular
		.module("prostudyApp")
		.controller(
				"classroomCourseListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					console.log("Inside classroomtListCtr");					
					
					$scope.courseStateList	=["ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];
					$scope.courseState="ACTIVE";
					$scope.classroomCourses = [];
					$scope.courseList=[];
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
				
					$scope.listCourses = function() {
						$log.debug("Inside listCourses..");
						$scope.loading = true;
						
						var request = gapi.client.classroom.courses.list({
							pageSize : 50
						});

						request.execute(function(resp) {
							var courses = resp.courses;						

							if (courses.length > 0) {
								for (i = 0; i < courses.length; i++) {
									var course = courses[i];									
									$scope.classroomCourses.push(course);									
								}
								$scope.selectedCourseList();
							} else {
								$log.debug('No courses found.');
							}

							$scope.loading = false;
							$log.debug("Inside listCourses...Done loading...");

						});
						
					}	
					
					$scope.selectedCourseList = function() {					
					
						$scope.courseList=[];
							if ($scope.classroomCourses.length > 0) {
								for (i = 0; i < $scope.classroomCourses.length; i++) {
									
									if($scope.classroomCourses[i].courseState===$scope.courseState)
									{									
									$scope.courseList.push($scope.classroomCourses[i]);
									}
								}								
							} else {
								$log.debug('No courses found.');
							}
							

					}				
					
										
					$scope.listCourses();
					$scope.selected = [];
					$scope.query = {
						order : 'name',
						limit : 5,
						page : 1
					};

					$scope.onpagechange = function(page, limit) {
						var deferred = $q.defer();

						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};

					$scope.onorderchange = function(order) {
						var deferred = $q.defer();

						$timeout(function() {
							deferred.resolve();
						}, 2000);

						return deferred.promise;
					};

					$scope.deleteCourse = function(courseId) {						
						
						var request = gapi.client.classroom.courses.delete({id:courseId});

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showCourseDeletedToast();
							$scope.loading = true;
							$scope.classroomCourses=[];
							$scope.selected = [];
							$scope.searchName="";
							$scope.listCourses();
						});
					}
					
					$scope.changeCourseState = function(courseState) {
						$log.debug("$scope.selected[0] : "+ angular.toJson($scope.selected[0]));
						$scope.tempCourse=$scope.selected[0];
						$scope.tempCourse.courseState=courseState;
						
						$log.debug("tempCourse : "+angular.toJson($scope.tempCourse));
						
						var request = gapi.client.classroom.courses.update($scope.tempCourse);
						
						request.execute(function(resp) {							
							$scope.showCourseStateChangedToast();
							$state.go("gfe.classroomCourseList",{});
							
						});
					}						
					
					$scope.showCourseStateChangedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Selected Course State Changed!').position("top").hideDelay(
								3000));
					};
					$scope.showCourseDeletedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Selected Course Deleted!').position("top").hideDelay(
								3000));
					};
				});