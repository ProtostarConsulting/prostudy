angular
		.module("prostudyApp")
		.controller(
				"chapterEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce) {
					console.log("Inside chapterEditCtr");

					$scope.Chapter = {
						chapterId :"",
						chapter_name : "",
						chapter_content : "",
						board : "",
						student_class : "",
						subject : "",
					};
					$scope.chapters = [];

					$("#updateChapter").hide();
					$("#viewChapter").hide();
					$("#editChapterList").show();

					$scope.selected = [];

					$scope.getChapters = function() {

						var ChapterService = appEndpointSF.getChapterService();

						ChapterService.getChapters().then(function(chapterList)
								{
											$log.debug("Inside Ctr getChapters");

											$scope.chapters = chapterList;
											$log.debug("chapters :"
													+ $scope.chapters);

						/*					$scope.chapters.chapter_content = $sce
													.trustAsHtml($scope.chapters.chapter_content);
											$log
													.debug("$scope.chapters.chapter_content: "
															+ $scope.chapters.chapter_content);*/
										});
					}// end of getChapters
					
					$scope.getChapters();

					$scope.editingData = [];
					for (var i = 0, length = $scope.chapters.length; i < length; i++) {
						$scope.editingData[$scope.chapters[i].id] = false;
					}

					$scope.modify = function(selectedChapters) {
						$scope.editingData[selectedChapters.id] = true;
						$scope.chapter = selectedChapters;

						$("#updateChapter").show();
						$("#editChapterList").hide();
						$("#viewChapter").hide();

					};

					$scope.update = function(chapter) {
						$scope.editingData[$scope.chapters.id] = false;
						$scope.chapter = $scope.selected[0];
						$log.debug("$scope.chapter : "
								+ angular.toJson($scope.chapter));

						$("#updateChapter").hide();
						$("#viewChapter").hide();
						$("#editChapterList").show();
					};// end of update

					$scope.view = function(chapter) {
						$scope.viewChapter = $scope.chapter;
						$log.debug("$scope.chapter :" + $scope.chapter);
						$log.debug("$scope.viewChapter : "
								+ angular.toJson($scope.viewChapter));

						$("#viewChapter").show();
						$("#updateChapter").hide();
						$("#editChapterList").hide();
					};// end of update

					$scope.cancelButton = function() {
						$log.debug("inside cancelButton");
						$state.go('^', {});
					};// end of cancelButton

					

				});// end of chapterEditCtr
