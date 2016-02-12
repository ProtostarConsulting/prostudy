
angular.module("prostudyApp").controller(
		"questionListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state) {

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempQuestion = {
				quesId : "",
				description : "",
				note : "",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : ""
			};

			$scope.questions = [];
			$scope.qcategory = [];
		
			$scope.getQuestionsByInstitute = function() {

				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.getQuestionsByInstitute($scope.curUser.instituteID).then(
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
			
			$scope.getQuestionsByInstitute();

		});
