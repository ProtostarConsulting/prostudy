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
							byearly : "",
							bmonthly : "",
							hrayearly : "",
							hramonthly : "",
							ccayearly : "",
							ccamonthly : "",
							ec12Byearly : "",
							convyearly : "",
							convmonthly : "",
							sayearly : "",
							grandtotal : "",
							samonthly : "",
							bgrandtotal : "",
							ptaxyearly : "",
							pf1 : 0,
							pf2 : 0,
							ptaxgrandtotal : "",
							netsalgrandtotalmonthly : "",
							netsalgrandtotal : "",
							addprobonus : "",
							ctc : "",
							mctc : "",
							ldother1dis:"",
							ldother2dis:"",
							ldother1amt:"",
							ldother2amt:""
						};

						$scope.viewsalstruct = $scope.salstruct;
						$scope.printsalstruct = $scope.salstruct;
						
					$scope.getAllempsSalStruct = function() {
						$log.debug("Inside Ctr $scope.getAllempsSalStruct");
						var hrService = appEndpointSF.gethrService();

						hrService.getAllempsSalStruct().then(
								function(empSalstructList) {
									$log.debug("Inside Ctr getAllemps");
									$scope.empSalStruct = empSalstructList.items;

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
											$scope.viewsalstruct = $scope.viewslist;

											$log
													.debug("Inside Ctr viewslist:"
															+ angular
																	.toJson($scope.viewslist));

										});
					}

					$scope.viewslist = [];
					$scope.viewfindsalstruct();

					
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
