angular.module("prostudyApp").controller(
		"bookListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside bookListCtr");
			$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
			$log.debug("$scope.curUser :"+angular.toJson($scope.curUser));
			
			
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple()
						.content('Added Book to MyBooks!').position("top")
						.hideDelay(3000));
			};
		
			$scope.books = [];
			$scope.newUser = [];
			
			$scope.getBooksByInstitute = function() {

				var BookService = appEndpointSF.getBookService();
				BookService.getBooksByInstitute($scope.curUser.instituteID)
						.then(
								function(bookList) {
									$scope.books = bookList;		
											
									
								});
			}
			$scope.getBooksByInstitute();

			$scope.getUserByEmailID = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByEmailID($scope.curUser.email_id)
						.then(
								function(user) {
									$scope.newUser = user;		
									
								});
			}
			$scope.getUserByEmailID();
		
		
			$scope.addBookToMyList = function(selectedBookId) {
				var selectedBook = null;
				for (var i =0; i < $scope.books.length; i++){							
					if($scope.books[i].id == selectedBookId){
						selectedBook = $scope.books[i];
						break;
					}
				}
				
				if (typeof $scope.newUser.myBooks === 'undefined')
					$scope.newUser.myBooks = [];
				
				$scope.newUser.myBooks.push(selectedBook);
				
				$scope.updateUser();

			}
			
			$scope.updateUser = function() {
				$log.debug("No1");
				var UserService = appEndpointSF.getUserService();
				UserService.updateUser($scope.newUser).then(function(msgBean) {
					
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showSavedToast();
					$scope.tempUser = {
						};
					});
				
			}

		    
		      $scope.books = []; 
		      
		      $scope.like = function(selectedBookId) {

					for (i = 0; i < $scope.books.length; i++) {
						if ($scope.books[i].id == selectedBookId) {

							$scope.books[i].likes++;
							$scope.newBook = $scope.books[i];
							
							break;
						}

					}

					$scope.updateLikeCount()
				}

				$scope.updateLikeCount = function() {
					var BookService = appEndpointSF.getBookService();
					BookService.likeCount($scope.newBook).then(
							function(msgBean) {
								
								$log.debug("msgBean.msg:" + msgBean.msg);

							});

				}
				
				$scope.dislike = function(selectedBookId) {

					for (i = 0; i < $scope.books.length; i++) {
						if ($scope.books[i].id == selectedBookId) {

							$scope.books[i].dislikes++;
							$scope.newBook = $scope.books[i];
							break;
						}

					}

					$scope.updateDislikeCount()
				}

				$scope.updateDislikeCount = function() {
					var BookService = appEndpointSF
							.getBookService();
					BookService.dislikeCount($scope.newBook).then(
							function(msgBean) {
								
								$log.debug("msgBean.msg:" + msgBean.msg);

							});

				}

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			

		});// end of bookListCtr

