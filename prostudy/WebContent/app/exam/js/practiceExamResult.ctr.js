angular.module("prostudyApp").controller(
		"practiceExamResultCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter) {

			$scope.curuser=appEndpointSF.getLocalUserService().getLoggedinUser();
			$scope.results = [];

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Question Saved!')
						.position("top").hideDelay(3000));
			};

			
			$scope.getPracticeExamResultbyID = function() {

				var PracticeExamResultService = appEndpointSF
						.getPracticeExamResultService();

				PracticeExamResultService
						.getPracticeExamResultbyID(
								$scope.curUser.email_id)
						.then(
								function(practiceExamResultList) {

									$scope.examResults = practiceExamResultList;
									$log.debug("$scope.examResults.."+angular.toJson($scope.examResults));
									
									$scope.results = $scope.examResults ;
									 
									$log.debug("$scope.results.."+angular.toJson($scope.results));
									
									
									/*for(var i in $scope.examResults)
									    $scope.results.push([i, $scope.examResults[i]]);
									
									$log.debug("$scope.results.."+angular.toJson($scope.results));*/
								});
			}
			
		/*	var json_data = {"2013-01-21":1,"2013-01-22":7};
			var result = [];

			for(var i in json_data)
			    result.push([i, json_data [i]]);
*/

			$scope.getPracticeExamResultbyID();

		});// end of angular.module

