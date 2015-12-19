angular
		.module("stockApp")
		.controller(
				"hrCtr.emplist_to_ganeratesalslip",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {

					$scope.printempidsalslip = $stateParams.printempidsalslip;

					$scope.emp = {
						empid : "",
						empName : "",
						email : "",
						compemail : "",
						empAddress : "",
						Designation:""
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
						MCTC : "",
						LDOther1dis : "",
						LDOther2dis : "",
						LDOther1amt : "",
						LDOther2amt : ""

					};

					$scope.salslip = {
						ganeratedcode : "",
						salslip_id : "",
						empdetail : $scope.emp,
						salarystruct : $scope.salstruct,
						month : "-",
						generateddate : "-",
						bank_name : "-",
						acno : "-",
						year:""
							
					};

					var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May",
							"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
			
					var date = new Date();
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

					$scope.getlastmonth = function() {
						var date = new Date();
						for (var i = 0; i < 3; i++) {
							$scope.months.push(monthNames[date.getMonth()]
									+ ' ' + date.getFullYear());

							// Subtract a month each time
							date.setMonth(date.getMonth() - 1);
						}
					}

					$scope.months = [];
					$scope.getlastmonth();

					$scope.ganeratesalslip = function() {
						$scope.printganeratesalslip();
						var hrService = appEndpointSF.gethrService();

						for (i = 0; i < $scope.selected.length; i++) {
							hrService
									.getstructByID($scope.selected[i].empid)
									.then(
											function(structlist) {
												$scope.selectedSalSlip = structlist;
										$log.debug("*********************="+ angular
																		.toJson($scope.selectedSalSlip[0]));
												// --------insert element in
												// salslip database
												$scope.salslip.salarystruct = $scope.selectedSalSlip[0];

											});

							hrService
									.getempByID($scope.selected[i].empid)
									.then(
											function(emplist) {
												$scope.selectedemp = emplist;

												$log.debug("*********************="+ angular
																		.toJson($scope.selectedemp[0]));
												// --------insert element in
												// salslip database

												$scope.salslip.empdetail = $scope.selectedemp[0];

												hrService
														.addgsalslip($scope.salslip);
												// ----------

											});

						}

					}
					$scope.selectedSalSlip = [];
					$scope.selectedemp = [];

					$scope.printganeratesalslip = function() {
						var date = new Date();
						
						var hrService = appEndpointSF.gethrService();
						hrService
								.countOfRecordsiInganeratedslip()
								.then(
										function(printSalSelectedSlipList) {
											$scope.printGSalStruct = printSalSelectedSlipList;
											$scope.salslip.ganeratedcode = $scope.printGSalStruct.length + 100;
											$scope.salslip.month = $scope.selectmonth;
											$scope.salslip.year ="Year"+ ' ' + date.getFullYear();
											
										});
					}
					$scope.printGSalStruct = [];
					$scope.printganeratesalslip();

					$scope.displyOnlySelected = function(abc) {

						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						$scope.currmonth = "" + monthNames[date.getMonth()]
								+ ' ' + date.getFullYear();

						$log.debug("*******************" + $scope.currmonth);
						if (typeof abc != 'undefined') {
							$scope.currmonth = abc;
							$log.debug("*******************" + abc);
						}

						hrService
								.displyOnlySelected($scope.currmonth)
								.then(
										function(getDisplyOnlySelected) {
											$scope.displyselected = getDisplyOnlySelected;
											$log
													.debug("$scope.displyselected=========="
															+ angular
																	.toJson($scope.displyselected));
										});
					}
					$scope.displyselected = [];
					$scope.displyOnlySelected();
					
					
					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printSalSlipDiv = function(salSlipDiv) {
						// window.frames["print_frame"].document.body.innerHTML
						// = printDivCSS
						// + document.getElementById(divId).innerHTML;
						
						document.getElementById('hidetr').style.display = 'block';
						window.frames["print_frame"].document.body.innerHTML =printDivCSS+ document
								.getElementById(salSlipDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						document.getElementById('hidetr').style.display = 'none';
						window.frames["print_frame"].window.print();
						
						
						
					}

					$scope.printslip = function() {	
						var hrService = appEndpointSF.gethrService();

						hrService
								.printslip($scope.printempidsalslip)
								.then(
										function(getslip) {
											$scope.printslectedslip = getslip;
											$log
													.debug("$scope.printslectedslip=========="
															+ $scope.printslectedslip);
										});
					}
					$scope.printslectedslip = [];
					$scope.printslip();

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
