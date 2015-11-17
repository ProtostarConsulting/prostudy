angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, appEndpointSF, $state, $sce) {
			console.log("Inside bookListCtr");

			
			$scope.tempBook = {bookid:"",author: "", title: "",chapters:[] };//end of tempBook object 

			$("#updatebook").hide();
			$("#viewbook").hide();
			$("#bookList").show();

			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Book Saved!')
						.position("top").hideDelay(3000));
			};//end of showSavedToast
			
			$scope.selected = [];
			$scope.books = [];
			
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks().then(
						function(bookList) {
							$log.debug("Inside Ctr getBooks");

							$scope.books = bookList;
							$log.debug("getBooks :"+ $scope.books);
							$scope.showSavedToast();
							
							/*$scope.books.chapters.chapter_content = $sce.trustAsHtml($scope.books.chapters.chapter_content);*/
							/*$log.debug("$scope.books.chapters.chapter_content: " + $scope.books.chapters.chapter_content);*/
						});
			}// end of getBooks
			
			
		
			
		
			$scope.editingData = [];
			for (var i = 0, length = $scope.books.length; i < length; i++) {
				$scope.editingData[$scope.books[i].id] = false;
			}

			$scope.modify = function(selectedBooks) {
				$scope.editingData[selectedBooks.id] = true;
				$scope.book = selectedBooks;

				$("#updatebook").show();
				$("#bookList").hide();
				$("#viewbook").hide();

			};

			$scope.update = function(book) 
			{
				$scope.editingData[books.id] = false;
				$scope.book = $scope.selected[0];
				$log.debug("Object value of  update : " +	 angular.toJson($scope.book));
				
				$("#updatebook").hide();
				$("#bookList").show();
				$("#viewbook").hide();
			
			};// end of update
			
			
			
			$scope.view = function(book)
			{
				$scope.viewBook = $scope.book;
				$log.debug("Book View :"+	$scope.book);
				$log.debug("Object value of  View : " +	 angular.toJson($scope.viewBook));
				
				$("#updatebook").hide();
				$("#bookList").hide();
				$("#viewbook").show();
				
				
			};// end of update
			
			
			


			$scope.removeChapter = function(index) {

				$scope.books.splice(index, 1);
			}; // end of remove

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			$scope.getBooks ();

		});// end of bookListCtr
