angular.module("prostudyApp").controller(
		"instituteViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,$stateParams,$filter) {
		
			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedInstituteId:",$stateParams.selectedInstituteId);
	
			$scope.selectedInstituteId = $stateParams.selectedInstituteId;
			
			$scope.showselectedInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.selectedInstituteId)
						.then(
								function(institutes) {
									$scope.Institute = institutes[0];
								});
			}
			$scope.cancelButton = function() {
			      $log.debug("inside cancelButton");
			      $state.go('^', {});
			     };

			$scope.showselectedInstitute();
			$scope.selected = [];

		});
