angular
		.module("stockApp")
		.controller(
				"hrCtr.emplist",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();
					
					$scope.query = {
					         order: 'name',
					         limit: 5,
					         page: 1
					       };
					
					$scope.emp = {
							empid : "",
							empName : "",
							email : "",
							compemail : "",
							empAddress : "",
							Designation:""
						};

				
					$scope.getAllemps = function() {
						$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllemp($scope.curUser.businessAccount.id).then(function(empList) {
							$log.debug("Inside Ctr getAllemps");
							$scope.emps = empList.items;
							
					});
					}
					
					$scope.emps = [];
				$scope.getAllemps();
					
					
					$scope.toggleRight = buildToggler('right');

					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

				});
