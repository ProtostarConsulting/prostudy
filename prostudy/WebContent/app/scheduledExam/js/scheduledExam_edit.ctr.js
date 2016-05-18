angular
		.module("prostudyApp")
		.controller(
				"editScheduledExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {
					$scope.checked = "false";
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Updated!').position("top")
								.hideDelay(3000));
					};

				
					
					$scope.flag = true;

					$scope.selectedExamId = $stateParams.selectedExamId;

					$scope.showselectedExam = function() {
						var ScheduledExamService = appEndpointSF.getScheduledExamService();

						ScheduledExamService.getScheduledExamById($scope.selectedExamId).then(
										function(ScheduledTest) {
											$scope.Test = ScheduledTest;

											if ($stateParams.addFlag) {
												if ($stateParams.addedQ !== undefined) {

													if (typeof $scope.Test.questions === 'undefined')
														$scope.Test.questions = [];

													$scope.Test.questions.push($stateParams.addedQ);
													$scope.updateExam();
												}
											}

											if ($stateParams.editFlag) {

												if ($stateParams.updatedQ !== undefined) {

													for (var i = 0; i < $scope.Test.questions.length; i++) {

														if ($stateParams.selectedQuestionId == $scope.Test.questions[i].id) {
															$scope.Test.questions[i] = $stateParams.updatedQ;
															$scope.updateExam();
															break;
														}

													}
												}
											}

										});

					}

					$scope.questions = [];

					$scope.getQuestions = function() {

						var ScheduledQuestionService = appEndpointSF
								.getScheduledQuestionService();
						ScheduledQuestionService.getQuestions().then(
								function(questionList) {
									$scope.questions = questionList;
								});
					}

					

					$scope.Test = [];

					$scope.selectedQ = [];

					$scope.updateScheduledExam = function() {
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						
						ScheduledExamService.updateScheduledExam($scope.Test)
								.then(function(msgBean) {
									
									$scope.showSavedToast();
								});
						if ($stateParams.editFlag || $stateParams.addFlag) {
						} else {
							$state.go("scheduledExam.list");
						}
					}

				/*	
					$scope.addQuestion = function() {

						$state.go('exam.addnewquestion', {
							sourceSate : "exam.editpracticeexam",
							selectedExamId : $stateParams.selectedExamId,
							
							flag : true
						});

					}
					
					$scope.editQuestion = function() {

						$state.go('exam.editquestion', {
							sourceSate : "exam.editpracticeexam",
							selectedExamId : $stateParams.selectedExamId,
							selectedQuestion : $scope.selectedQ[0],
							selectedQuestionId : $scope.selectedQ[0].id
						});
					};

					$scope.remove = function($index) {

						var actualIndex = -1;

						for (var i = 0; i < $scope.Test.questions.length; i++) {
							if ($scope.selectedQ[0].id == $scope.Test.questions[i].id) {
								actualIndex = i;
								break;
							}
						}
						if (actualIndex > -1) {
							$scope.Test.questions.splice(actualIndex, 1);
							actualIndex = -1;
							$scope.selectedQ = [];
						}
					};
*/
					$scope.cancel = function() {
						$state.go('^');
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
					$scope.waitForServiceLoad = function() {
						  if (appEndpointSF.is_service_ready) {	
							  $scope.getQuestions();
							  $scope.showselectedExam();
								  						  } 
						  else {
						   $log.debug("Services Not Loaded, watiting...");
						   $timeout($scope.waitForServiceLoad, 1000);
						  }
						 }
						  
						 $scope.waitForServiceLoad();	

				});// end of editScheduledExamCtr
