angular
		.module("prostudyApp")
		.controller(
				"examCtr",
				function($scope, $window, $q, $mdToast, appEndpointSF,
						appEndpointSF) {
					console.log("Inside examCtr");

					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content('Exam Saved!')
								.position("top").hideDelay(3000));
					};// end of showSimpleToast

					$scope.cancelButtonClick = function() {
						console.log("in side cancelButtonClick");

					};
					$scope.testGAPICall = function() {
						console.log("in side testGAPICall");
						appEndpointSF.getQuestionService().test1();

					};

					$scope.examQuestions = [];
					$scope.userQuestionAns = [];
					$scope.noOfUserCorrectAns = 0;

					// starts checkbox Coding
					$scope.selected = [];

					$scope.toggle = function(qId, currentOption) {
						console.log("Inside Toggle ");
						var currentUserAns = {};
						for (var i = 0; i < $scope.userQuestionAns.length; i++) {
							if ($scope.userQuestionAns[i].questionID == qId) {
								currentUserAns = $scope.userQuestionAns[i];
								break;
							}

						}
						if (currentUserAns.userOption == "") {
							currentUserAns.userOption = currentOption;
						} else {
							currentUserAns.userOption = "";
						}
					};// end of toggle

					$scope.exists = function(item, list) {
						console.log("Inside exists ");
						return list.indexOf(item) > -1;
					};// end of exists

					$scope.isOptionSelected = function(qId, optionId) {
						/* console.log("Inside isOptionSelected "); */
						var currentAns = {};
						for (var i = 0; i < $scope.userQuestionAns.length; i++) {
							if ($scope.userQuestionAns[i].questionID == qId) {
								currentAns = $scope.userQuestionAns[i];
								break;
							}

						}
						return currentAns.userOption == optionId;
					};// end of isOptionSelected

					console.log("Q Array IS:" + $scope.examQuestions);

					$scope.newExam = function() {
						return {
							student_name : '',
							register_No : '',
							branch : '',
							correctAns : ''
						}
					};// end of creating newExam Object

					$scope.submitButton = function(option, qId) {
						console.log("Inside submitButton ");
						$scope.noOfUserCorrectAns = 0;

						for (var i = 0; i < $scope.userQuestionAns.length; i++) {
							if ($scope.userQuestionAns[i].userOption == $scope.examQuestions[i].correctAns) {
								$scope.noOfUserCorrectAns++;
							}

						}
						console.log("Total Correct Answer:"
								+ $scope.noOfUserCorrectAns);
						$scope.exam.correctAns = $scope.noOfUserCorrectAns;

						gapi.client.examService.addExam($scope.exam).execute(
								function(resp) {

									console.log("Exam Saved Successfully : "
											+ resp.msg);

									console.log("Exam Entity: " + $scope.exam);
									console.log("Student Name: "
											+ $scope.exam.student_name);
									console.log("Register No: "
											+ $scope.exam.register_No);
									console.log("correct ans : "
											+ $scope.exam.correctAns);

									$scope.showSimpleToast();

									$scope.exam = $scope.newExam();
									$scope.initUserAns();

								})// end of
						// examService.addExam

					};// end of submitButton

					$scope.newUserQuestionAns = function(qID) {
						return {
							questionID : qID,
							userOption : ''
						}
					};// end of newUserQuestionAns

					$scope.initUserAns = function() {
						$scope.userQuestionAns = [];
						console.log("Inside initUserAns ");
						for (var i = 0; i < $scope.examQuestions.length; i++) {
							$scope.userQuestionAns
									.push($scope
											.newUserQuestionAns($scope.examQuestions[i].id.id));

						}// end of for loop

					};// end of initUserAns

					$scope.getQuestionList = function() {
						console.log("In getQuestionList");
						// console.log("appEndpointSF.getExamService():"+
						// appEndpointSF.getExamService());
						appEndpointSF.getQuestionService().getAllQuestion()
								.execute(function(resp) {
									console.log(resp);
									$scope.examQuestions = resp.items;
									$scope.initUserAns();
									$scope.is_backend_ready = true;
									$scope.$apply();
								});

					};// end of loadGetQuestionList

					var deferred = $q.defer(deferred);
					appEndpointSF.loadAppGoogleServices(deferred);
					deferred.promise.then(function(data) {
						console.log("Load Endpoints Success!");
						$scope.getQuestionList();
					});

				});// end of angular.module

