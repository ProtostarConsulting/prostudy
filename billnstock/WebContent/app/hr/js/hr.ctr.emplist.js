angular
		.module("stockApp")
		.controller(
				"hrCtr.emplist",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
					
					
					$scope.emp = {
							empid : "",
							empName : "",
							email : "",
							compemail : "",
							empAddress : ""
						};

				
			$scope.getAllemps = function() {
						$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllemp().then(function(empList) {
							$log.debug("Inside Ctr getAllemps");
							$scope.emps = empList;
							
						});
					}
					
					$scope.emps = [];
					$scope.getAllemps();
					
					
					

				});
