angular
		.module("prostudyApp")
		.controller(
				"classroomCourseUserListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $stateParams, tableTestDataFactory, appEndpointSF) {
					
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					
					$scope.userType = "";
					$scope.userList = [];
					$scope.selected=[];
					
					$scope.selectedCourseId = $stateParams.selectedCourseId;
					$scope.userType = $stateParams.userType;
					
					$scope.authorized = false;
					$scope.loading = false;
					
					$scope.viewClassTeachers = function() {
						
						$scope.userType = "Teacher";
						var request = gapi.client.classroom.courses.teachers
								.list({
									courseId : $scope.selectedCourseId,
									pageSize : 20
								});

						request.execute(function(resp) {
							$scope.userList = resp.result.teachers?resp.result.teachers:[];
							$log.debug("resp:" + angular.toJson(resp));
						});
					}

					
					
					$scope.viewClassStudents = function() {
						
						$scope.userType = "Student";
						var request = gapi.client.classroom.courses.students
								.list({
									courseId : $scope.selectedCourseId,
									pageSize : 200
								});

						request.execute(function(resp) {
							$scope.userList = resp.result.students?resp.result.students:[];
							$log.debug("resp:" + angular.toJson(resp));
						});
					}
					$scope.deleteUser = function(courseId,userId,userType) {
						
						if(userType==="Teacher")
						{
							
						var request = gapi.client.classroom.courses.teachers.delete({
									courseId : courseId,
									userId : userId
								});

						}
						else if(userType==="Student")
							{
							
							var request = gapi.client.classroom.courses.students.delete({
								courseId : courseId,
								userId : userId
							});
							}
						request.execute(function(resp) {
							$scope.showSavedToast();
							$log.debug("resp:" + angular.toJson(resp));
						});
					}

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'User Deleted!').position("top")
								.hideDelay(3000));
					};

					if($scope.userType == "Teacher")
						$scope.viewClassTeachers();
					else
						$scope.viewClassStudents();
					
					
					// Table generic functions
				
					$scope.query = {
						order : 'fullName',
						limit : 10,
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

				});