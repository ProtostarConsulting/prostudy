angular
		.module("prostudyApp")
		.controller(
				"scheduledExamTestCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams, $mdDialog) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					// Code for timer
					var date = new Date();
					
					

					$scope.counter = 200;
					$scope.startTime = null;
					$scope.endTime = null;
					$scope.examResults;
					$scope.selectedID;

					$scope.currentPage = 0;
					$scope.totalPages = 0;
					$scope.itemsPerPage = 4;
					$scope.count = 0;
					$scope.isDisabledPrevious = false;
					$scope.isDisabledNext = false;
					$scope.score = 0;
					$scope.newQues = [ {
						qId : ""
					} ];
					var mytimeout = null;

					$scope.onTimeout = function() {
						if ($scope.counter === 0) {
							$scope.$broadcast('timer-stopped', 0);
							$timeout.cancel(mytimeout);

							return;

						}
						$scope.counter--;

						mytimeout = $timeout($scope.onTimeout, 1000);
					};

					$scope.startTimer = function() {
						mytimeout = $timeout($scope.onTimeout, 1000);
						$scope.tempScheduledExamResult.startTime = new Date();
						//$scope.tempScheduledExamResult.startTime = $filter('date')(new Date(), 'hh:mm:ss a');
						
					};

					$scope.stopTimer = function() {
						var date = new Date();
						$scope.$broadcast('timer-stopped', $scope.counter);
						$timeout.cancel(mytimeout);
						$scope.tempScheduledExamResult.endTime = new Date();
						//$scope.tempScheduledExamResult.endTime = $filter('date')(new Date(), 'hh:mm:ss a');
					};

					$scope.$on('timer-stopped', function(event, remaining) {
						if (remaining === 0) {
							console.log('your time ran out!');

						}
					});// End of timer


					
					$scope.toggleSelection = function toggleSelection(index,id,optionId) {
						
						var idx = $scope.selection.indexOf(index, id, optionId);
						
						if (idx > -1) {
							$scope.selection.splice(index, 1);

						} else {
							$scope.selection.push(optionId);
							$scope.userAnsList.push({
								qID : id,
								userOption : 'option'+optionId
							});
						}
						
						/*for(i=0;i <$scope.selection.length; i++)
							{
								if(index+1 == $scope.selection[i])
								{
									
									$scope.selection.splice(index, 1);
								}
							}
						*/

					};
					
					
					$scope.userAnsList = []; // {qID, userOption}
					$scope.correctAns = [];
					$scope.score = 0;

					$scope.checkAnswer = function() {

						for (var i = 0; i < $scope.userAnsList.length; i++) {

							if ($scope.userAnsList[i].userOption == $scope.Test.listOfQuestion[i].correctAns) {
								$scope.tempScheduledExamResult.score++;
							}

						}
						$scope.stopTimer();
					//	$scope.addScheduledExamResult();
											

					}

					$scope.getCorrectAnsByQID = function(qID) {

						for (var i = 0; i < $scope.Test.listOfQuestion.length; i++) {

							if ($scope.Test.listOfQuestion[i].id == qID) {
								return $scope.Test.listOfQuestion[i].correctAns;

							}
						}
						return -1;
					}

					$scope.selected = [];

					$scope.onNext = function() {
						$scope.currentPage++;
						$scope.count = $scope.currentPage;

						$scope.array = $scope.Test.listOfQuestion.slice(
								($scope.currentPage * $scope.itemsPerPage)
										- $scope.itemsPerPage,
								($scope.currentPage * $scope.itemsPerPage));
						console.log("slice =" + $scope.array);

						if ($scope.currentPage == $scope.totalPages) {
							$scope.isDisabledNext = true;

						} else {
							$scope.isDisabledPrevious = false;
						}

					}// end of onNext

					$scope.onButtonClick = function(index) {

						$scope.currentPage = index;
						$scope.count = $scope.currentPage;

						$scope.array = $scope.Test.listOfQuestion.slice(
								($scope.currentPage * $scope.itemsPerPage)
										- $scope.itemsPerPage,
								($scope.currentPage * $scope.itemsPerPage));

						if ($scope.currentPage == $scope.totalPages) {
							$scope.isDisabledNext = true;

						} else {
							$scope.isDisabledNext = false;
						}
						if ($scope.currentPage == 1) {
							$scope.isDisabledPrevious = true;

						} else {
							$scope.isDisabledPrevious = false;
						}

					};// end of onPage

					$scope.onPrevious = function() {
						$scope.currentPage--;

						$scope.array = $scope.Test.listOfQuestion.slice(
								($scope.currentPage * $scope.itemsPerPage)
										- $scope.itemsPerPage,
								($scope.currentPage * $scope.itemsPerPage));

						if ($scope.currentPage <= 1) {
							$scope.isDisabledPrevious = true;

						} else {
							$scope.isDisabledNext = false;
						}

					}// end of onPrevious

					$scope.score = 0;

					$scope.getScheduledExamByInstitute = function() {

						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService.getScheduledExamByInstitute(
								$scope.curUser.instituteID).then(
								function(scheduledExamList) {
									$scope.scheduledTest = scheduledExamList;

								});
					}

					$scope.selectedExamId = $stateParams.selectedExamId;

					$scope.showselectedExam = function() {
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();

						ScheduledExamService.getScheduledExamById($scope.selectedExamId)
								.then(
										function(scheduledTest) {								
											
											
											$scope.Test = scheduledTest;

											$scope.buttonLimit = function(count) {
												$scope.totalPages = Math
														.ceil($scope.Test.listOfQuestion.length / 4);

												return Array.apply(0,
														Array(+count)).map(
														function(value, index) {
															return index;
														});

											}// end of buttonlimit

											$scope.newQues = $scope.Test.listOfQuestion;

											$scope.newQues[0].qId = 1;
											for (var i = 1; i < $scope.newQues.length; i++) {

												$scope.newQues[i].qId = $scope.newQues[i - 1].qId + 1;

											}

											$scope.tempScheduledExamResult.examTitle = $scope.Test.examtitle;

											$scope.tempScheduledExamResult.test = $scope.Test.listOfQuestion;

											$scope.onNext();
											$scope.isDisabledPrevious = true;
										});

					}// End of showselectedExam

					$scope.questions = [];
					$scope.scheduledTest = [];
					$scope.Test = [];
					$scope.selection = [];
					$scope.userAns = [];

			/*		$scope.getScheduledExamResultbyEmail = function() {

						var ScheduledExamResultService = appEndpointSF
								.getScheduledExamResultService();

						ScheduledExamResultService
								.getScheduledExamResultbyEmail(
										$scope.curUser.email_id)
								.then(
										function(practiceExamResultList) {

											$scope.examResults = practiceExamResultList;
											$log.debug("$$$$$$$$$$$$$$$$$$$$$" +angular.toJson($scope.examResults));
										});
					}
*/
					$scope.tempScheduledExamResult = {

						ID : "",
						examTitle : "",
						userId : $scope.curUser.id,
						email_id : $scope.curUser.email_id,
						firstName : $scope.curUser.firstName,
						lastName : $scope.curUser.lastName,
						startTime : "",
						endTime : "",
						score : $scope.score,
						userAns : $scope.userAnsList,
						testID : "",
						test : ""

					}

					$scope.addScheduledExamResult = function() {

						$scope.tempScheduledExamResult.testID = $scope.selectedExamId;
						var ScheduledExamResultService = appEndpointSF.getScheduledExamResultService();
				

						ScheduledExamResultService.addScheduledExamResult(
								$scope.tempScheduledExamResult).then(
								function(msgBean) {
									$scope.selectedID = msgBean.id;
									$log.debug("$scope.selectedID :"
											+ $scope.selectedID);
									$log.debug("$scope.Test.id :"
											+ $scope.Test.id);
									$state.go('scheduledExam.userQuesAnsView', {
										selectedExamId : $scope.Test.id,
										selectedResultId : $scope.selectedID
									});
									$scope.showSavedToast();

								});


					}
					
					
					 $scope.showConfirm = function(ev) {
						  
						 	$scope.checkAnswer();
						    var confirm = $mdDialog.confirm()
						          .title('Are you sure you want to submit exam now ?')
						          .targetEvent(ev)
						          .ok('YES')
						          .cancel('NO');
						    $mdDialog.show(confirm).then(function() {
						    	
						    	
						    	$scope.addScheduledExamResult();
						    	
						    			$state.go('scheduledExam.userQuesAnsView', {selectedExamId : $scope.Test.id, selectedResultId : $scope.selectedID});
						    }, function() {
						      
						    });
						  };
					

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getScheduledExamByInstitute();
							//$scope.getScheduledExamResultbyEmail();
							$scope.showselectedExam();
							
						} else {
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}


					$scope.waitForServiceLoad();

				});
