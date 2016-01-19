angular.module("prostudyApp").controller(
		"studentListPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, appEndpointSF) {
			console.log("Inside studentListPageCtr");

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.getStudent = function() {

				var studentService = appEndpointSF.getStudentService();

				studentService.getStudents().then(function(studList) {
					$log.debug("Inside Ctr getStudents");
					$scope.students = studList;
				});
			}

			$scope.getStudent();

		});