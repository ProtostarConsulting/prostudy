angular.module("prostudyApp").controller(
		"practiceExamResultCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter) {

			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.getPracticeExamResultbyID = function() {

				var PracticeExamService = appEndpointSF
						.getPracticeExamService();

				PracticeExamService.getPracticeExamResultbyID(
						$scope.curUser.userId).then(
						function(practiceExamResultList) {

							$scope.examResults = practiceExamResultList;

						});
			}

			$scope.getPracticeExamResultbyID();

		});// end of angular.module

