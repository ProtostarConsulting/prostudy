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
				
				/*$scope.isAnsCorrect = function(index,currOption)
				{
					$log.debug("answers :" + angular.toJson($scope.examResults[0].userAns));
					
					for(var i=0;i<$scope.examResults.length;i++)
						{
								$scope.userAnsList = $scope.examResults[i].userAns;
						}
					
					$log.debug("$scope.userAnsList :" + angular.toJson($scope.userAnsList));
				    return currOption == $scope.userAnsList[index].userOption;
					
					//return currOption == $scope.examResults.userAns[index].userOption;
					
					for(var i=0;i<$scope.examResults.length;i++)
				    	{
				    		
				    		if($scope.examResults[i].test.quesId == $scope.examResults[i].userAns.qID)
				    		{
			   	    			
				    				
				    				return currOption = true;
				    			
				    		}	
				    	
				    	}
				}
				*/
					
					 $scope.isAnsCorrect = function () {
						 
						//$log.debug("results :"+index);
					       // return currOption == $scope.examResults.userAns[index].userOption;
						 	//$log.debug("results :"+ angular.toJson($scope.Test));
						 	for(var i=0;i<$scope.Test.length;i++)
						 	{
						 		if($scope.Test.questions[i].quesId == $scope.examResults.userAns[i].qID)
						 			{
						 			return currOption = $scope.examResults.userAns[i].userOption;
						 			}
						 	}
						 	
						
					        
					      }
					 
					 
					$scope.getPracticeExamResultbyID();
					$scope.showselectedExam();
					
				});// end of examDemoCtr

