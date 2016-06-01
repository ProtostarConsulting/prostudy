angular
		.module("prostudyApp")
		.controller(
				"scheduledUserQuesAnsViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {				
				
					$scope.selectedExamId = $stateParams.selectedExamId;
					$scope.selectedEmailId = $stateParams.selectedEmailId;
					
					
					$scope.flag = $stateParams.flag;

					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.userAnsList = []; // {qID, userOption}
					$scope.correctAns = [];
					$scope.score = 0;
					$scope.totalLength;
					$scope.answeredLength;
					$scope.remainingLength;

					$scope.selected = [];
					$scope.Test = [];
					$scope.examResults = [];
					$scope.options = [];
					$scope.newQues = [ {
						qId : ""
					} ];

					$scope.showselectedExam = function() {
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();

						ScheduledExamService
								.getScheduledExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.Test = practiceTest;
											
											$scope.Test.listOfQuestion.description = $sce
													.trustAsHtml($scope.Test.listOfQuestion.description);
											$scope.newQues = $scope.Test.listOfQuestion;
											$scope.totalLength = $scope.Test.listOfQuestion.length;

											$scope.newQues[0].qId = 1;
											for (var i = 1; i < $scope.newQues.length; i++) {

												$scope.newQues[i].qId = $scope.newQues[i - 1].qId + 1;

											}

										});
					}

			
					$scope.getScheduledExamResultbyEmail = function() {

						var ScheduledExamResultService = appEndpointSF
								.getScheduledExamResultService();
							
						ScheduledExamResultService
								.getScheduledExamResultbyEmail(	$scope.selectedEmailId)
								.then(
										function(scheduledExamResultList) {
											for(var i=0 ;i<scheduledExamResultList.length;i++)
												{
												if(scheduledExamResultList[i].testID==$scope.selectedExamId)
													{
													$scope.examResults = scheduledExamResultList[i];
													if($scope.examResults.userAns!=undefined)
													{	$scope.answeredLength = $scope.examResults.userAns.length;}	
													
												}
												}
											if($scope.examResults.id==undefined)
											{
												alert("User not Attempted this Exam");									
											}
											if($scope.examResults.id!=undefined && $scope.examResults.test==undefined &&  $scope.examResults.userAns==undefined)
											{
												alert("User Has  Attempted Offline Exam");									
											}
											
											
										});
					}
					$scope.getScheduledExamById=function(){
						
					var ScheduledExamService = appEndpointSF.getScheduledExamService();

					ScheduledExamService.getScheduledExamById($scope.selectedExamId).then(
									function(ScheduledTest) {
										$scope.ScheduledTest = ScheduledTest;
									});
						}
					

					$scope.getStudent = function() {

						var UserService = appEndpointSF.getUserService();
						UserService.getUserByEmailID($scope.selectedEmailId).then(
								function(student) {
									$scope.student = student;									
								});
					}
					$scope.getStudent();
					
					$scope.getScheduledExamResultbyEmail();
					$scope.getScheduledExamById();
					$scope.getStudent();
					$scope.showselectedExam();

					$scope.cancelButton = function() {						
							$state.go("scheduledExam",{});					

					}

				});
