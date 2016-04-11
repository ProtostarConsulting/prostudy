angular
		.module("stockApp")
		.controller(
				"AllSalslip",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					
					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					
					$scope.printempidsalslip = $stateParams.printempidsalslip;
					$scope.viewsalslips = $stateParams.viewsalslips;
					$scope.curuser = appEndpointSF.getLocalUserService().getLoggedinUser();
	
					
					
					//-----------------------------------------------------------------------
					
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
					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getlastyear();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();
					
				
					$scope.getallsalslip = function(abc) {
						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						$scope.curryear = "Year" + ' ' + date.getFullYear();

						if (typeof abc != 'undefined') {
							$scope.curryear = abc;
							$log.debug("*******************abc===" + abc);
						}

						hrService
								.getallsalslip($scope.curryear, $scope.curUser.business.id)
								 .then(
										function(empsalslips) {
											$scope.empSalSlip1 = empsalslips.items;
											$scope.empSalSlip = [];
											for (i = 0; i < $scope.empSalSlip1.length; i++) {
												if ($scope.curuser.id == $scope.empSalSlip1[i].salarystruct.empAccount.id) {
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
					
					$scope.waitForServiceLoad1 = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getallsalslip();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad1, 1000);
						}
					}
					$scope.waitForServiceLoad1();
//--------------------------------------------------------------------------------------
					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printSalSlipDiv = function(salSlipDiv) {
						document.getElementById('hidetr').style.display = 'block';
						window.frames["print_frame"].document.body.innerHTML = printDivCSS
								+ document.getElementById(salSlipDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						document.getElementById('hidetr').style.display = 'none';
						window.frames["print_frame"].window.print();

					}

					$scope.printslip = function() {
						var hrService = appEndpointSF.gethrService();
						if (typeof $scope.printempidsalslip != "undefined") {
						hrService
								.printslip($scope.printempidsalslip)
								.then(
										function(getslip) {
											$scope.printslectedslip.push(getslip.result);
											$log
													.debug("$scope.printslectedslip=========="
															+ angular.toJson($scope.printslectedslip));
										});
					}
					}
					$scope.printslectedslip = [];
					
					$scope.waitForServiceLoad2 = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.printslip();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad2, 1000);
						}
					}
					$scope.waitForServiceLoad2();
		//----------------------------------------------------------------
					
					
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
