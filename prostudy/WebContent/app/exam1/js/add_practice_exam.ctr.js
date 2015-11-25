angular.module("prostudyApp").controller(
		"addPracticeExamCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state,$stateParams) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('PracticeExam Saved!')
						.position("top").hideDelay(3000));
			};

			
			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedExamId:",
					$stateParams.selectedExamId);

			$scope.selectedExamId = $stateParams.selectedExamId;
			$scope.showselectedExam = function() {
				var PracticeExamService = appEndpointSF.getPracticeExamService();

				PracticeExamService.getPracticeExamById($scope.selectedExamId).then(function(practiceTest) {
									$scope.Test = practiceTest[0];
									$log.debug("$scope.showselectedExam:practiceTest ===="+ angular.toJson($scope.Test));
								});

			}
			$scope.showselectedExam();
				$scope.tempPracticeExam = {
						examId:"",
					examtitle:"",
					board: "",
					standard:"",
					subject:"",
					questions:[],
					date:""
				};
			$scope.questions = [];
			$scope.practiceTest = [];
			$scope.Test = [];
			$scope.getQuestion = function() {

				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.getQuestion().then(function(questionList) {
				$log.debug("Inside Ctr getQuestion");
				$scope.questions = questionList;
				});
			}
			
			 

			/*$scope.getPracticeExamById = function(selectedExamId) {

				var QuestionService = appEndpointSF.getQuestionService();
				QuestionService.getQuestion().then(function(questionList) {
				$log.debug("Inside Ctr getQuestion");
				$scope.questions = questionList;
				});
			}*/
			
			$scope.getQuestion();
			$scope.getPracticeExams = function() {

				var PracticeExamService = appEndpointSF.getPracticeExamService();
				PracticeExamService.getPracticeExams().then(function(practiceExamList) {
				$log.debug("Inside Ctr getPracticeExam");
			
				$scope.practiceTest = practiceExamList;
				
				
				
				});
			}
			
			
			$scope.getPracticeExams();
			
			$scope.getSelected= function() {
				$scope.tempPracticeExam.examtitle=$scope.examtitle;
				$scope.tempPracticeExam.board=$scope.board;
				$scope.tempPracticeExam.standard=$scope.standard;
				$scope.tempPracticeExam.subject=$scope.subject;
				$scope.tempPracticeExam.date=new Date();
				
			}
			
			/*$scope.createPracticeExam= function() {
				for (var i= 0 ;i < $scope.selected.length; i++ ){					
					$scope.tempPracticeExam.questions.push($scope.selected[i]);
				}
				
				console.log("Selected Data:"+$scope.tempPracticeExam.board);
				console.log("Selected Data:"+$scope.tempPracticeExam.questions[0].description);
				console.log("Selected Data:"+$scope.tempPracticeExam.questions);
				console.log("Selected datetime:"+$scope.tempPracticeExam.date);
				console.log("Selected Data:"+$scope.tempPracticeExam.questions[0].option1);
				$state.go('exam.viewpracticeexam', {});
			}*/
			
	
			$scope.addPracticeExam = function(){
				$log
				.debug("No1");	
				var practiceExamService = appEndpointSF.getPracticeExamService();
				for (var i= 0 ;i < $scope.selected.length; i++ ){					
					$scope.tempPracticeExam.questions.push($scope.selected[i]);
				}
				
										
				practiceExamService.addPracticeExam($scope.tempPracticeExam)
				.then(
						function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addInstitute");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempPracticeExam = {
									examId:"",
								examtitle:"",
								board: "",
								standard:"",
								subject:"",
								questions:[],
								date:""
							};
						});
				$log
				.debug("No4");	
				$state.go('exam.listpracticeexam', {});
			}
			
			
			$scope.selected = [];
			
			
			$scope.removeQuestion = function(index) {
				$scope.questions.splice(index, 1);
			}; // end of removeQuestion

			$scope.clickCancelButton = function() {

				console.log("inside cancelButton");
				$state.go('^', {});

			};// end of cancelButton

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
			//$scope.getQuestion();

		});
/*	$scope.addPracticeExam = function()
{
 $log.debug("No1"); 
 var QuestionService = appEndpointSF.getQuestionService();
       
 QuestionService.addPracticeExam($scope.tempQues)
 .then(function(msgBean) {
    $log.debug("No6"); 
    $log.debug("Inside Ctr addPracticeExam");
    $log.debug("msgBean.msg:" + msgBean.msg);
    $scope.showSavedToast();
   
    $log.debug("addPracticeExam"+ $scope.tempQues);
   });
 $log.debug("No4"); 
}//end of addPracticeExam
*/
/*	$scope.modify = function(selectedQuestion) {
	$scope.editingData[selectedQuestion.description] = true;
	$scope.question = selectedQuestion;
};

$scope.updateQuestion = function(toUpdateQObject) {

	$log.debug("$scope.updateQuestion");
	var QuestionService = appEndpointSF.getQuestionService();

	QuestionService.updateQuestion(toUpdateQObject).then(
			function(msgBean) {
				$scope.showSavedToast();

			});
};// end of update
*/	