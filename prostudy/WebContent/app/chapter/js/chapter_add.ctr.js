angular.module("prostudyApp").controller(
		"chapterAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state, appEndpointSF) {

			console.log("Inside chapterAddCtr");
	  
			$scope.tempChapter = {chapterId: "", chapter_name: "",chapter_content: "", board:"", student_class:"",subject:""};
			$scope.chapters = []; 
			


			$scope.tempChapter = {
				chapterId :"",
				chapter_name : "",
				chapter_content : "",
				board : "",
				student_class : "",
				subject : ""
			};
			$scope.chapters = [];


			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Chapter Saved!')
						.position("top").hideDelay(3000));

			};
			
			$scope.addChapter = function()
			{
				$log.debug("No1");	

			};// end of showSavedToast

			$scope.addChapter = function() {
				$log.debug("No1");

				var ChapterService = appEndpointSF.getChapterService();

				ChapterService.addChapter($scope.tempChapter).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addChapter");
							$log.debug("msgBean.msg:" + msgBean.msg);

							$scope.showSavedToast();

							$log.debug("tempChapter" + $scope.tempChapter);
							$scope.tempChapter = {
									chapterId : "",
								chapterId :"",
								chapter_name : "",
								chapter_content : "",
								board : "",
								student_class : "",
								subject : ""
							};// After Click Submit button,htmlform to be set
								// as blank
						});
				$log.debug("No4");
			}// end of addChapter

			$scope.cancelButton = function() {
				// $log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

		});// end of chapterAddCtr

