angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside bookListCtr");
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Added Succefully!').position("top")
						.hideDelay(3000));
			};// end of showSavedToast

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

			$scope.addMyBook = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.addMyBook($scope.curUser,$scope.addselectedBookId).then(
						function() {
							$log.debug("No6");
							$log.debug("Inside Ctr addMyBook");
						
							$scope.showSavedToast();
							
						});
				$log.debug("No4");
			}
			
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks().then(
						function(bookList) {
							$log.debug("Inside Ctr getBooks");

							$scope.books = bookList;
							$scope.currentBook = $scope.books[0];
							$log.debug("current book :"
									+ angular.toJson($scope.currentBook));
						});
			}// end of getBooks
			
			
			
			//----------------------------------------
			
			
			
			$scope.getBookbyID = function() {

				var UserService = appEndpointSF
						.getUserService();
				
				if (typeof $scope.addselectedBookId != 'undefined')
					{
				UserService.getBookbyID($scope.addselectedBookId).then(
						function(MyBooksList) {

							$scope.myBook = MyBooksList[0];
						
							$log.debug(" ********************"+angular.toJson($scope.myBook));
							/*$scope.books1 = $scope.books[0];*/
						});
					}
			}

			$scope.myBook=[];
			$scope.getBookbyID();
			
			
			
			//------------------------------------------
			
			
			

			/*$scope.tempMyBook = {
					user_name :$scope.curUser.name,
					bookid : "",
					book_name : "",
					author : "",
					board : "",
					standard : "",
					chapters : []
			};
			$scope.myBooks = [];

			$scope.addMyBook = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.addMyBook($scope.tempMyBook).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addMyBook");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempMyBook = {
									user_name :$scope.curUser.name,
									bookid : "",
									book_name : "",
									author : "",
									board : "",
									standard : "",
									chapters : []
							};
						});
				$log.debug("No4");
			}*/

			$scope.books = [];
			
			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton
			
			$scope.getBooks();

		});// end of bookListCtr

