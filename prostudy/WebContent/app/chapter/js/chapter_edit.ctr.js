angular.module("prostudyApp").controller(
		"chapterEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce) {
			console.log("Inside chapterEditCtr");

			$scope.Chapter = {
				id : "",
				chapter_name : "",
				chapter_content : "",
				board : "",
				student_class : "",
				subject : "",
				chapter_no : ""
			};
			$scope.chapters = [];

			$("#updateChapter").hide();
			$("#viewChapter").hide();
			$("#chapterList").show();

			$scope.selected = [];
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Book Saved!')
						.position("top").hideDelay(3000));
			};//end of showSavedToast

			$scope.getChapters = function() {

				var ChapterService = appEndpointSF.getChapterService();

				ChapterService.getChapters().then(
						function(chapterList) {
							$log.debug("Inside Ctr getChapters");

							$scope.chapters = chapterList;
							$log.debug("getChapters :"+$scope.chapters);
							$scope.showSavedToast();
							
							$scope.chapters.chapter_content = $sce.trustAsHtml($scope.chapters.chapter_content);
							$log.debug("$scope.chapters.chapter_content: " + $scope.chapters.chapter_content);
						});
			}// end of getChapters

			$scope.editingData = [];
			for (var i = 0, length = $scope.chapters.length; i < length; i++) {
				$scope.editingData[$scope.chapters[i].id] = false;
			}

			$scope.modify = function(selectedChapters) {
				$scope.editingData[selectedChapters.id] = true;
				$scope.chapter = selectedChapters;

				$("#updateChapter").show();
				$("#chapterList").hide();
				$("#viewChapter").hide();

			};

			$scope.update = function(chapter) 
			{
				$scope.editingData[$scope.chapters.id] = false;
				$scope.chapter = $scope.selected[0];
				$log.debug("Object value of  update : " +	 angular.toJson($scope.chapter));
				
				$("#updateChapter").hide();
				$("#viewChapter").hide();
				$("#chapterList").show();
			};// end of update
			
			
			
			$scope.view = function(chapter)
			{
				$scope.viewChapter = $scope.chapter;
				$log.debug("Chapter View :"+	$scope.chapter);
				$log.debug("Object value of  View : " +	 angular.toJson($scope.viewChapter));
				
				 
				$("#viewChapter").show();
				$("#updateChapter").hide();
				$("#chapterList").hide();
			};// end of update
			
			
	
			$scope.removeChapter = function(index) {

				$scope.chapters.splice(index, 1);
			}; // end of remove

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			$scope.getChapters();

		});// end of chapterEditCtr
