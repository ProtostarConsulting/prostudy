angular.module("prostudyApp").controller(
		"standardBookCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, appEndpointSF, $state, $sce) {

			console.log("Inside standardBookCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();

			$scope.selectedStd = null;

			$scope.selectedBookId = $stateParams.selectedBookId;
			$scope.standards = [ {} ];

			$scope.getStandardByInstitute = function() {

				var StandardService = appEndpointSF.getStandardService();
				StandardService.getStandardByInstitute(
						$scope.curUser.instituteID).then(
						function(standardList) {

							$scope.stdList = standardList;

						});
			}
			$scope.getStandardByInstitute();

			$scope.getButtonClass = function(standard) {
				return $scope.selectedStd == standard? "md-raised md-warn": "md-raised md-primary";

			}

			$scope.getBookByStandard = function(standard) {

				$scope.selectedStd = standard;
				$log.debug("Inside getBookByStandard");

				var BookService = appEndpointSF.getBookService();

				BookService.getBookByStandard(standard).then(
						function(stdBookList) {

							$scope.stdBooks = stdBookList;
							$log.debug("$scope.stdBooks :-"
									+ angular.toJson($scope.stdBooks));

							$scope.std = $scope.stdBooks.standard;
							$log.debug("$scope.std :-" + ($scope.std));

						});

			};// end of $scope.getBookByStandard

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};// end of cancelButton

		});// end of standardCtr

