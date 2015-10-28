/*angular
		.module("prostudyApp")
		.controller(
				"questionListCtr",
						function($scope, $window, $mdToast, $timeout, $mdSidenav,
								$mdUtil, $log, $q, tableTestDataFactory,$state) {
							
							$scope.questions = [];
							$scope.loadQuestionsList = function() {
							
							tableTestDataFactory.getQuestionstList().then(
									function(data) {
										$scope.questions = data;
										$log.debug("inside ctr then $scope.questions:"
												+ $scope.questions);
									});
							}//end of list load

							$scope.editingData = [];

							for (var i = 0, length = $scope.questions.length; i < length; i++) {
								$scope.editingData[$scope.questions[i].description] = false;
							}

							$scope.addQuestion = function(question) {
								$scope.questions.push(question);
								$scope.question = {};
							}// end of addQuestion

							$scope.modify = function(selectedQuestion) {
								$scope.editingData[selectedQuestion.description] = true;
								$scope.question = selectedQuestion;
							};

							$scope.update = function(questions) {
								$scope.editingData[questions.description] = false;
							};// end of update

							$scope.removeQuestion = function(index) {
								$scope.questions.splice(index, 1);
							}; // end of removeQuestion
							
							$scope.clickCancelButton = function() {
								
								console.log("inside cancelButton");
									$state.go('^', {});

							};// end of cancelButton

							

							$scope.selected = [];

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
							
							
							$scope.loadQuestionsList();

						} );
*/

angular.module("prostudyApp").controller(
		"questionListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF,$state) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};
			
			
			
			$scope.tempQuestion = {quesId:"", description: "", note: "", option1:"", option2:"", option3:"", option4:"", correctAns:""};
			$scope.questions = []; 
		
			$scope.getQuestion = function(){
			
				var QuestionAddService = appEndpointSF.getQuestionAddService();					
										
				QuestionAddService.getQuestion()
				.then(
						function(questionList) {
							$log
									.debug("Inside Ctr getInstitutes");
							$scope.questions = questionList;
						});
			}

			$scope.modify = function(selectedQuestion) {
				$scope.editingData[selectedQuestion.description] = true;
				$scope.question = selectedQuestion;
			};

			$scope.update = function(questions) {
				$scope.editingData[questions.description] = false;
			};// end of update

			$scope.removeQuestion = function(index) {
				$scope.questions.splice(index, 1);
			}; // end of removeQuestion
			
			$scope.clickCancelButton = function() {
				
				console.log("inside cancelButton");
					$state.go('^', {});

			};// end of cancelButton

			$scope.selected = [];

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
			$scope.getQuestion();
			
		});

