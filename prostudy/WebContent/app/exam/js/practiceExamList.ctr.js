angular.module("prostudyApp")
		.controller(
				"practiceExamListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter,$stateParams) {

					$log.debug("Inside practiceExamListCtr");
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Added into MyPracticeExam!').position("top")
								.hideDelay(3000));
					};
			
					
					$scope.getPracticeExams = function() {

						var PracticeExamService = appEndpointSF.getPracticeExamService();
						PracticeExamService.getPracticeExams()	.then(function(practiceExamList) {
											$log
													.debug("Inside Ctr getPracticeExam");
											$scope.practiceTest = practiceExamList;
											$scope.practiceTest.description = $sce
													.trustAsHtml($scope.practiceTest.description);

										});
					}// End of getPracticeExams

					$scope.getPracticeExams();
					/*	
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedMyExamId:",
							$stateParams.selectedMyExamId);

					
					$scope.selectedMyExamId = $stateParams.selectedMyExamId;
				
					$scope.showselectedExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService.getPracticeExamById(1)
								.then(
										function(practiceTest) {
											$scope.TestSelected = practiceTest[0];
										
										});

					}
					$scope.showselectedExam();
					$log.debug("$scope.TestSelected......:", $scope.TestSelected);
					$scope.tempMyPracticeExam = {
							examId : "",
							examtitle : "",
							board : "",
							standard : "",
							subject : "",
							questions : [],
							date : ""
						};
				
					$scope.MyPracticeExam=[];
						$scope.addMyPracticeExam = function() {$log.debug("No1");
							var PracticeExamService = appEndpointSF.getPracticeExamService();
							
							$log.debug("$scope.TestSelected:", $scope.TestSelected);
								$scope.MyPracticeExam.push($scope.TestSelected);
						
								PracticeExamService.addMyPracticeExam($scope.TestSelected)
									.then(function(msgBean) {
										$log.debug("No6");
										$log.debug("Inside Ctr addMyPracticeExam");
										$log.debug("msgBean.msg:" + msgBean.msg);
										$scope.showSavedToast();
										$scope.tempMYPracticeExam = {
											examId : "",
											examtitle : "",
											board : "",
											standard : "",
											subject : "",
											questions : [],
											date : ""
										};
									});
							$log.debug("No4");
						}
						
					*/

				});// end of practiceExamListCtr

