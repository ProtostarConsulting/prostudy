angular.module("prostudyApp").controller(
		"addNewQuestionCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};
						
			$scope.sourceSate = $stateParams.sourceSate; //editpracticeexam/3 = {state: , examid}
			$log.debug("$stateParams.sourceSate.examID:" + $scope.sourceSate);
			$scope.tempQuestion = {
				description : "",
				note : "",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : "",
				
			};
			$scope.question = [];

			$scope.addQuestion = function() {
				$log.debug("No1");
				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.addQuestion($scope.tempQuestion).then(
						function(addedQ) {
							
							$log.debug("Inside Ctr addNewQuestionCtr");
							$scope.showSavedToast();
							$scope.tempQuestion = {
								description : "",
								note : "",
								option1 : "",
								option2 : "",
								option3 : "",
								option4 : "",
								correctAns : "",
								
							};
							$log.debug("$scope.sourceSate:" + $scope.sourceSate);
							//$log.debug("$scope.sourceSate !== undefined:" + angular.isUndefined($scope.sourceSate !== undefined));
						
							if($scope.sourceSate !== undefined){
								
								$state.go($scope.sourceSate, {addedQ: addedQ, selectedExamId: $stateParams.selectedExamId,addFlag : true});
							}
								
						});
				$log.debug("No4");
			}

			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();

				QuestionService.getQuestion().then(function(questionList) {
					$log.debug("Inside Ctr getQuestion");
					$scope.question = questionList;
				});
			}
			$scope.cancelButton = function() {
				$state.go("exam", {});
			}

		});
