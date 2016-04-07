angular
		.module("stockApp")
		.controller(
				"hrCtr.addupdatesalstruct",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {

					$scope.selectedUserId = $stateParams.selectedUserId;
					$scope.selectedUserName = $stateParams.selectedUserName;

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$scope.curemp;
					$scope.emp = {
						empid : "",
						empName : "",
						email : "",
						compemail : "",
						empAddress : ""
					};
					
					
					$scope.salstruct = {
							business:"",
						empAccount : "",
						grosssal : 0,
						monthly : 0,
						byearly : 0,
						bmonthly : 0,
						hrayearly : 0,
						hramonthly : 0,
						ccayearly : 0,
						ccamonthly : 0,
						ec12Byearly : 0,
						convyearly : 0,
						convmonthly : 0,
						sayearly : 0,
						grandtotal : 0,
						samonthly : 0,
						bgrandtotal : 0,
						ptaxyearly : 0,
						pf1 : 0,
						pf2 : 0,
						ptaxgrandtotal : 0,
						netsalgrandtotalmonthly : 0,
						netsalgrandtotal : 0,
						addprobonus : 0,
						ctc : 0,
						mctc : 0,
						ldother1dis : "",
						ldother2dis : "",
						ldother1amt : 0,
						ldother2amt : 0
					};

				
					$scope.addsalstruct = function() {
						var setupService = appEndpointSF.getsetupService();
						if (typeof $scope.selectedUserId != 'undefined') {
							setupService.getuserById($scope.selectedUserId)
									.then(function(userList) {
												
												$scope.userL = userList.result;
												$scope.salstruct.empAccount = $scope.userL;
												$scope.salstruct.business=$scope.userL.business;
												
												var hrService = appEndpointSF.gethrService();
												hrService.addsalstruct($scope.salstruct)
														.then(function(msgBean) {
																	$log.debug("Inside Ctr salstruct");
																	$log.debug("msgBean.msg:"+ msgBean.msg);
																	$scope.showSimpleToast(msgBean.msg);
																	//$scope.getAllemps();
																	$scope.salstruct = {};
																});
												});
						}

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
											//$scope.salstruct = [];
										});
					}

					
					$scope.findsalstruct = function() {
					$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();
						if (typeof $scope.selectedUserId != 'undefined') {
						hrService.findsalstructure($scope.selectedUserId)
								.then(
										function(structList) {
										
											$scope.slist = structList; 
											if (typeof $scope.slist.empAccount == 'undefined') {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = false;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = true;

						
											} else {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = true;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = false;

											
												$scope.salstruct = $scope.slist;
												}
										});
						}
						}

					$scope.slist = [];
					$scope.findsalstruct();
					
					
					
				/*	$scope.findsalstruct = function(empid) {
						$log.debug("empid=" + empid);

						$log.debug("Inside Ctr $scope.getAllemps");
						var hrService = appEndpointSF.gethrService();

						hrService
								.findsalstruct(empid)
								.then(
										function(structList) {
											$log
													.debug("Inside Ctr getsalstruct");
											// $scope.slist = structList use for
											// localdb
											$scope.slist = structList; // use
																		// for
																		// google
																		// db
											// disable and enable add and update
											// button
											
											 * if (typeof $scope.slist[0] ==
											 * 'undefined') {
											 // use
																							// for
																							// local
																							// db
											if (typeof $scope.slist.empAccount == 'undefined') {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = false;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = true;

												// $scope.salstruct=[];

											} else {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = true;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = false;

												// assign list
												$scope.salstruct = $scope.slist;
												
												 * $scope.salstruct.grosssal =
												 * $scope.slist.grosssal;
												 * $scope.salstruct.monthly =
												 * $scope.slist.monthly;
												 * $scope.salstruct.byearly =
												 * $scope.slist.byearly;
												 * $scope.salstruct.bmonthly =
												 * $scope.slist.bmonthly;
												 * $scope.salstruct.hrayearly =
												 * $scope.slist.hrayearly;
												 * $scope.salstruct.hramonthly =
												 * $scope.slist.hramonthly;
												 * $scope.salstruct.ccayearly =
												 * $scope.slist.ccayearly;
												 * $scope.salstruct.ccamonthly =
												 * $scope.slist.ccamonthly;
												 * $scope.salstruct.ec12Byearly =
												 * $scope.slist.ec12Byearly;
												 * $scope.salstruct.convyearly =
												 * $scope.slist.convyearly;
												 * $scope.salstruct.convmonthly =
												 * $scope.slist.convmonthly;
												 * $scope.salstruct.sayearly =
												 * $scope.slist.sayearly;
												 * $scope.salstruct.grandtotal =
												 * $scope.slist.grandtotal;
												 * $scope.salstruct.samonthly =
												 * $scope.slist.samonthly;
												 * $scope.salstruct.bgrandtotal =
												 * $scope.slist.bgrandtotal;
												 * $scope.salstruct.ptaxyearly =
												 * $scope.slist.ptaxyearly;
												 * $scope.salstruct.pf1 =
												 * $scope.slist.pf1;
												 * $scope.salstruct.pf2 =
												 * $scope.slist.pf2;
												 * $scope.salstruct.ptaxgrandtotal =
												 * $scope.slist.ptaxgrandtotal;
												 * $scope.salstruct.netsalgrandtotal =
												 * $scope.slist.netsalgrandtotal;
												 * $scope.salstruct.addprobonus =
												 * $scope.slist.addprobonus;
												 * $scope.salstruct.ctc =
												 * $scope.slist.ctc;
												 * $scope.salstruct.mctc =
												 * $scope.slist.mctc;
												 * $scope.salstruct.netsalgrandtotalmonthly =
												 * $scope.slist.netsalgrandtotalmonthly;
												 * $scope.salstruct.ldother1dis =
												 * $scope.slist.ldother1dis;
												 * $scope.salstruct.ldother2dis =
												 * $scope.slist.ldother2dis;
												 * $scope.salstruct.ldother1amt =
												 * $scope.slist.ldother1amt;
												 * $scope.salstruct.ldother2amt =
												 * $scope.slist.ldother2amt;
												 
												$log
														.debug("Inside Ctr salstruct:"
																+ angular
																		.toJson($scope.slist.items));
											}
										});
					}

					$scope.slist = [];
*/
					$scope.updatesalstruct = function(grossal) {
						// $log.debug("grossal =" + grossal);
						$scope.salstruct.monthly = grossal / 12;
						$scope.salstruct.byearly = grossal * 0.30;
						$scope.salstruct.bmonthly = $scope.salstruct.monthly * 0.30;
						$scope.salstruct.hrayearly = grossal * 0.20;
						$scope.salstruct.hramonthly = $scope.salstruct.monthly * 0.20;
						$scope.salstruct.ccayearly = grossal * 0.30;
						$scope.salstruct.ccamonthly = $scope.salstruct.monthly * 0.30;

						if ((($scope.salstruct.hrayearly * .012) / 12) < 780) {
							$scope.salstruct.ec12Byearly = $scope.salstruct.hrayearly * 0.12;
						} else {
							$scope.salstruct.ec12Byearly = 780 * 12;
						}

						$scope.salstruct.convyearly = 9600;
						$scope.salstruct.convmonthly = 800;
						$scope.salstruct.sayearly = grossal
								- ($scope.salstruct.byearly
										+ $scope.salstruct.hrayearly
										+ $scope.salstruct.ccayearly
										+ $scope.salstruct.ec12Byearly + $scope.salstruct.convyearly);
						$scope.salstruct.grandtotal = $scope.salstruct.byearly
								+ $scope.salstruct.hrayearly
								+ $scope.salstruct.ccayearly
								+ $scope.salstruct.ec12Byearly
								+ $scope.salstruct.convyearly
								+ $scope.salstruct.sayearly;
						$scope.salstruct.samonthly = $scope.salstruct.monthly
								- ($scope.salstruct.bmonthly
										+ $scope.salstruct.hramonthly
										+ $scope.salstruct.ccamonthly + $scope.salstruct.convmonthly);
						$scope.salstruct.bgrandtotal = $scope.salstruct.bmonthly
								+ $scope.salstruct.hramonthly
								+ $scope.salstruct.ccamonthly
								+ $scope.salstruct.convmonthly
								+ $scope.salstruct.samonthly;
						$scope.salstruct.ptaxyearly = 2500;
						$scope.salstruct.ptaxgrandtotal = $scope.salstruct.pf1
								+ $scope.salstruct.pf2
								+ $scope.salstruct.ptaxyearly;
						$scope.salstruct.netsalgrandtotal = $scope.salstruct.grandtotal
								- $scope.salstruct.ptaxgrandtotal;

						$scope.salstruct.netsalgrandtotalmonthly = $scope.salstruct.netsalgrandtotal / 12;

						$scope.salstruct.ctc = $scope.salstruct.addprobonus
								+ $scope.salstruct.grandtotal;

						$scope.salstruct.mctc = $scope.salstruct.ctc / 12;

					}

					$scope.updateCTC = function(ctc) {
						$scope.salstruct.ctc = $scope.salstruct.addprobonus
								+ $scope.salstruct.grandtotal;
						$scope.salstruct.mctc = $scope.salstruct.ctc / 12;
					}
					$scope.updateptaxgrandtotal = function(ptaxgtot) {

						$scope.salstruct.ptaxgrandtotal = $scope.salstruct.pf2
								+ $scope.salstruct.ptaxyearly
								+ $scope.salstruct.pf1;
						$scope.salstruct.mctc = $scope.salstruct.ctc / 12;
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
