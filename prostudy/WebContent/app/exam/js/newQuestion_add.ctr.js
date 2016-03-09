angular.module("prostudyApp").controller(
		"addNewQuestionCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams) {

			$scope.curuser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};
		
				
			$scope.sourceSate = $stateParams.sourceSate; //editpracticeexam/3 = {state: , examid}
			$log.debug("$stateParams.sourceSate.examID:" + $scope.sourceSate);
			$scope.tempQuestion = {
				instituteID : $scope.curuser.instituteID,
				description : "",
				note : "",
						category :"",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : ""
				
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
								instituteID : "",	
								description : "",
								note : "",
								category :"",
								option1 : "",
								option2 : "",
								option3 : "",
								option4 : "",
								correctAns : "",
								
							};
							
							
							$log.debug("$scope.sourceSate:" + $scope.sourceSate);
						
							if($scope.sourceSate == null)
								{
								$state.go("exam.questionlist",{});
								}
							else if($scope.sourceSate){
								
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
			$scope.toggleSelection = function toggleSelection(id,
					optionId) {
				var idx = $scope.selection.indexOf(id, optionId);
				$scope.userAnsList.push({
					qID : id,
					userOption : optionId
				});
				if (idx > -1) {
					$scope.selection.splice(idx, 1);
				} else {
					$scope.selection.push(optionId);
				}

			};


		});
