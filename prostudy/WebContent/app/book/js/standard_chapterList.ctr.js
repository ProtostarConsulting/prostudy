angular
		.module("prostudyApp")
		.controller("standard_chapterListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF, $state,
						$sce) {
					console.log("Inside standard_chapterListCtr");

			
					$scope.selectedChapter = {
						id : "",
						chapterId :"",
						chapter_name : "",
						chapter_content : "",
						board : "",
						student_class : "",
						subject : "",
					};

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedBookId:",$stateParams.selectedBookId);
					$scope.selectedBookId = $stateParams.selectedBookId;
					
					$scope.showBookContents = function() {
						var BookService = appEndpointSF.getBookService();
						$log.debug("$scope.selectedBookId:"+ $scope.selectedBookId);
						BookService.getBookbyID($scope.selectedBookId)
								.then(
										function(bookList) {
										$scope.book_ChapterDetails = bookList[0];										

										$scope.book_ChapterDetails = bookList.chapters;
											
										$scope.selectedChapter = $scope.book_ChapterDetails;
											$log.debug("$scope.selectedChapter :-"+ angular.toJson($scope.selectedChapter));

										});

					};// end of $scope.showBookDetails

					$scope.book_ChapterDetails = [];
					$scope.showBookContents();

					$scope.cancelButton = function() {
						$log.debug("inside cancelButton");
						$state.go('^', {});
					};// end of cancelButton

				});// end of book_chapterListCtr

