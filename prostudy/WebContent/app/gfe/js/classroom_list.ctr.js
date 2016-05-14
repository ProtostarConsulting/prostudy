angular
		.module("prostudyApp")
		.controller(
				"classroomCourseListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,$mdDialog,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
										
					
					$scope.courseStateList	=["ACTIVE","ARCHIVED","PROVISIONED","DECLINED" ];
					$scope.courseState="ACTIVE";
					$scope.classroomCourses = [];
					$scope.courseList=[];
					$scope.flag = true;
					$scope.tempCourse = {
							'name' : "",
							'section' : "",
							'descriptionHeading' : "",
							'description' : "",
							'room' : "",
							'ownerId' : "me",
							'enrollmentCode' : "",
							'courseState': " ",
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

					$scope.deleteCourse = function(courseId,ev) {							
						
						var confirm = $mdDialog.confirm().title(
						'Are you sure you want to delete this Course ?').ariaLabel('Lucky day')
						.targetEvent(ev).ok('YES').cancel('NO');
						$mdDialog.show(confirm).then(function() {
					

					$scope.flag = false;
					$scope.loading = true;
					$scope.selected = [];
					$scope.deleting = true;
					var request = gapi.client.classroom.courses.delete({id:courseId});

					request.execute(function(resp) {
						$log.debug("resp:" + angular.toJson(resp));
						$scope.showCourseDeletedToast();
					
						$scope.deleting = false;
						$scope.classroomCourses=[];
						
						$scope.searchName="";
						$scope.listCourses();
					});
					
					
					
				}, function() {							
					
				});
				
						
					}				
				
					
					$scope.changeCourseState = function(courseState,ev) {
						
						var confirm = $mdDialog.confirm().title(
						'Are you sure you want to change Course State ?').ariaLabel('Lucky day')
						.targetEvent(ev).ok('YES').cancel('NO');
						$mdDialog.show(confirm).then(function() {
					
					$scope.selected[0].courseState=courseState;
					$scope.tempCourse=angular.toJson($scope.selected[0]);
				
					var request = gapi.client.classroom.courses.update({id:$scope.selected[0].id},$scope.tempCourse);
					
					request.execute(function(resp) {
						
						$scope.showCourseStateChangedToast();
						$state.go("gfe.classroomCourseList",{});
						
					});
					
					
				}, function() {							
					
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