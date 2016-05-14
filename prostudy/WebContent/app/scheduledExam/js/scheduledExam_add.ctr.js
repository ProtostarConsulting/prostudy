angular
		.module("prostudyApp")
		.controller(
				"scheduledExamAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						boardList) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'ScheduledExam Saved!').position("top").hideDelay(
								3000));
					};	
					$scope.selected=[];
					$scope.tempScheduledExam = {
						examtitle : "",
						desc : "",
						startdatentime : "",
						enddatentime : "",
						instituteID : $scope.curUser.instituteID,
						listOfQuestions : []
					};
					
					
					$scope.addScheduledExam = function() {
						$scope.tempScheduledExam.listOfQuestions=$scope.selected;
						$log.debug("$scope.tempScheduledExam   :: "+angular.toJson($scope.tempScheduledExam));
						var ScheduledExamService = appEndpointSF.getScheduledExamService();

						ScheduledExamService
								.addScheduledExam($scope.tempScheduledExam)
								.then(
										function(msgBean) {
											
										});	
						$scope.showSavedToast();
						$scope.tempScheduledExam = {};
						$state.go("scheduledExam", {});
						}
					
				
					$scope.getQuestionsByInstitute = function() {

						var QuestionService = appEndpointSF.getQuestionService();
						QuestionService.getQuestionsByInstitute($scope.curUser.instituteID).then(
								function(questionsList) {
									$scope.questions = questionsList;

								});
					}

					$scope.cancelButton = function() {
						$state.go("scheduledExam", {});
					}				

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getQuestionsByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
