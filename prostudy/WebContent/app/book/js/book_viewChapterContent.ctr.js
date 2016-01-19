angular.module("prostudyApp")
		.controller(
				"book_viewChapterContentCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF, $state,
						$sce) {
					console.log("Inside book_viewChapterContentCtr");

					$scope.tempChapter = {
						id : "",
						chapterId : "",
						chapter_name : "",
						chapter_content : "",
						board : "",
						student_class : "",
						subject : "",
					};

					// For chapter_content, we pass its chapter.id as
					// selectedChapterId

					$log.debug("$stateParams:", $stateParams);
				
					$scope.selectedChapterId = $stateParams.selectedChapterId;
					$log.debug("$scope.selectedChapterId:"+ $scope.selectedChapterId)

					$scope.chapters = [];
					
					$scope.showChapterContent = function() {
						$log.debug("Inside showChapterContent ");
						var ChapterService = appEndpointSF.getChapterService();

						//$log.debug("$scope.selectedChapterId:"+ $scope.selectedChapterId)
						ChapterService.getChaptersByID($scope.selectedChapterId).then(
										function(chapterList) {

											$scope.chapters = chapterList;
											$log.debug("$scope.chapters...  ===="+ angular.toJson($scope.chapters));

											
										});

					};// end of $scope.showChapterContent
			
				    $scope.showChapterContent();

					$("#viewChapterContent").show();
					$("#TotalChapters").hide();
/*
					$log.debug("$stateParams:", $stateParams);
					$scope.selectedBookId = $stateParams.selectedBookId;
					$log.debug("$scope.selectedBookId:"+ $scope.selectedBookId)
					
					$scope.getChapters = function() {
						
						var BookService = appEndpointSF.getBookService();

						BookService.getBookbyID($scope.selectedBookId).then(function(bookList)
										{

											$scope.book_ChapterDetails = bookList;
											$log.debug("bookList ===="+ angular.toJson(bookList));
											$scope.selectedChapter = $scope.book_ChapterDetails[0];

											$log.debug("$scope.selectedChapter ===="+ angular.toJson($scope.selectedChapter));

											$scope.totalPages = Math.round($scope.selectedChapter.length/ $scope.itemsPerPage);

											$scope.onNextChapter();
											$("#viewChapterContent").hide();
											$("#TotalChapters").show();

										});

					};// end of $scope.getChapters

					$scope.book_ChapterDetails = [];*/
					
					
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedBookId:",$stateParams.selectedBookId);
					$scope.selectedBookId = $stateParams.selectedBookId;
					
					$scope.viewChapterContent = function() {
						var BookService = appEndpointSF.getBookService();
						$log.debug("$scope.selectedBookId:"
								+ $scope.selectedBookId)


						BookService
								.getBookbyID($scope.selectedBookId)
								.then(
										function(bookList) {

										$scope.book_ChapterDetails = bookList.chapters;
											
										$scope.selectedChapter = $scope.book_ChapterDetails;
										
										$log.debug("$scope.selectedChapter ===="+ angular.toJson($scope.selectedChapter));

										$scope.totalPages = Math.round($scope.selectedChapter.length/ $scope.itemsPerPage);

											$log.debug("$scope.selectedChapter :-"+ angular.toJson($scope.selectedChapter));
											
											$scope.onNextChapter();
											$("#viewChapterContent").hide();
											$("#TotalChapters").show();

										});

					};// end of $scope.showBookDetails
					$scope.book_ChapterDetails=[];
					

					// For chapters on next and previous button

					$scope.currentPage = 0;
					$scope.totalPages = 0;
					$scope.itemsPerPage = 1;
					$scope.count = 0;
					$scope.isDisabledPrevious = false;
					$scope.isDisabledNext = false;

					$scope.onNextChapter = function() {
						$log.debug("Inside onNextChapter");

						$scope.currentPage++;
						$scope.count = $scope.currentPage;

						for (i = 0; i < $scope.selectedChapter.length; i++) {
							$scope.chaptersOnButton = $scope.selectedChapter
									.slice(
											($scope.currentPage * $scope.itemsPerPage)
													- $scope.itemsPerPage,
											($scope.currentPage * $scope.itemsPerPage));
							$log.debug(" $scope.chaptersOnButton "+ angular.toJson($scope.chaptersOnButton));

						}
						console.log("$scope.currentPage=" + $scope.currentPage);

						if ($scope.currentPage == $scope.totalPages) {
							$scope.isDisabledNext = true;
							alert("No more questions. Please use previous button.");
							return false;

						} else {
							$scope.isDisabledPrevious = false;
							return true;
						}

					}// end of onNextChapter

					$scope.onPreviousChapter = function() {
						$scope.currentPage--;
						console.log("Previous" + $scope.currentPage);

						for (i = 0; i < $scope.selectedChapter.length; i++) {
							$scope.chaptersOnButton = $scope.selectedChapter
									.slice(
											($scope.currentPage * $scope.itemsPerPage)
													- $scope.itemsPerPage,
											($scope.currentPage * $scope.itemsPerPage));
							$log.debug(" $scope.chaptersOnButton "
									+ angular.toJson($scope.chaptersOnButton));
						}
						console.log("$scope.currentPage=" + $scope.currentPage);

						if ($scope.currentPage <= 1) {
							$scope.isDisabledPrevious = true;
							alert("No more questions. Please use next button.");
							return false;

						} else {
							$scope.isDisabledNext = false;
							return true;
						}

					}// end of onPreviousChapter

				});// end of book_viewChapterContentCtr

