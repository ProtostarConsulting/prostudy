angular
		.module("prostudyApp")
		.controller(
				"questionListCtr",
				[
						'$scope',
						'$window',
						'$mdToast',

						function($scope, $window, $mdToast) {

							$scope.questions = [ {
								description : "red icescreem",
								note : 1,
								option1 : 45,
								option2 : 46,
								option3 : 47,
								option4 : 48,
								correctAns : 4
							}, {
								description : "pink icescreem",
								note : 3,
								option1 : 33,
								option2 : 11,
								option3 : 12,
								option4 : 13,
								correctAns : 3
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
							} ];

							// $scope.questions = $scope.questionsActual;
							/*
							 * $scope.addQuestion = function() { var teacher = {
							 * description:$scope.description, note:
							 * $scope.note, option1: $scope.option1, option2:
							 * $scope.option2, option3: $scope.option3, option4:
							 * $scope.option4, correctAns: $scope.correctAns, };
							 * $scope.questions.push(teacher); };
							 */

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

							$scope.quest = $scope.questions.slice(1, 7);

							$scope.selected = [];

							$scope.query = {
								filter : '',
								order : 'description',
								limit : 3,
								page : 1
							};

							$scope.onOrderChange = function(order) {
								console.log(order);
								console.log($scope.query);
								var order = order.startsWith("-");
								// $scope.desserts = sortBy($scope.desserts,
								// order);
								$scope.quest = $scope.quest
										.sort(order ? compareByColDesc
												: compareByColAsc);
								console.log($scope.quest);

							};

							$scope.onPaginationChange = function(page, limit) {
								var from = (page == 1) ? 0
										: (page * limit - limit);
								var till = page * limit;
								$scope.quest = $scope.questions.slice(from,
										till);
							};

							function compareByColAsc(a, b) {
								if (a.note < b.note) {
									return -1;
								}
								if (a.note > b.note) {

									return 1;
								}
								return 0;
							}

							function compareByColDesc(a, b) {
								if (a.note < b.note) {
									return 1;
								}
								if (a.note > b.note) {

									return -1;
								}
								return 0;
							}

						} ]);
