angular.module("prostudyApp").controller(
		"scheduledExamStudentListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$stateParams,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside scheduledExamStudentListCtr");

			$scope.selectedExamId = $stateParams.selectedExamId;
			$log.debug("$scope.selectedExamId : "+$scope.selectedExamId);
			$scope.getStudentsByScheduledExamID = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getStudentsByScheduledExamID(5070947627302912)
						.then(
								function(studentList) {
									$scope.scheduledExamStudentList = studentList;
																	//$log.debug("Inside $scope.scheduledExamStudentList"+angular.toJson($scope.scheduledExamStudentList));
								});
			}
			
			$scope.getStudentsByScheduledExamID();

		});