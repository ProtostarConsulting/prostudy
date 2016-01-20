angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside bookListCtr");

			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();

			$scope.addselectedBookId = $stateParams.addselectedBookId;


			$scope.book = {
				bookId : "",
				book_name : "",
				author : "",
				board : "",
				standard : "",
				chapters : []
			};// end of tempBook object
			
			$scope.books = [];
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks().then(function(bookList)
						{
							$log.debug("Inside Ctr getBooks");
							$scope.books = bookList;
							$scope.currentBook = $scope.books[0];
							$log.debug("$scope.currentBook :"
									+ angular.toJson($scope.currentBook));
						});
			     
			  	
			}// end of getBooks
			
			$scope.getBooks();
			
		

			$scope.tempMyBook = {
				user_name : $scope.curUser,
				book : $scope.currentBook

			};
			
			$scope.getStandard_BookbyID = function(selectedStdId) {
				
				$log.debug("Inside getStandard_BookbyID");
				
				var BookService = appEndpointSF.getBookService();
				

				BookService.getStandard_BookbyID(selectedStdId)
						.then(
								function(stdBookList) {
									$log.debug("Inside BookService.getStandard_BookbyID");
								$scope.stdBooks = stdBookList;
							/*		$scope.tempstdBook=$scope.stdBooks.length+1;
								//$scope.books = $scope.stdBooks;
									$scope.stdBook.stdId=$scope.tempstdBook.stdId;
									$log.debug("$scope.stdBook.stdId :-"+ angular.toJson($scope.tempstdBook));*/
									$log.debug("$scope.stdBooks :-"+ angular.toJson($scope.stdBooks));

								});

			};// end of $scope.getStandard_BookbyID
			

			
		
		     $scope.selected = [];
		      $scope.toggle = function (book, list) {
		        var idx = list.indexOf(book);
		        if (idx > -1) list.splice(idx, 1);
		        else list.push(book);
		      };
		      $scope.exists = function (book, list) {
		        return list.indexOf(book) > -1;
		      };//end of selected Book by checkbox
		      
	      
		

/*		   $scope.addselectedBookId = $stateParams.addselectedBookId;
		   $log.debug("$scope.addselectedBookId===="+$stateParams.addselectedBookId); 
			
			$scope.myBook=[];
			$scope.getBookbyID = function() {

				var UserService = appEndpointSF.getUserService();

				if (typeof $scope.addselectedBookId != 'undefined') {
					UserService.getBookbyID($scope.addselectedBookId).then(
							function(MyBooksList) {


								$scope.myBook = MyBooksList[0];

								$log.debug("$scope.myBook"
										+ angular.toJson($scope.myBook));
							});
				}
			};// end of getBookbyID

			$scope.getBookbyID();*/

			$scope.books = [];                           
			$scope.like = function(selectedBookId) {

				var BookService = appEndpointSF
						.getBookService();
				BookService.bookLikeCount(selectedBookId).then(
						function(bookList) {
							
							$log.debug("Inside Ctr like");
							
							for(i=0 ;i< $scope.books.length;i++)
							{
								if($scope.books[i].bookid == selectedBookId)
									{
									 $scope.books[i].likes++;
									 break;
									}
								
							}

						});

			}
			
			$scope.dislike = function(selectedBookId) {


				var BookService = appEndpointSF
						.getBookService();
				BookService.bookDislikeCount(selectedBookId).then(
						function(bookList) {
							$log.debug("Inside Ctr dislike");
							
							for(i=0 ;i< $scope.books.length;i++)
							{
								if($scope.books[i].bookid == selectedBookId)
									{
									 $scope.books[i].dislikes++;
									 break;
									}
								
							}

						});

			}

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			

		});// end of bookListCtr

