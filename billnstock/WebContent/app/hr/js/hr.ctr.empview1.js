angular
		.module("stockApp")
		.controller(
				"hrCtr.empview",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {

					$scope.selectedempNo = $stateParams.selectedempNo;
					$scope.viewsalslips = $stateParams.viewsalslips;

					$scope.x = location.href;
					var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May",
										"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
					$scope.showEmp = function() {
						var hrService = appEndpointSF.gethrService();

						hrService
								.getempByID($scope.selectedempNo)
								.then(
										function(empList) {
											$scope.empDetail = empList;
											$log
											.debug("$scope.empDetail" + angular
													.toJson($scope.empDetail.result));
										
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
									//	$scope.empDetail = [];
								});
					}
				
					$scope.getallsalslip = function(abc) {
						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						$scope.curryear = "Year"
							+ ' ' + date.getFullYear();

						if (typeof abc != 'undefined') {
							$scope.curryear = abc;
							$log.debug("*******************abc===" + abc);
						}
						
						hrService
								.getallsalslip($scope.curryear) //$scope.viewsalslips, use emp id
								.then(
										function(empsalslips) {
											$scope.empSalSlip = empsalslips;
											$log
													.debug("$scope.empSalSlip:empSalSlip ===="
															+ angular
																	.toJson($scope.empSalSlip));
										});

					}
					$scope.empSalSlip = [];
					$scope.getallsalslip();

					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')

					$scope.printSalSlipDiv = function(salSlipDiv) {

						/* window.frames["print_frame"].document.body.innerHTML = printDivCSS
							 + document.getElementById(salSlipDiv).innerHTML;
						 */
						document.getElementById('hidetr').style.display = 'block';
						
						window.frames["print_frame"].document.body.innerHTML = printDivCSS+ document
								.getElementById(salSlipDiv).innerHTML;
						window.frames["print_frame"].window.focus();
						document.getElementById('hidetr').style.display = 'none';
						window.frames["print_frame"].window.print();

					}

					$scope.viewpdf = function() {

						//ExportToPDF('salSlipDiv');//,[], '??????? ???????', PDFPageType.Portrait);

					}
					$scope.getlastyear = function() {
						var date = new Date();
						for (var i = 0; i < 2; i++) {
							/*$scope.months.push(monthNames[date.getMonth()]
									+ ' ' + date.getFullYear());*/
							
							$scope.years.push("Year"
							+ ' ' + date.getFullYear());
							// Subtract a month each time
							date.setFullYear(date.getFullYear() - 1);
						}
					}

					$scope.years = [];
					$scope.getlastyear();
					
					

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
