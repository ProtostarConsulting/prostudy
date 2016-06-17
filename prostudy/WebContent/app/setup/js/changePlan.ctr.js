angular.module("prostudyApp").controller(
		"changePlanCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog, objectFactory) {

			

			
			$scope.curUser;
			$scope.accounttype;
			$scope.inst = {accounttype :''};
			
			$scope.updatePlan = function() {
				
				var adminService = appEndpointSF.getProtostarAdminService();
				adminService.getAccountTypeById($scope.accounttype).then(
						function(accountType) {
						//	$scope.inst.accounttype = accountType;
						//	$scope.inst = $scope.curUser.instituteObj;
							
							$scope.curUser.instituteObj.accounttype = accountType;
							
							var InstituteService = appEndpointSF.getInstituteService();

							InstituteService.addInstitute($scope.curUser.instituteObj).then(
									function(business) {
										$scope.showUpdateToast();
									});
						});

			}

			
			
			$scope.getAllAccountTypes = function() {
				
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
