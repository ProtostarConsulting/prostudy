angular.module("prostudyApp").controller(
		"scheduledExamStudentListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$stateParams,
				$log, objectFactory, appEndpointSF) {			

			$scope.selectedExamId = $stateParams.selectedExamId;
			
			$scope.getStudentsByScheduledExamID = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getStudentsByScheduledExamID($scope.selectedExamId)
						.then(
								function(studentList) {
									$scope.scheduledExamStudentList = studentList;
									
								});
			}
						
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					$scope.getStudentsByScheduledExamID();
					
				} else {
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}


			$scope.waitForServiceLoad();

		});