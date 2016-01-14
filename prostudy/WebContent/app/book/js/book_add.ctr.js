angular
		.module("prostudyApp")
		.controller(
				"bookAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, tableTestDataFactory, $state,
						appEndpointSF, $sce) {

					console.log("Inside bookAddCtr");

					$scope.comments = {
						userId : "",
						desc : ""
					}
					$scope.tempBook = {
						id : "",
						bookId : "",
						book_name : "",
						author : "",
						board : "",
						standard : "",
						chapters : [],
						comments : []
					};// end of tempBook object

				
	

					$scope.addBook = function() {
						$log.debug("No1");
						
						for(i=0;i<$scope.selectedChapters.length;i++)
						{
							$scope.tempBook.chapters.push($scope.selectedChapters[i]);
						}
						
						var BookService = appEndpointSF.getBookService();

						BookService.addBook($scope.tempBook).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr addBook");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSavedToast();

									$log.debug("tempBook"+ angular.toJson($scope.tempBook));
									$scope.tempBook = {
										id : "",
										bookId : "",
										book_name : "",
										author : "",
										board : "",
										standard : "",
										chapters : [],
										comments : []
									};// After click on submit button,htmlform
										// to be set as a blank
								});
						$log.debug("No4");
					}// end of addBook
					
					
					$scope.chapters = [];
					$scope.getChapters = function() {

						var ChapterService = appEndpointSF.getChapterService();

						ChapterService.getChapters()
								.then(
										function(chapterList) {
											$log.debug("Inside Ctr getChapters");

											$scope.chapters = chapterList;
											$log.debug("chapters :"+ angular.toJson($scope.chapters));
								
										});
						
					}// end of getChapters
					$scope.getChapters();

					$scope.selectedChapters = [];
			
			

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content('Book Saved!')
								.position("top").hideDelay(3000));
					};// end of showSavedToast
		

					$scope.moveItem = function(item, from, to) {

						console.log('Move item   Item: ' + item + ' From:: '
								+ from + ' To:: ' + to);

						var idx = from.indexOf(item);
						if (idx != -1) {
							from.splice(idx, 1);
							to.push(item);
						}
					};// end of moveItem

					$scope.moveAll = function(from, to) {

						console.log('Move all  From:: ' + from + ' To:: ' + to);
						// Here from is returned as blank and to as undefined

						angular.forEach(from, function(item) {
							to.push(item);
						});
						from.length = 0;
					};// end of moveAll

					$scope.cancelButton = function() {
						$state.go('^', {});
					};// end of cancelButton

				});// end of bookAddCtr

