angular
		.module("stockApp")
		.controller(
				"hrCtr.add",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
					
					
					$scope.emp = {
							empid : "",
							empName : "",
							email : "",
							compemail : "",
							empAddress : "",
							Designation:""
						};

					$scope.addemp = function() {

						var hrService = appEndpointSF.gethrService();
						hrService.addemp($scope.emp).then(function(msgBean) {

							$log.debug("Inside Ctr addemp");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast(msgBean.msg);
							$scope.getAllemps();
						});

						$scope.emp = {};
					}
				
			$scope.getAllemps = function() {
						$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllemp().then(function(empList) {
							$log.debug("Inside Ctr getAllemps");
							$scope.emps = empList;
							$scope.cempid = $scope.emps.length + 1;
							$scope.emp.empid = $scope.cempid;

						});
					}
					
					$scope.emps = [];
					$scope.cempid;
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
