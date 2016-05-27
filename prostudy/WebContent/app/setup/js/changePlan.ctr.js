angular.module("prostudyApp").controller(
		"changePlanCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog, objectFactory) {

			

			
			
			$scope.getAllAccountTypes = function() {

				$scope.selection = [];
				var UserService = appEndpointSF.getUserService();
				UserService.getAllAccountTypes().then(
						function(planList) {
							$scope.accountTypes = planList;
						});
			}
			
	
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute User Saved!')
						.position("top").hideDelay(3000));
			};
	

				
			$scope.cancelButton = function() {
				$state.go("^", {});
			}
			
			
		
			$scope.waitForServiceLoad = function() {
				  if (appEndpointSF.is_service_ready) {					  
					  $scope.getAllAccountTypes();
				  } 
				  else {
				   $log.debug("Services Not Loaded, watiting...");
				   $timeout($scope.waitForServiceLoad, 1000);
				  }
				 }
				  
				 $scope.waitForServiceLoad();
		});
