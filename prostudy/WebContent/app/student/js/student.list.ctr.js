angular.module("prostudyApp").controller(
		"studentListPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, appEndpointSF) {
			console.log("Inside studentListPageCtr");

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};
			$scope.query = {
					order : 'description',
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
			
			
			$scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
			$scope.students = [];
		
			$scope.getStudentsByInstitute = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.curUser.instituteID)
						.then(
								function(studentList) {
									$scope.newStudents = studentList;
									
									for(var i=0;i<$scope.newStudents.length;i++)
									{
										if($scope.newStudents[i].role == "Student")
										{
											$scope.students.push($scope.newStudents[i]);
											;
											
										}
									}		
											
									
								});
			}
			$scope.getStudentsByInstitute();
			
			
		});