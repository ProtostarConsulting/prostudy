angular.module("prostudyApp").controller(
		"standardBookCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside standardBookCtr");

		
				$log.debug("$stateParams.selectedStdId:",$stateParams.selectedStdId);
				$scope.selectedStdId = $stateParams.selectedStdId;
		
			
			//$scope.standard;
				$scope.getStandard_BookbyID = function() {
					
					$log.debug("$scope.selectedStdId:" + $scope.standard);
					
					var BookService = appEndpointSF.getBookService();
					

					BookService.getStandard_BookbyID()
							.then(
									function(stdBookList) {

									$scope.stdBooks = stdBookList;
								/*		$scope.tempstdBook=$scope.stdBooks.length+1;
									//$scope.books = $scope.stdBooks;
										$scope.stdBook.stdId=$scope.tempstdBook.stdId;
										$log.debug("$scope.stdBook.stdId :-"+ angular.toJson($scope.tempstdBook));*/
										$log.debug("$scope.stdBooks :-"+ angular.toJson($scope.stdBooks));

									});

				};// end of $scope.getStandard_BookbyID
				//$scope.getStandard_BookbyID();
			

	
			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			

		});// end of standardCtr

