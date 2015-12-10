angular.module("prostudyApp").controller(
		"addMyPracticeExamCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter, $stateParams) {

			$log.debug("Inside myPracticeExamCtr");
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Added into MyPracticeExam!').position("top")
						.hideDelay(3000));
			};

			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();

			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedMyExamId:",
					$stateParams.selectedMyExamId);

			$scope.selectedMyExamId = $stateParams.selectedMyExamId;

			$scope.showselectedExam = function() {
				var PracticeExamService = appEndpointSF
						.getPracticeExamService();

				PracticeExamService
						.getPracticeExamById($scope.selectedMyExamId).then(
								function(practiceTest) {
									$scope.TestSelected = practiceTest[0];

								});

			}
			$scope.showselectedExam();

			$scope.addMyPracticeExam = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.addMyPracticeExam(
						UserService.getExamId($scope.selectedMyExamId)).then(
						function() {
							$log.debug("No6");
							$log.debug("Inside Ctr addMyPracticeExam");

							$scope.showSavedToast();

						});
				$log.debug("No4");
			}

		});
