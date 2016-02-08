angular.module("prostudyApp").controller(
		"addPracticeExamCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $sce, $filter,standardList,boardList,subjectList) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Practice Exam Saved!')
						.position("top").hideDelay(3000));
			};
			 $scope.standards = [{}];
		     $scope.standards = standardList;
		     
		     $scope.boards = [{}];
		     $scope.boards = boardList;	
		     
		     $scope.subjects = [{}];
		     $scope.subjects = subjectList;	
		     
			$scope.tempPracticeExam = {
				examId : "",
				examtitle : "",
				board : "",
				standard : "",
				subject : "",
				category : "",
				instructions : "",
				questions : [],
				date : "",
				likes :0,
				dislikes :0
			};
			$scope.questions = [];

			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.getQuestion().then(function(questionList) {
					$log.debug("Inside Ctr getQuestion");
					$scope.questions = questionList;
				});
			}

			$scope.getQuestion();


			$scope.addPracticeExam = function() {
				$log.debug("No1");
				var practiceExamService = appEndpointSF
						.getPracticeExamService();
				for (var i = 0; i < $scope.selected.length; i++) {
					$scope.tempPracticeExam.questions.push($scope.selected[i]);
				}

				practiceExamService.addPracticeExam($scope.tempPracticeExam)
						.then(function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addPracticeExamCtr");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempPracticeExam = {
								examId : "",
								examtitle : "",
								board : "",
								standard : "",
								subject : "",
								category :"",
								instructions : "",
								questions : [],
								date : "",
								likes :"",
								dislikes :"",
							};
						});
				$log.debug("No4");
				$state.go('exam.listpracticeexam', {});
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
				$scope.cancelButton = function() {
					$state.go("exam", {});
				}
				
				
				$scope.checkValidation = function() {
					if($scope.tempPracticeExam.examId=="")
					{
						alert("Please Enter the Examtitle");			
					}
					if($scope.tempPracticeExam.examtitle=="")
					{
						alert("Please Enter the Examtitle");	
						
					}
					if($scope.tempPracticeExam.standard==false)
					{
						alert("Please Select the Standard");	
						
					}
					if($scope.tempPracticeExam.board==false)
					{
						alert("Please Select the Board");				
					}
					if($scope.tempPracticeExam.subject==false)
					{
						alert("Please Select the Subject");				
					}
					if($scope.tempPracticeExam.category=="")
					{
						alert("Please Enter the Category");				
					}
					if($scope.selected=="")
					{
						alert("Please select the questions which you want to add into Practice Exam");		
					}
				
				}
				
			

		});
