angular
		.module("prostudyApp")
		.controller(
				"initsetup",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {

					$scope.showSimpleToast = function(msgBean) {
						$mdToast.show($mdToast.simple().content(msgBean)
								.position("top").hideDelay(3000));
					};
					$scope.step1;
					$scope.step2;
					$scope.initsetup = function() {

						var protostarAdminService = appEndpointSF
								.getProtostarAdminService();
						protostarAdminService
								.getallAccountType()
								.then(
										function(gotAccountList) {

											$scope.accountlist = (gotAccountList == undefined || gotAccountList.items == undefined) ? 0
													: gotAccountList.items.length;
											if ($scope.accountlist == 0) {
												protostarAdminService
														.initsetup()
														.then(
																function(
																		msgBean) {

																	$scope.step1 = "Account type are created click next to add Protostar Admin ";

																});
											} else {

												$scope.step1 = "Setup Already done go to home";
												//angular.element('addemp').visibility = false;
												//document.getElementById('addemp')
											}

										});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.initsetup();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();
					$scope.addemp = function() {
						var protostarAdminService = appEndpointSF
								.getProtostarAdminService();
						protostarAdminService
								.getallAccountType()
								.then(
										function(gotAccountList) {
											$scope.accountlist = (gotAccountList == undefined || gotAccountList.items == undefined) ? 0
													: gotAccountList.items.length;

											if ($scope.accountlist >= 4) {
												protostarAdminService
														.getAllemp()
														.then(
																function(
																		gotEmpList) {
																	$scope.emps = (gotEmpList == undefined || gotEmpList.items == undefined) ? 0
																			: gotEmpList.items.length;

																	if ($scope.emps == 0) {
																		protostarAdminService
																				.initsetupnext()
																				.then(
																						function(
																								msgBean) {
																							$scope.step2 = "Add User Successfully ";

																						});
																	} else {
																		$scope.step2 = "Setup Is Finish";
																	}

																});
											} else {
												$scope.step2 = "Account Type Is Not In Database Again Click On Next Button";
											}

										});
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
