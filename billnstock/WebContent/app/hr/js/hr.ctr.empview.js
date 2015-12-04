angular
		.module("stockApp")
		.controller(
				"hrCtr.empview",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
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
				});
