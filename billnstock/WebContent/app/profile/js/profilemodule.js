angular
		.module("stockApp")
		.controller(
				"profileCtr",
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
	
					$scope.getuserById = function() {
						$log.debug("Inside Ctr $scope.getuserById");
						var setupService = appEndpointSF.getsetupService();
						if (typeof $scope.curuser.id != 'undefined') {
							setupService.getuserById($scope.curuser.id).then(
									function(userList) {
										$log.debug("Inside Ctr getAllleads");
										$scope.userL = userList.result;

									});
						}
					}

					$scope.userL = [];
					$scope.getuserById();

					$scope.updateuser = function() {
						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.userL).then(function(msgBean) {
							$scope.showSimpleToast(msgBean.msg); 
						});
					}
					
					

					
					$scope.changepass=function(){
					
							if ($scope.password == $scope.confirmpassword) {
								$scope.savemsg=true;
								$scope.checkpass=false;
							} else {
								$scope.checkpass=true;
								$scope.savemsg=false;
							}
							
							if($scope.savemsg==true){
							$scope.userL.password=$scope.password;
							var UserService = appEndpointSF.getUserService();
							UserService.updateUser($scope.userL).then(function(msgBean) {
								$scope.showSimpleToast(msgBean.msg); 
							});
							}
					}
					
					
					
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
					$scope.getlastyear();
					
					
					$scope.getallsalslip = function(abc) {
						var date = new Date();
						var hrService = appEndpointSF.gethrService();
						$scope.curryear = "Year" + ' ' + date.getFullYear();

						if (typeof abc != 'undefined') {
							$scope.curryear = abc;
							$log.debug("*******************abc===" + abc);
						}

						hrService
								.getallsalslip($scope.curryear,$scope.curUser.businessAccount.id)
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
					$scope.getallsalslip();
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
					$scope.printslip();
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
