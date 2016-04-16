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

			
			$scope.getPracticeExamResultbyEmail = function() {

				var PracticeExamResultService = appEndpointSF
						.getPracticeExamResultService();

				PracticeExamResultService.getPracticeExamResultbyEmail($scope.curUser.email_id)
						.then(
								function(practiceExamResultList) {

									$scope.results = practiceExamResultList;
									
							});
			}
			
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					  $scope.getPracticeExamResultbyEmail(); 
				  } 
				  else {				 
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }
				  
				 $scope.waitForServiceLoad();

		});
