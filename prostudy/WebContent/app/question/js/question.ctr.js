angular
		.module("prostudyApp")
		.controller(
				"questionCtr",
				[
						'$scope',
						'$window',
						'$mdToast',
						'$state',
						
						

						function($scope, $window, $mdToast,$state) {

							console.log("Inside questionCtr");

							$scope.showSimpleToast = function() {
								$mdToast.show($mdToast.simple().content(
										'Question Saved!').position("top")
										.hideDelay(3000));
							};// end of showSimpleToast

							$scope.newExamQuestion = function() {
								return {

									description : '',
									note : '', // Hint: you may select multiple
									// options.
									option1 : '',
									option2 : '',
									option3 : '',
									option4 : '',
									correctAns : '',

								}
							};// end of newExamQuestion object

							// $scope.question = $scope.newExamQuestion();

							$scope.addQuestionToDB = function() {
								console.log("in side addQuestionToDB");

								gapi.client.questionService
										.addQuestion($scope.question)
										.execute(
												function(resp) {
													// console.log("Add Q
													// Response: " + resp.msg);
													console
															.log("Question Saved Successfully : "
																	+ resp.msg);

													console
															.log("Question Entity: "
																	+ $scope.question);
													console
															.log("Question: "
																	+ $scope.question.description);
													console
															.log("Note: "
																	+ $scope.question.note);
													console
															.log("Answer : "
																	+ $scope.question.correctAns);

													$scope.showSimpleToast();

													$scope.question = $scope
															.newExamQuestion();

												})

							};// end of addQuestionToDB

							$scope.loadGetQuestionList = function() {
								console.log("In loadGetQuestionList");
								gapi.client.questionService.getAllQuestion()
										.execute(function(resp) {
											console.log(resp);

											$scope.items = resp.items;
											$scope.$apply();
										});
								$scope.question = $scope.newExamQuestion();

							};// end of loadGetQuestionList

							$scope.cancelButton = function()
							{
								//$log.debug("inside cancelButton");
								$state.go('^', {});
							};//end of cancelButton

							$window.initGAPI = function() {
								console.log("Came to initGAPI");
								// $scope.$apply($scope.loadCustomService);

							};

						} ]);
