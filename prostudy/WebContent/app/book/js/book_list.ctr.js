angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams,appEndpointSF, $state, $sce) {
			console.log("Inside bookListCtr");

			$scope.book = {  bookid: "",book_name : "",author: "", board: "", 
		             standard:"",chapters:[] 
                 };//end of tempBook object
			
		
			
			//Because chapterlist data is in another page. so pass  selectedBookId for chapterlist
			
			
			$scope.showSavedChapterListToast = function() {
				$mdToast.show($mdToast.simple().content('ChapterList Saved!')
						.position("top").hideDelay(3000));
			};//end of showSavedToast
			

			$scope.selectedBookId = $stateParams.selectedBookId;
			
			$scope.selectedChapter = {id: "", chapter_name: "",chapter_content: "", board:"", student_class:"",subject:"",chapter_no:""};
			
			
			
			$scope.showBookContents = function() {
				var BookService = appEndpointSF.getBookService();
				$log.debug("$scope.selectedBookId:" + $scope.selectedBookId)
				BookService.getBooksByID($scope.selectedBookId)
						.then(function(bookList) {
							
					
							$scope.book_ChapterDetails = bookList;
							$log.debug("bookList ===="+ angular.toJson(bookList));
							$scope.selectedChapter = $scope.book_ChapterDetails[0];
							
									
									$log.debug("$scope.selectedChapter ===="+ angular.toJson($scope.selectedChapter));
									
									$scope.showSavedChapterListToast();
								});
		

			};//end of $scope.showBookDetails
			
			$scope.book_ChapterDetails = [];
			$scope.showBookContents();
			
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks().then(
						function(bookList) {
							$log.debug("Inside Ctr getBooks");

							$scope.books = bookList;
							$scope.currentBook =$scope.books[0];
							$log.debug("getBooks :" + angular.toJson($scope.books));
							
							
							$scope.showSavedToast();
						
						});
			}// end of getBooks
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('BookList Saved!')
						.position("top").hideDelay(3000));
			};//end of showSavedToast
		
			
			$scope.books =[];
			$scope.getBooks();
			

			$scope.removeBook = function(index) {

				$scope.books.splice(index, 1);
			}; // end of remove

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			

		});// end of bookListCtr

