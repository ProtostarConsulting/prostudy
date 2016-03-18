angular.module("prostudyApp").controller(
		"studentViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,$state,
				appEndpointSF,$stateParams) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!')
						.position("top").hideDelay(3000));
			};
					   
			
			$scope.selectedID = $stateParams.selectedID;
			$scope.student = [];
			
			$scope.getStudents = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.curUser.instituteID)
						.then(
								function(studentList) {
									$scope.Students = studentList;
									for(i=0;i<$scope.Students.length;i++)
										{
											if($scope.selectedID == $scope.Students[i].id)
												{
													$scope.student.push($scope.Students[i]);
												}
										}
									
								});
			}
			$scope.getStudents();
			
			$scope.cancel = function() {
				$state.go("^", {});
			}
			
			
			

		});
