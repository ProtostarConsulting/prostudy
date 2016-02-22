angular.module("prostudyApp")
		.controller(
				"editQuestionCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {
					
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Question Updated!').position("top")
								.hideDelay(3000));
					};
					
					$scope.sourceSate = $stateParams.sourceSate; 
				
					$log.debug("$scope.sourceSate:" + $scope.sourceSate);
					$scope.question=$stateParams.selectedQuestion;
					
					$log.debug("$scope.selectedQuestion :" +angular.toJson($scope.question));
					
					$scope.selectedQuestionId = $stateParams.selectedQuestionId; 
				
					$scope.getQuestionByID = function() {
						var QuestionService = appEndpointSF
								.getQuestionService();

						QuestionService.getQuestionByID($scope.selectedQuestionId)
								.then(
										function(Question) {
											$scope.question = Question;
																												
										});

					}	
					if(! $stateParams.selectedQuestion){
						$scope.getQuestionByID();
					}
					
					$scope.updateQuestion = function() {

						var QuestionService = appEndpointSF.getQuestionService();
				
						QuestionService.updateQuestion($scope.question).then(function(updatedQ) {
									$log.debug("updatedQ:",updatedQ);
									$scope.showSavedToast();
														
									if($scope.sourceSate == null)
									{
									$state.go("exam.questionlist",{});
									}
									else if($scope.sourceSate)
									{
										
									$state.go($scope.sourceSate, {updatedQ: updatedQ, selectedExamId: $stateParams.selectedExamId,selectedQuestionId:$scope.selectedQuestionId,editFlag:true });
									}
								});
						
					};
					$scope.cancelButton = function() {
						$state.go("exam.questionlist", {});
					}
					

				});// end of editQuestionCtr