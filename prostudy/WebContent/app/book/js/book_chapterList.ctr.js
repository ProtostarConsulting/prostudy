angular
		.module("prostudyApp")
		.controller("book_chapterListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, appEndpointSF, $state,
						$sce) {
					console.log("Inside book_chapterListCtr");

					$scope.curUser = appEndpointSF.getUserService()
							.getLoggedinUser();

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Book added in My Books!').position("top").hideDelay(
								3000));
					};// end of showSavedToast

				
					//$log.debug("$scope.selectedBookId====:", $scope.selectedBookId);
					$scope.addMyBook = function() {
						$log.debug("No1");
						var UserService = appEndpointSF.getUserService();
						UserService.addMyBook(UserService.getBookId($scope.selectedBookId))
								.then(function() {
									$log.debug("No6");
									$log.debug("Inside Ctr addMyBook");

									$scope.showSavedToast();

								});
						$log.debug("No4");
					}

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
						BookService.getBooksByID($scope.selectedBookId)
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

