angular.module("prostudyApp").controller(
		"addNewQuestionCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};
		
		
			$scope.checkValidation = function() {
				if($scope.tempQuestion.correctAns==false)
				{
					alert("Please select the correctAns By selecting one of the check box");			
				}
				if($scope.tempQuestion.description=="")
				{
					alert("Please Enter the Question Description");	
					
				}
				if($scope.tempQuestion.option1=="")
				{
					alert("Please Enter the option1");				
				}
				if($scope.tempQuestion.option2=="")
				{
					alert("Please Enter the option2");				
				}
				if($scope.tempQuestion.option3=="")
				{
					alert("Please Enter the option3");				
				}
				if($scope.tempQuestion.option4=="")
				{
					alert("Please Enter the option4");		
				}
			
			}
			
			$scope.sourceSate = $stateParams.sourceSate; //editpracticeexam/3 = {state: , examid}
			$log.debug("$stateParams.sourceSate.examID:" + $scope.sourceSate);
			$scope.tempQuestion = {
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
