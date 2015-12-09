angular.module("prostudyApp")
		.controller(
				"editPracticeExamCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $sce, tableTestDataFactory,
						appEndpointSF, $state, $filter, $stateParams) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Practice Exam Updated!').position("top")
								.hideDelay(3000));
					};
					
					
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedExamId:",$stateParams.selectedExamId);

					$scope.selectedExamId = $stateParams.selectedExamId;
					
					$scope.showselectedExam = function() {
						var PracticeExamService = appEndpointSF
								.getPracticeExamService();

						PracticeExamService.getPracticeExamById($scope.selectedExamId)
								.then(
										function(practiceTest) {
											$scope.Test = practiceTest[0];
										
										});

					}

					$scope.questions = [];

					$scope.getQuestion = function() {

						var QuestionService = appEndpointSF.getQuestionService();
						QuestionService.getQuestion().then(function(questionList) {
							$log.debug("Inside Ctr getQuestion");
							$scope.questions = questionList;
						});
					}

					$scope.getQuestion();
				
					$scope.query = {
							order : 'description',
							limit : 5,
							page : 1
						};

						$scope.onpagechange = function(page, limit) {
							var deferred = $q.defer();

							$timeout(function() {
								deferred.resolve();
							}, 2000);

							return deferred.promise;
						};

						$scope.onorderchange = function(order) {
							var deferred = $q.defer();

							$timeout(function() {
								deferred.resolve();
							}, 2000);

							return deferred.promise;
						};
						
					$scope.Test = [];
					
					$scope.selectedQ = [];
					$scope.updateExam = function() {
						var PracticeExamService = appEndpointSF.getPracticeExamService();
							PracticeExamService.updatePracticeExam($scope.Test,$scope.selectedQ).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr editPracticeExamCtr");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSavedToast();
							});
						
						$state.go("exam.listpracticeexam");
					}
				
					$scope.showselectedExam();

				});// end of practiceExamTestCtr