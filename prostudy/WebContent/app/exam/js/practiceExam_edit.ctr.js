angular.module("prostudyApp")
		.controller(
				"editPracticeExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams,boardList) {
					$scope.checked="false";
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Practice Exam Updated!').position("top")
								.hideDelay(3000));
					};
					
				     
				     $scope.boards = [{}];
				     $scope.boards = boardList;	
				     
						$scope.standards = [];
						$scope.divisions = []; 
						$scope.subjects = []; 
						
						$scope.selectedStdID;
						$scope.stdList;
						$scope.divList;
						$scope.subList;
				 
					$scope.selectedExamId = $stateParams.selectedExamId;
					
					$scope.getStandardByInstitute = function() {

						var StandardService = appEndpointSF
								.getStandardService();
						StandardService.getStandardByInstitute($scope.curUser.instituteID).then(
								function(standardList) {
								
									$scope.stdList = standardList;
									
								});
					}
					
					$scope.getStandardByInstitute();
					
					$scope.getDivisionByStandard = function() {
					
						for(var i=0;i< $scope.stdList.length;i++)
						{
							if($scope.tempPracticeExam.standard == $scope.stdList[i].name)
							{
								$scope.selectedStdID = $scope.stdList[i].id;
							}
						}
						var DivisionService = appEndpointSF
								.getDivisionService();
						DivisionService.getDivisionByStandard($scope.selectedStdID).then(
								function(divisionList) {
								
									$scope.divList = divisionList;
								});
					}
					
					$scope.getSubjectByDivision = function() {
						
						for(var i=0;i<$scope.divList.length;i++)
						{
							if($scope.tempPracticeExam.division == $scope.divList[i].name)
							{
								$scope.selectedDivID = $scope.divList[i].id;
							}
						}
						var SubjectService = appEndpointSF.getSubjectService();
						SubjectService.getSubjectByDivision($scope.selectedDivID).then(
								function(subjectList) {
									for(var i=0; i< subjectList.length; i++)
									{
										$scope.subjects.push(subjectList[i].name);
									}

								});
						$scope.subjects.splice(0,$scope.subjects.length);
					}
			
					
					
					
					
					$scope.showselectedExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService.getPracticeExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.Test = practiceTest;
																
											if($stateParams.addFlag)
											{
											if($stateParams.addedQ !== undefined)
											{	
												$scope.Test.questions.push($stateParams.addedQ);
											
												$scope.updateExam();
											
											}
											}
										
											if($stateParams.editFlag)
											{
											
											if($stateParams.updatedQ !== undefined)
											{
											
												for (var i=0;i<$scope.Test.questions.length;i++)
												{	
																									
													if($stateParams.selectedQuestionId==$scope.Test.questions[i].quesId)
													{
														$scope.Test.questions[i]=$stateParams.updatedQ;
														$scope.updateExam ();
														break;												
												}
												
											}
											}
											}
																				
											
										});

					}
					
					$scope.questions = [];

					$scope.getQuestion = function() {

						var QuestionService = appEndpointSF.getQuestionService();
						QuestionService.getQuestion().then(function(questionList) {
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
						var PracticeExamService = appEndpointSF.getPracticeExamService();
							
						PracticeExamService.updatePracticeExam($scope.Test).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr editPracticeExamCtr");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSavedToast();
							});
							if($stateParams.editFlag || $stateParams.addFlag)
							{
							}else
								{$state.go("exam.listpracticeexam");}
					}
				
					$scope.showselectedExam();
					$scope.addQuestion = function() {
						
						$log.debug(" $stateParams.selectedExamId :"+ $stateParams.selectedExamId);
						$state.go('exam.addnewquestion', {sourceSate: "exam.editpracticeexam", selectedExamId: $stateParams.selectedExamId});
						
					}
					$scope.editQuestion = function(){
						$log.debug(" $stateParams.selectedExamId :"+angular.toJson($scope.selectedQ[0]));
						$log.debug(" $scope.selectedQ[0].id :"+angular.toJson($scope.selectedQ[0].id));
						$state.go('exam.editquestion', {sourceSate: "exam.editpracticeexam", selectedExamId: $stateParams.selectedExamId , selectedQuestion : $scope.selectedQ[0], selectedQuestionId:$scope.selectedQ[0].quesId});
						
					};
					
					$scope.remove = function($index){
					
						var actualIndex = -1;
					
						for(var i = 0; i < $scope.Test.questions.length; i++){
							
							if($scope.selectedQ[0].quesId == $scope.Test.questions[i].quesId){
								actualIndex = i;
								break;
							}
						}
						
						if(actualIndex > -1){
							$scope.Test.questions.splice(actualIndex, 1);
							actualIndex = -1;
						}
					};
					$scope.cancel = function(){
					$state.go('^');
					};

				});// end of editPracticeExamCtr