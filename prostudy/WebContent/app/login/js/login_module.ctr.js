angular
		.module("prostudyApp")
		.controller(
				"loginModuleCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $location, objectFactory,
						appEndpointSF, tableTestDataFactory, $state) {

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Teacher Registered!').position("top")
								.hideDelay(3000));
					};
					$scope.curUser = null;
					$scope.flag=false;
					
					$scope.tempUser = {
						userId : "",
						firstName : "",
						lastName : "",
						instituteName : "",
						userName : "",
						email_id : "",
						address : "",
						contact : "",
						gender : "",
						password : "",
						role : "Teacher",
						book : ""

					};
					$scope.loginMsg = "";
					$scope.users = [];

					$scope.addUser = function() {
						$log.debug("No1");
						var UserService = appEndpointSF.getUserService();
						UserService.addUser($scope.tempUser).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr addTeacher");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSavedToast();

								});
						$log.debug("No4");

					}
					$scope.login = function() {
						var UserService = appEndpointSF.getUserService();
						UserService
								.login($scope.tempUser.email_id,
										$scope.tempUser.password)
								.then(
										function(result) {
											if (result.result.email_id) {
												appEndpointSF
														.getLocalUserService()
														.saveLoggedInUser(
																result.result);
												$scope.curUser = result.result;

												$log
														.debug("User logged in successfully: "
																+ $scope.tempUser.email_id);
												$window.location.reload();
												$state.go("home");

											} else {							
											document.getElementById("errmsg").innerHTML = "You are not registered user.";
											$scope.loginMsg = "Login failed.";
											}
										});
					}
			
					$scope.cancelButton = function() {
						$state.go("home", {});
					}

					/* Setup page menu */
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

