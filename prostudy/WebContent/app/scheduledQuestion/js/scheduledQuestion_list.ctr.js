angular
		.module("prostudyApp")
		.controller(
				"scheduledQuestionListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.tempQuestion = {
						id : "",
						description : "",
						note : "",
						option1 : "",
						option2 : "",
						option3 : "",
						option4 : "",
						correctAns : ""
					};

					$scope.questions = [];

					$scope.getQuestionsByInstitute = function() {

						var ScheduledQuestionService = appEndpointSF
								.getScheduledQuestionService();
						ScheduledQuestionService.getQuestionsByInstitute(
								$scope.curUser.instituteID).then(
								function(questionsList) {
									$scope.questions = questionsList;

								});
					}

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
					// Function for downloadQuestionList
					$scope.downloadQuestionList = function() {

						document.location.href = "DownloadScheduledQuestionListServlet?instituteId="
								+ $scope.curUser.instituteID;
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getQuestionsByInstitute();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

				});
