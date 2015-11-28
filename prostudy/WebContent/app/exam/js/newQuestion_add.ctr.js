angular.module("prostudyApp").controller(
		"addNewQuestionCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempQuestion = {
				description : "",
				note : "",
				option1 : "",
				option2 : "",
				option3 : "",
				option4 : "",
				correctAns : ""
			};
			$scope.question = [];

			$scope.addQuestion = function() {
				$log.debug("No1");
				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.addQuestion($scope.tempQuestion).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addStudent");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempQuestion = {
								description : "",
								note : "",
								option1 : "",
								option2 : "",
								option3 : "",
								option4 : "",
								correctAns : ""
							};
						});
				$log.debug("No4");
			}

			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();

				QuestionService.getQuestion().then(function(questionList) {
					$log.debug("Inside Ctr getQuestion");
					$scope.question = questionList;
				});
			}
			$scope.cancelButton = function() {
				$state.go("exam", {});
			}

		});
