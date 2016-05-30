angular.module("prostudyApp").controller(
		"scheduledExamStudentListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$stateParams,
				$log, objectFactory, appEndpointSF) {			

			$scope.selectedExamId = $stateParams.selectedExamId;
			$scope.studentList=[];
			$scope.getStudentListByScheduledExamId = function() {

				var ScheduledStudentExamService = appEndpointSF.getScheduledStudentExamService();
				ScheduledStudentExamService.getStudentListByScheduledExamId($scope.selectedExamId)
						.then(
								function(studentList) {
									$scope.studentList = studentList.items;
									
								});
			}
						
			
			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {

					$scope.getStudentListByScheduledExamId();
					
				} else {
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}


			$scope.waitForServiceLoad();

		});