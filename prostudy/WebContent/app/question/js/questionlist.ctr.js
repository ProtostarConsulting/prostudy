angular
		.module("prostudyApp")
		.controller(
				"questionListCtr",
						function($scope, $window, $mdToast, $timeout, $mdSidenav,
								$mdUtil, $log, $q, tableTestDataFactory) {
							
							$scope.questions = [];
							$scope.loadQuestionsList = function() {							
							
							$scope.questions = [ {
								description : "What is correct answer of 4 + 3=?",
								note : "Only one answer is correct.",
								option1 : 6,
								option2 : 7,
								option3 : 4,
								option4 : 2,
								correctAns : 2
							}, {
								description : "What is addtion of 4 and 2?",
								note : 3,
								option1 : 6,
								option2 : 7,
								option3 : 4,
								option4 : 2,
								correctAns : 1
							}, {
								description : "What is 4 - 2=?",
								note : 2,
								option1 : 1,
								option2 : 0,
								option3 : 2,
								option4 : 3,
								correctAns : 3

							}, {
								description : "Yello icescreem",
								note : 4,
								option1 : 7,
								option2 : 10,
								option3 : 6,
								option4 : 30,
								correctAns : 1
							}, {
								description : "Green icescreem",
								note : 2,
								option1 : 21,
								option2 : 20,
								option3 : 22,
								option4 : 23,
								correctAns : 2

							}, {
								description : "Yello icescreem",
								note : 4,
								option1 : 7,
								option2 : 10,
								option3 : 6,
								option4 : 30,
								correctAns : 1
							} , {
								description : "Green icescreem",
								note : 2,
								option1 : 21,
								option2 : 20,
								option3 : 22,
								option4 : 23,
								correctAns : 2

							}, {
								description : "Yello icescreem",
								note : 4,
								option1 : 7,
								option2 : 10,
								option3 : 6,
								option4 : 30,
								correctAns : 1
							}  ];

							}//end of list load

							$scope.editingData = [];

							/*for (var i = 0, length = $scope.questions.length; i < length; i++) {
								$scope.editingData[$scope.questions[i].description] = false;
							}*/

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
