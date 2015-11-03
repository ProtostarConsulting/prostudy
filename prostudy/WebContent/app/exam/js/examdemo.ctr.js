angular.module("prostudyApp").controller(
		"examDemoCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF) {

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

			$scope.selection = [];
			$scope.userAns = [];

			$scope.toggleSelection = function toggleSelection(id,optionId) {
				var idx = $scope.selection.indexOf(id,optionId);

				if (idx > -1) {
					$scope.selection.splice(idx, 1);
				} else {
					$scope.selection.push(id,optionId);
				}
				
			};

			
			$scope.checkAnswer = function() {
				for (i = 0; i < $scope.questions.length; i++) 
				{
					var idx = $scope.selection[i].optionId;
					
					if (idx == $scope.questions[i].correctAns) {
						$scope.score++;
					}
					
				}
				alert("Result :" + $scope.score);
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

