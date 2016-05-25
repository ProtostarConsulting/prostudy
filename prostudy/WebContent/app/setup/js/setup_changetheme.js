angular.module("prostudyApp").controller(
		"changeThemeCtr1",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$stateParams, $log, objectFactory, $mdDialog, $mdMedia, $state,
				appEndpointSF) {

			$log.debug("Inside setup.changetheme Ctr...");
			
			$scope.Institute = [];
			
			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			
			$scope.showselectedInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.curUser.instituteID)
						.then(function(institutes) {
							$scope.Institute = institutes;
						});
			}
			$scope.showselectedInstitute();

			$scope.checkTheme = function(themeName) {
					$scope.changeTheme(themeName);
				}
			
			
			$scope.updateTheme = function(themeName) {
			//	var change = confirm("Are you sure to change theme ?");
				
					$scope.Institute.theme=themeName;
					var InstituteService = appEndpointSF.getInstituteService();
					InstituteService.updateInstitute($scope.Institute).then(
							function(msgBean) {
							
							});
					$scope.changeTheme(themeName);
					$state.go("home");
			
			}

		});
