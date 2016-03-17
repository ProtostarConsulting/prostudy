angular
		.module("prostudyApp")
		.controller(
				"editPracticeExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams, boardList) {
					$scope.checked = "false";
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Practice Exam Updated!').position("top")
								.hideDelay(3000));
					};

					$scope.boards = [ {} ];
					$scope.boards = boardList;

					$scope.standards = [];
					$scope.divisions = [];
					$scope.subjects = [];
					
					$scope.selectedStdID;
					$scope.selectedDivID;
					$scope.selectedSubID;
				
					$scope.stdList;
					$scope.divList;
					$scope.subList;

					$scope.selectedExamId = $stateParams.selectedExamId;


					
					$scope.showselectedExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService
								.getPracticeExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.Test = practiceTest;

											if ($stateParams.addFlag) {
												if ($stateParams.addedQ !== undefined) {
													$scope.Test.questions
															.push($stateParams.addedQ);

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

					$scope.getQuestion = function() {

						var QuestionService = appEndpointSF
								.getQuestionService();
						QuestionService.getQuestion().then(
								function(questionList) {
									$log.debug("Inside Ctr getQuestion");
									$scope.questions = questionList;
								});
					}

					$scope.getQuestion();
		
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

					$scope.Test = [];

					$scope.selectedQ = [];

					$scope.updateExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService
								.updatePracticeExam($scope.Test)
								.then(
										function(msgBean) {
											$log.debug("No6");
											$log
													.debug("Inside Ctr editPracticeExamCtr");
											$log.debug("msgBean.msg:"
													+ msgBean.msg);
											$scope.showSavedToast();
										});
						if ($stateParams.editFlag || $stateParams.addFlag) {
						} else {
							$state.go("exam.listpracticeexam");
						}
					}

					$scope.showselectedExam();
					$scope.addQuestion = function() {

						$log.debug(" $stateParams.selectedExamId :"
								+ $stateParams.selectedExamId);
						$state.go('exam.addnewquestion', {
							sourceSate : "exam.editpracticeexam",
							selectedExamId : $stateParams.selectedExamId
						});

					}
					$scope.editQuestion = function() {
						$log.debug(" $stateParams.selectedExamId :"
								+ angular.toJson($scope.selectedQ[0]));
						$log.debug(" $scope.selectedQ[0].id :"
								+ angular.toJson($scope.selectedQ[0].id));
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
						}
					};
					$scope.cancel = function() {
						$state.go('^');
					};
					

					$scope.getStandardByInstitute = function() {

						var StandardService = appEndpointSF
								.getStandardService();
						StandardService.getStandardByInstitute(
								$scope.curUser.instituteID).then(
								function(standardList) {
									$scope.stdList = standardList;
									for(var i=0; i< $scope.stdList.length; i++)
									{	
										$log.debug("Test.standard=" +$scope.Test.standard);
										if($scope.stdList[i].name==$scope.Test.standard){
										$scope.selectedStdID=$scope.stdList[i].id;
										$log.debug("$scope.selectedID...=" +$scope.selectedStdID);
										}
										
									}
						});
					}

					$scope.getStandardByInstitute();					
								
					$scope.getDivisionByStandard = function() {

						var DivisionService = appEndpointSF.getDivisionService();
						DivisionService.getDivisionByStandard(
								$scope.selectedStdID).then(
								function(divisionList) {

									$scope.divList = divisionList;
									$log.debug("$scope.divList  "+angular.toJson($scope.divList));
									for(var i=0; i< $scope.divList.length; i++)
									{	
										$log.debug("Test.division=" +$scope.Test.division);
										if($scope.divList[i].name==$scope.Test.division){
										$scope.selectedDivID=$scope.divList[i].id;
										$log.debug("$scope.selectedDivID...=" +$scope.selectedDivID);
										
										}
										
									}
								});
					}
			
					$scope.getSubjectByDivision = function() {

						var SubjectService = appEndpointSF.getSubjectService();
						SubjectService.getSubjectByDivision(
								$scope.selectedDivID).then(
								function(subjectList) {
									
									$scope.subList = subjectList;
									$log.debug("$scope.subList  "+angular.toJson($scope.subList));
									for(var i=0; i< $scope.subList.length; i++)
									{	
										$log.debug("Test.subject=" +$scope.Test.subject);
										if($scope.subList[i].name==$scope.Test.subject){
										$scope.selectedSubID=$scope.divList[i].id;
										$log.debug("$scope.selectedSubID...=" +$scope.selectedSubID);
										
										}
										
									}

								});
						}
			
				});// end of editPracticeExamCtr
