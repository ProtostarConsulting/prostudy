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
					};
					
					$scope.Chapters = [];

				
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedBookId:",$stateParams.selectedBookId);
					$scope.selectedBookId = $stateParams.selectedBookId;
					
					$scope.showBookContents = function() {
						var BookService = appEndpointSF.getBookService();
						$log.debug("$scope.selectedBookId:"+ $scope.selectedBookId);
						BookService.getBookbyID($scope.selectedBookId)
								.then(
										function(bookList) {
										$scope.Chapters = bookList.chapters;										
										$log.debug("$scope.selectedChapter :" +angular.toJson($scope.selectedChapter));
										$log.debug("$scope.bookList :" +angular.toJson(bookList));
										});

					};

					
					$scope.showBookContents();

					$scope.cancelButton = function() {
						$log.debug("inside cancelButton");
						$state.go('^', {});
					};

				});

