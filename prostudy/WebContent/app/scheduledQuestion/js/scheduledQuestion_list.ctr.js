angular.module("prostudyApp").controller(
		"scheduledQuestionListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$mdMedia,$mdDialog,
				$log, $q, appEndpointSF, $state) {

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
			//Function for downloadQuestionList
			$scope.downloadQuestionList = function() {

				document.location.href = "DownloadScheduledQuestionListServlet?instituteId="
						+ $scope.curUser.instituteID;
			}

			//Function for uploadQuestionList
			$scope.uplodQuestionList = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogController,
					templateUrl : '/app/scheduledQuestion/AddScheduledQuestions.html',				
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
					locals : {
						curuser : $scope.curUser
					}
				}).then(
						function(answer) {
							$scope.status = 'You said the information was "'
									+ answer + '".';
						}, function() {
							$scope.status = 'You cancelled the dialog.';
						});

			};
			
			function DialogController($scope, $mdDialog, curuser) {
				
				$scope.instituteID=curuser.instituteID;
				$scope.loding=false;
			
				$scope.uplodeExcel=function(){
					$scope.loding=true;
				 document.excelform.action = $scope.scheduledQuestionsUploadURL;
			        // calling servlet action 
				    document.excelform.submit();
			}
				
				$scope.getLogUploadURL=function(){
					var uploadUrlService = appEndpointSF.getuploadURLService();
					uploadUrlService.getScheduledQuestionsUploadURL()
							.then(function(url) {
								$scope.scheduledQuestionsUploadURL=url.msg;
									});
					
				}
				$scope.scheduledQuestionsUploadURL;
				
				$scope.waitForServiceLoad = function() {
					if (appEndpointSF.is_service_ready) {
						$scope.getLogUploadURL();
					} else {
						$log.debug("Services Not Loaded, watiting...");
						$timeout($scope.waitForServiceLoad, 1000);
					}
				}
				$scope.waitForServiceLoad();			
				
			
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
