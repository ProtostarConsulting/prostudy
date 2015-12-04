angular
		.module("stockApp")
		.controller(
				"hrCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					var date = new Date();
					var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May",
							"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
					
					$log.debug("Inside hrCtr");
					
					
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedempNo:",
							$stateParams.selectedempNo);
					$log.debug("$stateParams.selectedempstructno:",
							$stateParams.selectedempstructno);
					$scope.selectedempNo = $stateParams.selectedempNo;
					$scope.selectedempstructno = $stateParams.selectedempstructno;
					$scope.printempidsalslip = $stateParams.printempidsalslip;

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};

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

					$scope.viewsalstruct = $scope.salstruct;
					$scope.printsalstruct = $scope.salstruct;
					$scope.document = {
						empid : "",
						empName : "",
						docname : "",
						docfile : "",
						docdiscription : ""
					};

					$scope.salslip = {
						ganeratedcode : "",
						salslip_id : "",
						// empdetail : $scope.emp,
						salarystruct : $scope.salstruct,
						month : "-",
						generateddate : "-",
						bank_name : "-",
						acno : "-"
					};

			/*		$scope.addemp = function() {

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
*/
/*					$scope.showEmp = function() {
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
					$scope.showEmp();*/

			/*		$scope.updateemp = function() {

						var hrService = appEndpointSF.gethrService();
						hrService.updateemp($scope.empDetail).then(
								function(msgBean) {
									$log.debug("Inside Ctr updateemp");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
								});
					}*/

				/*	$scope.updateempname = function(empid) {

						for (i = 0; i < $scope.emps.length; i++) {
							if (empid == $scope.emps[i].empid) {
								$scope.salstruct.empName = $scope.emps[i].empName;
							}

						}

					}*/

					/*$scope.updatesalstruct = function(grossal) {
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

*/					/*$scope.addsalstruct = function() {

						var hrService = appEndpointSF.gethrService();
						hrService.addsalstruct($scope.salstruct).then(
								function(msgBean) {

									$log.debug("Inside Ctr salstruct");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
									$scope.getAllemps();
								});

						$scope.salstruct = {};
					}*/

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

											} else {
												angular
														.element(document
																.getElementById('addsal'))[0].disabled = true;
												angular
														.element(document
																.getElementById('updatesal'))[0].disabled = false;
											}
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

										});
					}

					$scope.slist = [];*/

					/*$scope.updatesalinfo = function() {

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
					}*/

	/*				$scope.documentempname = function(empid) {

						for (i = 0; i < $scope.emps.length; i++) {
							if (empid == $scope.emps[i].empid) {
								$scope.document.empName = $scope.emps[i].empName;

							}

						}

					}*/
/*
					$scope.adddoc = function() {

						// var path = document.getElementById("filenm").value;
						// $log.debug("path="+path);
						// File file = new File(path);
						// InputStream inputStream = new
						// FileInputStream(""+path);
						
						 * if ( $scope.document.docfile) { $log.debug("Inside
						 * Ctr adddoc############################");
						 * $scope.upload($scope.document.docfile); } // upload
						 * on file select or drop $scope.upload = function
						 * (file) { Upload.upload({ url: 'upload/url', data:
						 * {file: file, 'username': $scope.username}
						 * }).then(function (resp) { console.log('Success ' +
						 * resp.config.data.file.name + 'uploaded. Response: ' +
						 * resp.data); }, function (resp) { console.log('Error
						 * status: ' + resp.status); }, function (evt) { var
						 * progressPercentage = parseInt(100.0 * evt.loaded /
						 * evt.total); console.log('progress: ' +
						 * progressPercentage + '% ' +
						 * evt.config.data.file.name); }); };
						 * 
						 
						var hrService = appEndpointSF.gethrService();

						hrService.adddoc($scope.document).then(
								function(msgBean) {

									$log.debug("Inside Ctr adddoc");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast(msgBean.msg);
									// $scope.getAllemps();
								});

						$scope.document = {};
					}*/
					// ------------------------------------------------------------------------------------------------------
			/*		$scope.ganeratesalslip = function() {
						$scope.printganeratesalslip();
						var hrService = appEndpointSF.gethrService();

						for (i = 0; i < $scope.selected.length; i++) {
							hrService
									.getstructByID($scope.selected[i].empid)
									.then(
											function(structlist) {
												$scope.selectedSalSlip = structlist;
												// --------insert element in
												// salslip database

												$scope.salslip.salarystruct = $scope.selectedSalSlip[0];

												hrService
														.addgsalslip($scope.salslip);

												// ----------

											});

						}

					}
					$scope.selectedSalSlip = [];

					$scope.printganeratesalslip = function() {
						var hrService = appEndpointSF.gethrService();
						hrService
								.countOfRecordsiInganeratedslip()
								.then(
										function(printSalSelectedSlipList) {
											$scope.printGSalStruct = printSalSelectedSlipList;

											$scope.salslip.ganeratedcode = $scope.printGSalStruct.length + 100;
											$scope.salslip.month = $scope.selectmonth;

										});
					}
					$scope.printGSalStruct = [];
					$scope.printganeratesalslip();*/

		/*			$scope.displyOnlySelected = function(abc) {
						var hrService = appEndpointSF.gethrService();
						$scope.currmonth = "" + monthNames[date.getMonth()]
								+ ' ' + date.getFullYear();
						if (typeof abc != 'undefined') {
							$scope.currmonth = abc
							$log.debug("*******************" + abc);
						}

						hrService
								.displyOnlySelected($scope.currmonth)
								.then(
										function(getDisplyOnlySelected) {
											$scope.displyselected = getDisplyOnlySelected;
											//$log.debug("$scope.displyselected=========="+$scope.displyselected);
										});
					}
					$scope.displyselected = [];
					$scope.displyOnlySelected();*/

		/*			$scope.printslip = function() {
						var hrService = appEndpointSF.gethrService();

						hrService
								.printslip($scope.printempidsalslip)
								.then(
										function(getslip) {
											$scope.printslectedslip = getslip;
											$log
													.debug("$scope.displyselected=========="
															+ $scope.printslectedslip);
										});
					}
					$scope.printslectedslip = [];
					$scope.printslip();*/

			/*		$scope.printSalSlipDiv = function(salSlipDiv) {
						// window.frames["print_frame"].document.body.innerHTML
						// = printDivCSS
						// + document.getElementById(divId).innerHTML;
						window.frames["print_frame"].document.body.innerHTML = document
								.getElementById(salSlipDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						window.frames["print_frame"].window.print();
					}*/

					// ---------------------------------------------------------------------------------------------------------------
			/*		$scope.getAllempsSalStruct = function() {
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
					$scope.viewfindsalstruct();*/

					$scope.getJson = function(object) {
						return angular.toJson(object);
					};
					// --------------------------------------------------------------------------------------

					/*$scope.getlastmonth = function() {

						for (var i = 0; i < 3; i++) {
							$scope.months.push(monthNames[date.getMonth()]
									+ ' ' + date.getFullYear());

							// Subtract a month each time
							date.setMonth(date.getMonth() - 1);
						}
					}

					$scope.months = [];

					$scope.getlastmonth();
*/
					/*$scope.loadOptions= function(){
						$scope.getlastmonth();
						$scope.selectmonth=months[0];
						
					}*/
					// ------------------------------------------------------------------------------------
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
