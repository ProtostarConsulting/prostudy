angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams,appEndpointSF, $state, $sce) {
			console.log("Inside bookListCtr");

			$scope.book = {  bookid: "",book_name : "",author: "", board: "", 
		             standard:"",chapters:[] 
                 };//end of tempBook object
			
				
			$scope.addToMyBook =function()
			{
				
			};//end of $scope.addToMyBook
			
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
			

	
			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			

		});// end of bookListCtr

