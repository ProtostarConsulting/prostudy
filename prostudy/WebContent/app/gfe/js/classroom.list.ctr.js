angular
		.module("prostudyApp")
		.controller(
				"classroomCourseListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
					console.log("Inside classroomtListCtr");					
					
					$scope.classroomCourses = [];					
				
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
							} else {
								appendPre('No courses found.');
							}

							$scope.loading = false;
							$log.debug("Inside listCourses...Done loading...");

						});
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
						
						$log.debug("Inside deleteCourse .."+courseId);
						var request = gapi.client.classroom.courses.delete({id:courseId});

						request.execute(function(resp) {
							$log.debug("resp:" + angular.toJson(resp));
							$scope.showSavedToast();
						});
					}
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Slected Course Deleted!').position("top").hideDelay(
								3000));
					};
				});