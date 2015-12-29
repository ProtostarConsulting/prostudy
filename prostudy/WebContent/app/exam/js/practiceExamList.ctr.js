angular
		.module("prostudyApp")
		.controller(
				"practiceExamListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter) {

					$scope.count = 0;

					$log.debug("Inside practiceExamListCtr");
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Result Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.getPracticeExams = function() {

						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService
								.getPracticeExams()
								.then(
										function(practiceExamList) {
											$log
													.debug("Inside Ctr getPracticeExam");
											$scope.practiceTest = practiceExamList;
											$scope.practiceTest.description = $sce
													.trustAsHtml($scope.practiceTest.description);

										});
					}

					$scope.addTestToMyList = function(selectedMyExamId) {

						$log.debug("selectedMyExamId:" + selectedMyExamId);

						var UserService = appEndpointSF.getUserService();
						UserService.addMyPracticeExam(
								UserService.getExamId(selectedMyExamId)).then(
								function() {
									$scope.showSavedToast();
								});

					};

					$scope.like = function(selectedMyExamId) {

						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.likeCount(selectedMyExamId).then(
								function(practiceExamList) {
									
									$log.debug("Inside Ctr like");
									
									for(i=0 ;i< $scope.practiceTest.length;i++)
									{
										if($scope.practiceTest[i].examId == selectedMyExamId)
											{
											 $scope.practiceTest[i].likes++;
											 break;
											}
										
									}

								});

					}

					$scope.dislike = function(selectedMyExamId) {

						var PracticeExamService = appEndpointSF
								.getPracticeExamService();
						PracticeExamService.dislikeCount(selectedMyExamId).then(
								function(practiceExamList) {
									$log.debug("Inside Ctr dislike");
									
									for(i=0 ;i< $scope.practiceTest.length;i++)
									{
										if($scope.practiceTest[i].examId == selectedMyExamId)
											{
											 $scope.practiceTest[i].dislikes++;
											 break;
											}
										
									}

								});

					}

					$scope.getPracticeExams();

				});// end of examDemoCtr

