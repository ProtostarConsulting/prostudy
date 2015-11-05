angular.module("prostudyApp").controller(
		"chapterEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce) {
			console.log("Inside chapterEditCtr");

			$scope.Chapter = {
				id : "",
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

			$scope.getChapters = function() {

				var ChapterService = appEndpointSF.getChapterService();

				ChapterService.getChapters().then(
						function(chapterList) {
							$log.debug("Inside Ctr getChapters");

							$scope.chapters = chapterList;
							$log.debug("getChapters :"+$scope.chapters);
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

			$scope.update = function(chapters) {
				$scope.editingData[chapters.id] = false;
				$scope.chapter = $scope.selected[0];
				
				$("#updateChapter").hide();
				$("#viewChapter").hide();
				$("#chapterList").show();
			};// end of update
			
			$scope.view = function(chapter) {
				$scope.chapter = $scope.selected[0];
				 
				$("#viewChapter").show();
				$("#updateChapter").hide();
				$("#chapterList").hide();
			};// end of update
			
			
			

	/*		$scope.updateChapterList = function() {
				$log.debug("updateChapter");
				var ChapterService = appEndpointSF.getChapterService();

				ChapterService.addChapter($scope.selected[0]).then(
						function(msgBean) {
							$scope.chapters = $scope.selected[0];
							$log.debug("No6");
							$log.debug("Inside Ctr updateChapterList");
							$log.debug("msgBean.msg:" + msgBean.msg);

						
							$log.debug("updateChapterListaddChapter" + $scope.selected[0]);
						});

				 $scope.selected[0]='';

				$("#updateChapter").hide();
				$("#chapterList").show();
			}// end of updateChapter
*/
			$scope.removeChapter = function(index) {

				$scope.chapters.splice(index, 1);
			}; // end of remove

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			$scope.getChapters();

		});// end of chapterEditCtr
