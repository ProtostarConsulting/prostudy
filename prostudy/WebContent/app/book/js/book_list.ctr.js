angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside bookListCtr");
			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
			
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple()
						.content('Added Book to MyBooks!').position("top")
						.hideDelay(3000));
			};
		
			$scope.addselectedBookId = $stateParams.addselectedBookId;

			
			$scope.book = {
				bookId : "",
				book_name : "",
				author : "",
				board : "",
				standard : "",
				chapters : [],
				user :""
			};// end of tempBook object 
			
			$scope.books = [];
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks($scope.curUser.id).then(function(bookList)
						{
							$log.debug("Inside Ctr getBooks");
							$scope.books = bookList;
					/*		$scope.currentBook = $scope.books[0];
							$log.debug("$scope.currentBook :"
									+ angular.toJson($scope.currentBook));*/
						});
			     
			  	
			}// end of getBooks
			
			$scope.getBooks();
			
		

			$scope.tempMyBook = {
				user_name : $scope.curUser,
				book : $scope.currentBook

			};
		
			$scope.addBookToMyList = function(selectedBookId) {
				var selectedBook = null;
				for (var i =0; i < $scope.books.length; i++){							
					if($scope.books[i].bookId == selectedBookId){
						selectedBook = $scope.books[i];
						break;
					}
				}
				
				$scope.curUser.myBooks.push(selectedBook);
				
				$scope.updateUser();

			}
			
			$scope.updateUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.curUser).then(function(msgBean) {
					
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();
					$scope.tempUser = {
						};
					});
				
			}

		     $scope.selected = [];
		      $scope.toggle = function (book, list) {
		        var idx = list.indexOf(book);
		        if (idx > -1) list.splice(idx, 1);
		        else list.push(book);
		      };
		      $scope.exists = function (book, list) {
		        return list.indexOf(book) > -1;
		      };//end of selected Book by checkbox
		      
	      
		


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

