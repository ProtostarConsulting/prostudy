angular.module("prostudyApp").controller(
		"standardBookCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside standardBookCtr");

		
			$log.debug("$stateParams.selectedBookId:",$stateParams.selectedBookId);
			$scope.selectedBookId = $stateParams.selectedBookId;
			
			
			  $scope.isActive5 = false;
			  $scope.isActive6 = false;
			  $scope.isActive7 = false;
			  $scope.isActive8 = false;
			  $scope.isActive9 = false;
			  $scope.isActive10 = false;
			  
			  
				$scope.getBookByStandard = function(standard) {
					
					$log.debug("Inside getBookByStandard");
					
					//For Std Button
					$scope.isActive5 = !$scope.isActive5;
					$scope.isActive6 = !$scope.isActive6;
					$scope.isActive7 = !$scope.isActive7;
				    $scope.isActive8 = !$scope.isActive8;
				    $scope.isActive9 = !$scope.isActive9;
				    $scope.isActive10 = !$scope.isActive10;
					
					var BookService = appEndpointSF.getBookService();
			
					BookService.getBookByStandard(standard).then(function(stdBookList) {
		
								$scope.stdBooks = stdBookList;
								$log.debug("$scope.stdBooks :-"+ angular.toJson($scope.stdBooks));
								
								$scope.std= $scope.stdBooks[0].standard;
								$log.debug("$scope.std :-"+ ($scope.std));	
						
				  });

				};// end of $scope.getBookByStandard
			

	
			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

			

		});// end of standardCtr

