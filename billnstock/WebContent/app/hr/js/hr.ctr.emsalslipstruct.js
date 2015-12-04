angular
		.module("stockApp")
		.controller(
				"hrCtr.empsalslipstruct",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					$scope.selectedempstructno = $stateParams.selectedempstructno;
					
					$scope.selected = [];
					$scope.salstruct = {
							empid : "",
							empName : "",
							grosssal : "",
							monthly : "",
							Byearly : "",
							bmonthly : "",
							HRAyearly : "",
							HRAmonthly : "",
							CCAyearly : "",
							CCAmonthly : "",
							EC12Byearly : "",
							Convyearly : "",
							Convmonthly : "",
							SAyearly : "",
							grandtotal : "",
							SAmonthly : "",
							bgrandtotal : "",
							ptaxyearly : "",
							pf1 : 0,
							pf2 : 0,
							Ptaxgrandtotal : "",
							Netsalgrandtotalmonthly : "",
							Netsalgrandtotal : "",
							addprobonus : "",
							CTC : "",
							MCTC : ""
						};

						$scope.viewsalstruct = $scope.salstruct;
						$scope.printsalstruct = $scope.salstruct;
						
					$scope.getAllempsSalStruct = function() {
						$log.debug("Inside Ctr $scope.getAllempsSalStruct");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllempsSalStruct().then(
								function(empSalstructList) {
									$log.debug("Inside Ctr getAllemps");
									$scope.empSalStruct = empSalstructList;

								});
					}
					$scope.empSalStruct = [];
					$scope.getAllempsSalStruct();
					
					$scope.viewfindsalstruct = function() {
						$log.debug("selectedempstructno="
								+ $scope.selectedempstructno);

						$log
								.debug("Inside Ctr $scope.getAllselectedempstructno");
						var hrService = appEndpointSF.gethrService();

						hrService
								.viewfindsalstruct($scope.selectedempstructno)
								.then(
										function(structList) {
											$log
													.debug("Inside Ctr getsalstruct");
											$scope.viewslist = structList;
											$scope.viewsalstruct = $scope.viewslist[0];

											$log
													.debug("Inside Ctr viewslist:"
															+ angular
																	.toJson($scope.viewslist));

										});
					}

					$scope.viewslist = [];
					$scope.viewfindsalstruct();

				});
