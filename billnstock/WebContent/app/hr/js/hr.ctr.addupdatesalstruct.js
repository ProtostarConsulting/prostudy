angular
		.module("stockApp")
		.controller(
				"hrCtr.addupdatesalstruct",
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
					
					$scope.updateempname = function(empid) {

						for (i = 0; i < $scope.emps.length; i++) {
							if (empid == $scope.emps[i].empid) {
								$scope.salstruct.empName = $scope.emps[i].empName;
							}

						}

					}
					
					$scope.addsalstruct = function() {

						var hrService = appEndpointSF.gethrService();
						hrService.addsalstruct($scope.salstruct).then(
								function(msgBean) {

									$log.debug("Inside Ctr salstruct");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
									$scope.getAllemps();
								});

						$scope.salstruct = {};
					}
					$scope.updatesalinfo = function() {

						var hrService = appEndpointSF.gethrService();
						hrService
								.updatesalinfo($scope.salstruct)
								.then(
										function(msgBean) {
											$log
													.debug("Inside Ctr update emp salstruct ");
											$log.debug("msgBean.msg:"
													+ msgBean.msg);
											$scope.showSimpleToast(msgBean.msg);
											$scope.salstruct = [];
										});
					}
					
					
					
					
					
					$scope.findsalstruct = function(empid) {
						$log.debug("empid=" + empid);

						$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();

						hrService
								.findsalstruct(empid)
								.then(
										function(structList) {
											$log
													.debug("Inside Ctr getsalstruct");
											$scope.slist = structList;
											// disable and enable add and update
											// button
											if (typeof $scope.slist[0] == 'undefined') {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = false;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = true;

												$scope.salstruct=[];
												
											} else {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = true;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = false;
											
											// assign list
											// $scope.salstruct=$scope.slist[0];
											$scope.salstruct.grosssal = $scope.slist[0].grosssal;
											$scope.salstruct.monthly = $scope.slist[0].monthly;
											$scope.salstruct.Byearly = $scope.slist[0].Byearly;
											$scope.salstruct.bmonthly = $scope.slist[0].bmonthly;
											$scope.salstruct.HRAyearly = $scope.slist[0].HRAyearly;
											$scope.salstruct.HRAmonthly = $scope.slist[0].HRAmonthly;
											$scope.salstruct.CCAyearly = $scope.slist[0].CCAyearly;
											$scope.salstruct.CCAmonthly = $scope.slist[0].CCAmonthly;
											$scope.salstruct.EC12Byearly = $scope.slist[0].EC12Byearly;
											$scope.salstruct.Convyearly = $scope.slist[0].Convyearly;
											$scope.salstruct.Convmonthly = $scope.slist[0].Convmonthly;
											$scope.salstruct.SAyearly = $scope.slist[0].SAyearly;
											$scope.salstruct.grandtotal = $scope.slist[0].grandtotal;
											$scope.salstruct.SAmonthly = $scope.slist[0].SAmonthly;
											$scope.salstruct.bgrandtotal = $scope.slist[0].bgrandtotal;
											$scope.salstruct.ptaxyearly = $scope.slist[0].ptaxyearly;
											$scope.salstruct.pf1 = $scope.slist[0].pf1;
											$scope.salstruct.pf2 = $scope.slist[0].pf2;
											$scope.salstruct.Ptaxgrandtotal = $scope.slist[0].Ptaxgrandtotal;
											$scope.salstruct.Netsalgrandtotal = $scope.slist[0].Netsalgrandtotal;
											$scope.salstruct.addprobonus = $scope.slist[0].addprobonus;
											$scope.salstruct.CTC = $scope.slist[0].CTC;
											$scope.salstruct.MCTC = $scope.slist[0].MCTC;
											$scope.salstruct.Netsalgrandtotalmonthly = $scope.slist[0].Netsalgrandtotalmonthly;
											$log
													.debug("Inside Ctr salstruct:"
															+ angular
																	.toJson($scope.slist));
											}
										});
					}

					$scope.slist = [];
					
					
					
					$scope.updatesalstruct = function(grossal) {
						// $log.debug("grossal =" + grossal);
						$scope.salstruct.monthly = grossal / 12;
						$scope.salstruct.Byearly = grossal * 0.30;
						$scope.salstruct.bmonthly = $scope.salstruct.monthly * 0.30;
						$scope.salstruct.HRAyearly = grossal * 0.20;
						$scope.salstruct.HRAmonthly = $scope.salstruct.monthly * 0.20;
						$scope.salstruct.CCAyearly = grossal * 0.30;
						$scope.salstruct.CCAmonthly = $scope.salstruct.monthly * 0.30;

						if ((($scope.salstruct.HRAyearly * .012) / 12) < 780) {
							$scope.salstruct.EC12Byearly = $scope.salstruct.HRAyearly * 0.12;
						} else {
							$scope.salstruct.EC12Byearly = 780 * 12;
						}

						$scope.salstruct.Convyearly = 9600;
						$scope.salstruct.Convmonthly = 800;
						$scope.salstruct.SAyearly = grossal
								- ($scope.salstruct.Byearly
										+ $scope.salstruct.HRAyearly
										+ $scope.salstruct.CCAyearly
										+ $scope.salstruct.EC12Byearly + $scope.salstruct.Convyearly);
						$scope.salstruct.grandtotal = $scope.salstruct.Byearly
								+ $scope.salstruct.HRAyearly
								+ $scope.salstruct.CCAyearly
								+ $scope.salstruct.EC12Byearly
								+ $scope.salstruct.Convyearly
								+ $scope.salstruct.SAyearly;
						$scope.salstruct.SAmonthly = $scope.salstruct.monthly
								- ($scope.salstruct.bmonthly
										+ $scope.salstruct.HRAmonthly
										+ $scope.salstruct.CCAmonthly + $scope.salstruct.Convmonthly);
						$scope.salstruct.bgrandtotal = $scope.salstruct.bmonthly
								+ $scope.salstruct.HRAmonthly
								+ $scope.salstruct.CCAmonthly
								+ $scope.salstruct.Convmonthly
								+ $scope.salstruct.SAmonthly;
						$scope.salstruct.ptaxyearly = 2500;
						$scope.salstruct.Ptaxgrandtotal = $scope.salstruct.pf1
								+ $scope.salstruct.pf2
								+ $scope.salstruct.ptaxyearly;
						$scope.salstruct.Netsalgrandtotal = $scope.salstruct.grandtotal
								- $scope.salstruct.Ptaxgrandtotal;

						$scope.salstruct.Netsalgrandtotalmonthly = $scope.salstruct.Netsalgrandtotal / 12;

						$scope.salstruct.CTC = $scope.salstruct.addprobonus
								+ $scope.salstruct.grandtotal;

						$scope.salstruct.MCTC = $scope.salstruct.CTC / 12;

					}

					$scope.updateCTC = function(CTC) {
						$scope.salstruct.CTC = $scope.salstruct.addprobonus
								+ $scope.salstruct.grandtotal;
						$scope.salstruct.MCTC = $scope.salstruct.CTC / 12;
					}
					$scope.updateptaxgrandtotal = function(ptaxgtot) {

						$scope.salstruct.Ptaxgrandtotal = ($scope.salstruct.pf2 + $scope.salstruct.ptaxyearly)
								+ $scope.salstruct.pf1;
						$scope.salstruct.MCTC = $scope.salstruct.CTC / 12;
					}


				});
