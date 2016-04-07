angular
		.module("stockApp")
		.controller(
				"hrctr.selected_Employeesalaryslip",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,$state,
						appEndpointSF) {

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};

					$scope.printempidsalslip = $stateParams.printempidsalslip;
					$scope.ganeratedsalslip = $stateParams.ganeratedsalslip;
					
					var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May",
							"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

					var date = new Date();
								
										

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
								.displyOnlySelected($scope.currmonth,$scope.curUser.businessAccount.id)
								.then(
										function(getDisplyOnlySelected) {
											$scope.displyselected = getDisplyOnlySelected.items;

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
