angular
		.module("prostudyApp")
		.controller(
				"scheduledUserQuesAnsViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {


					$scope.selectedResultId = $stateParams.selectedResultId;
				
					$scope.selectedExamId = $stateParams.selectedExamId;
					$scope.selectedEmailId = $stateParams.selectedEmailId;
					
					
					$scope.flag = $stateParams.flag;

					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.userAnsList = []; // {qID, userOption}
					$scope.correctAns = [];
					$scope.score = 0;
					$scope.totalLength;
					$scope.answeredLength;
					$scope.remainingLength;

					$scope.selected = [];
					$scope.Test = [];
					$scope.examResults = [];
					$scope.options = [];
					$scope.newQues = [ {
						qId : ""
					} ];

					$scope.showselectedExam = function() {
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();

						ScheduledExamService
								.getScheduledExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.Test = practiceTest;
											
											$scope.Test.listOfQuestion.description = $sce
													.trustAsHtml($scope.Test.listOfQuestion.description);
											$scope.newQues = $scope.Test.listOfQuestion;
											$scope.totalLength = $scope.Test.listOfQuestion.length;

											$scope.newQues[0].qId = 1;
											for (var i = 1; i < $scope.newQues.length; i++) {

												$scope.newQues[i].qId = $scope.newQues[i - 1].qId + 1;

											}

										});

					}

					$scope.getScheduledExamResultbyID = function() {

						var ScheduledExamResultService = appEndpointSF
								.getScheduledExamResultService();

						ScheduledExamResultService
								.getScheduledExamResultbyID(
										$scope.selectedResultId)
								.then(
										function(scheduledExamResultList) {

											$scope.examResults = scheduledExamResultList;											
											$scope.answeredLength = $scope.examResults.userAns.length;											

										});
					}
				/*	$scope.getScheduledExamResultbyEmail = function() {

						var ScheduledExamResultService = appEndpointSF
								.getScheduledExamResultService();

						ScheduledExamResultService
								.getScheduledExamResultbyEmail(	$scope.selectedEmailId)
								.then(
										function(scheduledExamResultList) {

											$scope.examResults = scheduledExamResultList;
											$log.debug("$$$$$$$$$$$$$$$$$$$$$" +angular.toJson($scope.examResults));
										});
					}*/
					
					//$scope.getScheduledExamResultbyEmail();
					$scope.getScheduledExamResultbyID();
					$scope.showselectedExam();

					$scope.cancelButton = function() {						
							$state.go("scheduledExam",{});					

					}

				});
