angular
		.module("prostudyApp")
		.controller(
				"chapterEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, appEndpointSF, $state, $sce, $stateParams) {
					console.log("Inside chapterEditCtr");
					
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple()
								.content('Chapter Updated!').position("top")
								.hideDelay(3000));
					};

					$scope.Chapter = {
						id:"",
						chapterId :"",
						chapter_name : "",
						chapter_content : "",
						board : "",
						standard : "",
						subject : "",
					};
					$scope.chapters = [];
					$scope.chapter = [];
					$("#updateChapter").hide();
					$("#viewChapter").hide();
					$("#editChapterList").show();

					$scope.selected = [];

					$scope.getChaptersByInstitute = function() {

						var ChapterService = appEndpointSF.getChapterService();
						ChapterService.getChaptersByInstitute($scope.curUser.instituteID)
								.then(
										function(chapterList) {
											$scope.chapters = chapterList;		
													
											
										});
					}
					$scope.getChaptersByInstitute();

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
						$log.debug("$scope.chapter : "+ angular.toJson($scope.chapter));

						$("#updateChapter").hide();
						$("#viewChapter").hide();
						$("#editChapterList").show();
					};// end of update

					$scope.view = function() {
						$scope.viewChapter = $scope.chapters;
						$log.debug("$scope.chapter :" + $scope.chapter);
						$log.debug("$scope.viewChapter : "
								+ angular.toJson($scope.viewChapter));

						$("#viewChapter").show();
						$("#updateChapter").hide();
						$("#editChapterList").hide();
					};// end of update
					
					$scope.getChaptersByID = function() {

						var ChapterService = appEndpointSF.getChapterService();
						ChapterService.getChaptersByID($scope.curUser.instituteID)
								.then(
										function(chapterList) {
											$scope.chapters = chapterList;		
													
											
										});
					}
					$scope.getChaptersByInstitute();

					$scope.cancelButton = function() {
						$log.debug("inside cancelButton");
						$state.go('^', {});
					};// end of cancelButton

					$scope.updateChapter = function() {

						var ChapterService = appEndpointSF.getChapterService();
						ChapterService.updateChapter($scope.chapter).then(function(updatedCh) {
									
									$scope.showSavedToast();
									$state.go('^', {});
								});
						
					};

				});// end of chapterEditCtr
