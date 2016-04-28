angular
		.module("stockApp")
		.controller(
				"hrCtr.empview",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {

					$scope.selectedempNo = $stateParams.selectedempNo;
					$scope.viewsalslips = $stateParams.viewsalslips;
					
					$scope.curUser = appEndpointSF.getLocalUserService().getLoggedinUser();

					$scope.x = location.href;
					var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May",
							"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
					$scope.showEmp = function() {
						var hrService = appEndpointSF.gethrService();
						if (typeof $scope.selectedempNo != 'undefined') {
						hrService
								.getempByID($scope.selectedempNo)
								.then(
										function(empList) {
											$scope.empDetail = empList.result;
											$log
													.debug("$scope.showBill:empDetail ===="
															+ angular
																	.toJson($scope.empDetail));
										});
						}
					}
					$scope.empDetail = [];
				
					$scope.waitForServiceLoad1 = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.showEmp();
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad1();
					$scope.updateemp = function() {

						var hrService = appEndpointSF.gethrService();
						hrService.updateemp($scope.empDetail).then(
								function(msgBean) {
									$log.debug("Inside Ctr updateemp");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showUpdateToast();
									// $scope.empDetail = [];
								});
					}

					$scope.getallsalslip = function(abc) {
						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						$scope.curryear = "Year" + ' ' + date.getFullYear();

						if (typeof abc != 'undefined') {
							$scope.curryear = abc;
							$log.debug("*******************abc===" + abc);
						}

						hrService
								.getallsalslip($scope.curryear,$scope.curUser.business.id)
								 .then(
										function(empsalslips) {
											$scope.empSalSlip1 = empsalslips.items;
											$scope.empSalSlip = [];
											for (i = 0; i < $scope.empSalSlip1.length; i++) {
												if ($scope.viewsalslips == $scope.empSalSlip1[i].salarystruct.empAccount.empid) {
													$scope.empSalSlip.push($scope.empSalSlip1[i]);
												}
											}
											$log
													.debug("$scope.empSalSlip:empSalSlip ===="
															+ angular
																	.toJson($scope.empSalSlip));
										});

					}
					$scope.empSalSlip1 = [];
					$scope.empSalSlip = [];
				
					
					$scope.waitForServiceLoad2 = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getallsalslip();
							
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad2();
					

					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printSalSlipDiv = function(salSlipDiv) {

						/*
						 * window.frames["print_frame"].document.body.innerHTML =
						 * printDivCSS +
						 * document.getElementById(salSlipDiv).innerHTML;
						 */
						document.getElementById('hidetr').style.display = 'block';

						window.frames["print_frame"].document.body.innerHTML = printDivCSS
								+ document.getElementById(salSlipDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						document.getElementById('hidetr').style.display = 'none';
						window.frames["print_frame"].window.print();

					}

					$scope.viewpdf = function() {

						// ExportToPDF('salSlipDiv');//,[], '??????? ???????',
						// PDFPageType.Portrait);

					}
					$scope.getlastyear = function() {
						var date = new Date();
						for (var i = 0; i < 2; i++) {
							/*
							 * $scope.months.push(monthNames[date.getMonth()] + ' ' +
							 * date.getFullYear());
							 */

							$scope.years
									.push("Year" + ' ' + date.getFullYear());
							// Subtract a month each time
							date.setFullYear(date.getFullYear() - 1);
						}
					}

					$scope.years = [];
					$scope.waitForServiceLoad3 = function() {
						if (appEndpointSF.is_service_ready) {
								$scope.getlastyear();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad3();

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
