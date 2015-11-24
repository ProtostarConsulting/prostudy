angular.module("prostudyApp").controller(
		"examDemoCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state ,$filter) {
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Result Saved!')
						.position("top").hideDelay(3000));
			};
			
			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();
			
			 //Code for timer
			var date = new Date();
		    $scope.counter = 20;
			var mytimeout = null; 
			$scope.start = new Date().getTime()
			$log.debug("Duration :" +$scope.start);
			
			$scope.onTimeout = function() {
				if ($scope.counter === 0) {
					$scope.$broadcast('timer-stopped', 0);
					$timeout.cancel(mytimeout);
					$state.go("examscore");
					return;

				}
				$scope.counter--;
				mytimeout = $timeout($scope.onTimeout, 1000);
			};
			
			$scope.startTimer = function() {
				mytimeout = $timeout($scope.onTimeout, 1000);
				$scope.startTime = $filter('date')(new Date(), 'hh:mm:ss a');
				$log.debug("start time :"+$scope.startTime);
				
			};

			$scope.stopTimer = function() {
				$scope.$broadcast('timer-stopped', $scope.counter);
				$scope.counter = 20;
				$timeout.cancel(mytimeout);
				$scope.endTime = $filter('date')(new Date(), 'hh:mm:ss a');
				$log.debug("End time :"+$scope.endTime);
				
			};

			$scope.$on('timer-stopped', function(event, remaining) {
				if (remaining === 0) {
					console.log('your time ran out!');
					/*$scope.endTime = $filter('date')(new Date(), 'hh:mm:ss a');
					$log.debug("End time :"+$scope.endTime);*/
				}
			});//End of timer

			console.log("Inside examDemoCtr");
			
			$scope.currentPage = 0;
			$scope.totalPages = 0;
			$scope.itemsPerPage = 4;
			$scope.count = 0;
			$scope.isDisabledPrevious = false;
			$scope.isDisabledNext = false;
			$scope.score = 0;

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
			
			$scope.startTimer();
			//$scope.stopTimer();
			//$scope.addPracticeExamResult();
			
			$scope.tempPracticeExamResult = {
					userId : $scope.curUser.userId,
					userName : $scope.curUser.name,
					startTime : $scope.startTime,
					endTime : $scope.endTime,
					score :$scope.checkAnswer
			}
			$scope.questions = [];
			$scope.selected = [];
			$scope.userQuestionAns = [];

			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();

				QuestionService.getQuestion().then(
						function(questionList) {
							$log.debug("Inside Ctr getInstitutes");
							$scope.questions = questionList;
							$log.debug("$scope.questions.description: "
									+ $scope.questions.description);
							$scope.questions.description = $sce
									.trustAsHtml($scope.questions.description);
							$scope.buttonLimit = function(count) {
								$scope.totalPages = Math
										.ceil($scope.questions.length
												/ $scope.itemsPerPage);
								return Array.apply(0, Array(+count)).map(
										function(value, index) {
											return index;
										});
							}// end of buttonlimit

							$scope.onNext();
							$scope.isDisabledPrevious = true;
						});

			} // End of getQuestion
			
			$scope.addPracticeExamResult = function(){
				$log.debug("No1");	
				var QuestionService = appEndpointSF.getQuestionService();
				$scope.endTime = $filter('date')(new Date(), 'hh:mm:ss a');
				QuestionService.addPracticeExamResult($scope.tempPracticeExamResult)
				.then(
						function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addData");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempPracticeExamResult = {userId:"", userName:"", startTime:"", endTime: "", score: ""};
						});
				$log.debug("No4");
				
			}

			$scope.selection = [];
			$scope.userAns = [];

			$scope.toggleSelection = function toggleSelection(id, optionId) 
			{
				var idx = $scope.selection.indexOf(id, optionId);

				if (idx > -1) 
				{
					$scope.selection.splice(idx, 1);
				} else 
				{
					$scope.selection.push(id, optionId);
				}

			};
			
			$scope.checkAnswer = function() 
			{
				for (i = 0; i < $scope.questions.length; i++) {
					var idx = $scope.selection[i];
					$log.debug("correct :" + $scope.idx);
					if (idx == $scope.questions[i].correctAns) {
						$scope.score++;
					}
				}
				alert("Result :" + $scope.score);
				$state.go("examscore");
			};

			$scope.selected = [];

			$scope.onNext = function() {
				$scope.currentPage++;
				$scope.count = $scope.currentPage;

				$scope.array = $scope.questions.slice(
						($scope.currentPage * $scope.itemsPerPage)
								- $scope.itemsPerPage,
						($scope.currentPage * $scope.itemsPerPage));
				console.log("$scope.currentPage=" + $scope.currentPage);

				if ($scope.currentPage == $scope.totalPages) {
					$scope.isDisabledNext = true;

				} else {
					$scope.isDisabledPrevious = false;
				}

			}// end of onNext

			$scope.onButtonClick = function(index) {
				console.log("$index" + index);
				$scope.currentPage = index;
				$scope.count = $scope.currentPage;

				$scope.array = $scope.questions.slice(
						($scope.currentPage * $scope.itemsPerPage)
								- $scope.itemsPerPage,
						($scope.currentPage * $scope.itemsPerPage));
				console.log("$scope.currentPage=" + $scope.currentPage);

				if ($scope.currentPage == $scope.totalPages) {
					$scope.isDisabledNext = true;

				} else {
					$scope.isDisabledNext = false;
				}
				if ($scope.currentPage == 1) {
					$scope.isDisabledPrevious = true;

				} else {
					$scope.isDisabledPrevious = false;
				}

			};// end of onPage

			$scope.onPrevious = function() {
				$scope.currentPage--;
				console.log("Previous" + $scope.currentPage);
				$scope.array = $scope.questions.slice(
						($scope.currentPage * $scope.itemsPerPage)
								- $scope.itemsPerPage,
						($scope.currentPage * $scope.itemsPerPage));
				console.log("$scope.currentPage=" + $scope.currentPage);

				if ($scope.currentPage <= 1) {
					$scope.isDisabledPrevious = true;

				} else {
					$scope.isDisabledNext = false;
				}

			}// end of onPrevious

			$scope.getQuestion();
			
		});// end of examDemoCtr

