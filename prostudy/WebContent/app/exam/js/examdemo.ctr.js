angular.module("prostudyApp").controller(
		"examDemoCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory,appEndpointSF) {

			console.log("Inside examDemoCtr");
			$scope.currentPage = 0;
			$scope.totalPages = 0;
			$scope.itemsPerPage = 4;
			$scope.count = 0;
			$scope.isDisabledPrevious = false;
			$scope.isDisabledNext = false;
			$scope.cnt = 0;
			
			$scope.tempQuestion = {quesId:"", description: "", note: "", option1:"", option2:"", option3:"", option4:"", correctAns:""};
			$scope.questions = []; 
		
			
			$scope.addQuestion = function(){
				$log.debug("No1");	
				var QuestionAddService = appEndpointSF.getQuestionAddService();
				
				QuestionAddService.addQuestion($scope.tempQuestion)
				.then(
						function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addQuestion");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempQuestion = {quesId:"", description: "", note: "", option1:"", option2:"", option3:"", option4:"", correctAns:""};
						});
				$log.debug("No4");	
			}
			
			$scope.getQuestion = function(){
			
				var QuestionAddService = appEndpointSF.getQuestionAddService();					
										
				QuestionAddService.getQuestion()
				.then(
						function(questionList) {
							$log.debug("Inside Ctr getInstitutes");
							$scope.questions = questionList;
							$log.debug("$scope.questions.description: " + $scope.questions.description);
							$scope.questions.description = $sce.trustAsHtml($scope.questions.description);
							$log.debug("$scope.questions.description: " + $scope.questions.description);
						});
				
			}
			
			$scope.TextPattern = ('<[/a-zAZ0-9]*>','');

			/*$scope.loadQuestionsList = function() {

				tableTestDataFactory.getQuestionstList().then(
						function(data) {
							$scope.questions = [];
							$scope.questions = data;

							
							$scope.buttonLimit = function(count) {
								$scope.totalPages = Math
										.round($scope.questions.length
												/ $scope.itemsPerPage);
								return Array.apply(0, Array(+count)).map(
										function(value, index) {
											return index;
										});
							}// end of buttonlimit
							
							$scope.onNext();
							$scope.isDisabledPrevious = true;
							$log.debug("length ="+$scope.questions.length);
							

						});// end of tableTestDataFactory
				
			};// end of loadQuestionsList
			$scope.selected = [];*/
			 //$scope.selected = 1;

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

				

				if ($scope.currentPage == $scope.totalPages)
				{
					$scope.isDisabledNext = true;

				} else 
				{
					$scope.isDisabledPrevious = false;
					$scope.isDisabledNext = false;
				}
				
				if ($scope.currentPage == 1)
				{
					$scope.isDisabledPrevious = true;

				} else 
				{
					$scope.isDisabledPrevious = false;
				}
				
			

			};// end of onPage

			$scope.onPrevious = function() 
			{
				$scope.currentPage--;
				console.log("Previous"+$scope.currentPage);
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
			
			$scope.correctAnsCal = function()
			{
				var cnt=0;
				for(i=0;i<$scope.questions.length;i++)
				{
					if($scope.questions[i].correctAns==$scope.selected)
					{
						cnt++;
					}
					$log.debug("ans :"+$scope.questions[i].correctAns);
				
					
					
				}
				//$log.debug("anssel :"+$scope.selected.correctAns);
				
			}
			
			
		
			$scope.toggle = function(question, list) {
				var idx = list.indexOf(question);
				if (idx > -1)
					list.splice(idx, 1);
				else
					list.push(question);

			};

			$scope.exists = function(question, list) {
				return list.indexOf(question) > -1;
			};
			
			$scope.getQuestion();
		//	$scope.loadQuestionsList();

		});// end of examDemoCtr




