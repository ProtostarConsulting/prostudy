angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside bookListCtr");
			

			$scope.curUser = appEndpointSF.getUserService().getLoggedinUser();
			
			$scope.addselectedBookId = $stateParams.addselectedBookId;
			
			$log.debug("$scope.addselectedBookId===="+$stateParams.addselectedBookId); 

			$scope.book = {
				bookid : "",
				book_name : "",
				author : "",
				board : "",
				standard : "",
				chapters : []
			};// end of tempBook object
			
			$scope.tempMyBook = {
					user_name : $scope.curUser,
					book : $scope.currentBook
					
			};
			$scope.myBooks = [];


			
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks().then(
						function(bookList) {
							$log.debug("Inside Ctr getBooks");

							$scope.books = bookList;
							$scope.currentBook = $scope.books[0];
							$log.debug("$scope.currentBook :"
									+ angular.toJson($scope.currentBook));
						});
			}// end of getBooks
			
			$scope.getBookbyID = function() {

				var UserService = appEndpointSF.getUserService();
				
				if (typeof $scope.addselectedBookId != 'undefined')
					{
				UserService.getBookbyID($scope.addselectedBookId).then(
						function(MyBooksList) {

							$scope.myBook = MyBooksList[0];
						
							$log.debug("$scope.myBook"+angular.toJson($scope.myBook));
						});
					}
			};//end of getBookbyID

			$scope.myBook=[];
			$scope.getBookbyID();
			

			$scope.books = [];
			
			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton
			
			$scope.getBooks();

		});// end of bookListCtr

