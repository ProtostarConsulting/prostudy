angular
		.module("stockApp")
		.controller(
				"hrCtr.empview",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					$scope.selected = [];
					$scope.selectedempNo = $stateParams.selectedempNo;
					
					$scope.showEmp = function() {
						var hrService = appEndpointSF.gethrService();

						hrService
								.getempByID($scope.selectedempNo)
								.then(
										function(empList) {
											$scope.empDetail = empList[0];
											$log
													.debug("$scope.showBill:empDetail ===="
															+ angular
																	.toJson($scope.empDetail));
										});

					}
					$scope.empDetail = [];
					$scope.showEmp();

					$scope.updateemp = function() {
							
						var hrService = appEndpointSF.gethrService();
						hrService.updateemp($scope.empDetail).then(
								function(msgBean) {
									$log.debug("Inside Ctr updateemp");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
								});
					}
					
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
