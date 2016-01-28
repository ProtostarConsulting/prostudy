angular
		.module("prostudyApp")
		.controller(
				"practiceExamListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter) {

					$scope.count = 0;
					
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					$log.debug(".....$scope.curUser on practiceExamListCtr : "+angular.toJson($scope.curUser));
			
					

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Added Exam to MyExams!').position("top")
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
												
						var practiceTest = null;
						for (var i =0; i < $scope.practiceTest.length; i++){							
							if($scope.practiceTest[i].examId == selectedMyExamId){
								practiceTest = $scope.practiceTest[i];
								break;
							}
						}
						
						$scope.curUser.myExams.push(practiceTest);
						
						$scope.updateUser();

					}
					
					$scope.updateUser = function() {
						$log.debug("No1");
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.curUser).then(function(msgBean) {
							
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempUser = {
								};
							});
						
					}
		
			
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

				});

