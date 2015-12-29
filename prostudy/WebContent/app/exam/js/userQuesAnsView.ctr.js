angular
		.module("prostudyApp")
		.controller(
				"userQuesAnsViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.curUser = appEndpointSF.getUserService()
							.getLoggedinUser();

					$scope.userAnsList = []; // {qID, userOption}
					$scope.correctAns = [];
					$scope.score = 0;
					
					$scope.selected = [];
					$scope.Test =[];
					$scope.examResults =[];
					$scope.options = [];

					$scope.selectedExamId = $stateParams.selectedExamId;

					$scope.showselectedExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService
								.getPracticeExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.Test = practiceTest[0];
											$scope.Test.questions.description = $sce
											.trustAsHtml($scope.Test.questions.description);
										});
						
					}// End of showselectedExam
					
					

					$scope.getPracticeExamResultbyID = function() {

						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService
								.getPracticeExamResultbyID(
										$scope.curUser.userId)
								.then(
										function(practiceExamResultList) {

											$scope.examResults = practiceExamResultList;

										});
					}
					
					 $scope.isUserSelection = function (index, currOption) {
						 
						$log.debug("results :"+index);
						$log.debug("currOption :"+currOption);
						
						var currentQ = $scope.Test.questions[index];
						var currentExamResult = $scope.examResults[1];// write logic got get correct exma result obj
						var userOption = currentExamResult.userAns[index].userOption // write a method to get user select option for Q currentQ.id and currentExamResult.id 
						if(userOption == currOption)
							return true;
						else
							return false;
						
					}
					 
					 $scope.isAnsCorrect = function (index, currOption) {
						 
						$log.debug("results :"+index);
						$log.debug("currOption :"+currOption);
						
						var currentQ = $scope.Test.questions[index];
						
						if(currentQ.correctAns == currOption)
							return true;
						else
							return false;
										        
					      }
					 
					 
					$scope.getPracticeExamResultbyID();
					$scope.showselectedExam();
					
				});// end of examDemoCtr

