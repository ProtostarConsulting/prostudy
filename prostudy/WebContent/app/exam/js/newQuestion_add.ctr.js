angular.module("prostudyApp").controller(
		"addNewQuestionCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, boardList) {

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.boards = [ {} ];
			$scope.boards = boardList;
		
			$scope.question = [];
			$scope.standards = [];
			$scope.divisions = []; 
			$scope.subjects = []; 
			
			$scope.selectedStdID;
			$scope.stdList;
			$scope.divList;
			$scope.subList;
			
			$scope.sourceSate = $stateParams.sourceSate; 
		
			$scope.tempQuestion = {
				board : "",
				standard : "",
				division : "",
				subject : "",
				description : "",
				note : "",
				category :"",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : ""
				
			};
			
			$scope.getStandardByInstitute = function() {

				var StandardService = appEndpointSF
						.getStandardService();
				StandardService.getStandardByInstitute($scope.curUser.instituteID).then(
						function(standardList) {
							for(var i=0; i< standardList.length; i++)
								{
									$scope.standards.push(standardList[i].name);
									
								}
							$scope.stdList = standardList;
							
						});
			}
			
			$scope.getStandardByInstitute();
			
			$scope.getDivisionByStandard = function() {
			
				for(var i=0;i< $scope.stdList.length;i++)
				{
					if($scope.tempQuestion.standard == $scope.stdList[i].name)
					{
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var DivisionService = appEndpointSF
						.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID).then(
						function(divisionList) {
							for(var i=0; i< divisionList.length; i++)
							{
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
			}
			
			$scope.getSubjectByDivision = function() {
				
				for(var i=0;i<$scope.divList.length;i++)
				{
					if($scope.tempQuestion.division == $scope.divList[i].name)
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
			
			$scope.addQuestion = function() {
				
				$scope.tempQuestion.instituteID = $scope.curUser.instituteID;
				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.addQuestion($scope.tempQuestion).then(
						function(addedQ) {
							
							$scope.showSavedToast();
							$scope.questionForm.$setPristine();
							$scope.questionForm.$setValidity();
							$scope.questionForm.$setUntouched();
							$scope.tempQuestion = {	};							
							$scope.divisions.splice(0,$scope.divisions.length);
						
							if($scope.sourceSate == null)
								{
								//$state.go('exam');
								}
							else if($scope.sourceSate){
								
								$state.go($scope.sourceSate, {addedQ: addedQ, selectedExamId: $stateParams.selectedExamId,addFlag : true});
							}
								
						});
				
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
