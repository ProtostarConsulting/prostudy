angular
		.module("prostudyApp")
		.controller(
				"indexCtr",
				function($scope, $window, $log, $q, $timeout, $mdToast,
						$mdBottomSheet, $state, appEndpointSF) {

					$log.debug("Inside indexCtr");

					var defaulLogingUserIconURL = '/img/icons/ic_person_24px.svg';
					$scope.showUpdateToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Changes Saved Successfully.').position("top")
								.hideDelay(3000));
					};

					$scope.showAddToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Record Saved Successfully.').position(
								"top").hideDelay(3000));
					};

					$scope.loading = true;
					$scope.curUser = null;
					$scope.googleUserDetails = "";
					$scope.googleUser = 'null';
					$scope.flag = true;
					$scope.initDone = false;
					$scope.theme = 'default';
					$scope.imgUrl = defaulLogingUserIconURL;

					if ($scope.curUser != undefined || $scope.curUser !== null) {
						$scope.theme = $scope.curUser.instituteObj.theme;
						$scope.logBaseURL = '//' + window.location.host
								+ '/serve?blob-key='
								+ $scope.curUser.instituteObj.logBlobKey;
						// $scope.logFooterURL = '//' + window.location.host +
						// '/serve?blob-key='+
						// $scope.curUser.instituteObj.footerBlobKey;
					}

					$scope.themeList = [ 'default', 'red', 'pink', 'purple',
							'deep-purple', 'indigo', 'blue', 'light-blue',
							'cyan', 'teal', 'green', 'light-green', 'lime',
							'yellow', 'amber', 'orange', 'deep-orange',
							'brown', 'grey', 'blue-grey' ];

					$scope.changeTheme = function(themeName) {
						$scope.theme = themeName
					}

					$scope.loginCheck = function() {
						var curUser = appEndpointSF.getLocalUserService()
								.getLoggedinUser();
						if (curUser == undefined || curUser == null) {
							$state.go("login");
							return false;
						}
						return true;
					}

					$scope.showUpdateToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Changes Saved Successfully.').position("top")
								.hideDelay(3000));
					};

					$scope.showAddToast = function() {
						$mdToast.show($mdToast.simple().content(
								'New Record Saved Successfully.').position(
								"top").hideDelay(3000));
					};

					$scope.institute = [];

					$scope.tempUser = {
						email_id : '',
						password : ''
					};
					$scope.loginClick = function() {
						$state.go("login");
					};

					$scope.$on('moduleData', function(event, args1) {
						$log.debug("In side customLogin on Index Page");
						$scope.modules = args1.modules;
					});

					$scope.authModule = [];
					$scope.$on('customLoginEvent', function(event, args) {
						$log.debug("In side customLogin on Index Page");
						$scope.curUser = args.curUser;
						$scope.getInstituteById();
						$scope.getCurrentUserRoleByInstitute();
						$scope.modules = args.modules;
					});

					$scope.getCurrentUserRoleByInstitute = function() {

						$scope.selection = [];
						$scope.data = {
							instituteID : '',
							role : ''
						};
						var UserService = appEndpointSF.getUserService();

						UserService
								.getCurrentUserRoleByInstitute(
										$scope.curUser.instituteID,
										$scope.curUser.role)
								.then(
										function(modules) {
											$scope.modules = modules;
											console
													.log("$scope.modules==ROLE=="
															+ $scope.modules);
											$scope.$emit('moduleData', {
												modules : $scope.modules
											});
										});

					}

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.$on('event:google-plus-signin-success', function(
							event, authResult) {
						$log.debug('Signed in!');
						// User successfully authorized the G+ App!
						continueGoogleLogin(authResult);
					});

					function continueGoogleLogin(authResult) {
						$scope.loading = true;
						if (!appEndpointSF.is_service_ready) {
							$scope.waitForServiceLoad(authResult);
							// This is needed when auto login happens after page
							// refresh
							return;
						}

						var profile = authResult.getBasicProfile();
						$scope.googleUser = profile;

						$scope.imgUrl = $scope.googleUser.getImageUrl();

						if ($scope.imgUrl == null || $scope.imgUrl == '') {
							$scope.imgUrl = defaulLogingUserIconURL;
						}

						$log.debug('ID: ' + profile.getId());

						$scope.googleUserDetails = profile.getName() + "<br>"
								+ profile.getEmail()

						appEndpointSF
								.getUserService()
								.getUserByEmailID(profile.getEmail())
								.then(
										function(loggedInUser) {
											$log
													.debug('Inside getUserByEmailID...');

											appEndpointSF.getLocalUserService()
													.saveLoggedInUser(
															loggedInUser);

											$log
													.debug("loggedInUser:"
															+ angular
																	.toJson(loggedInUser));

											$scope.curUser = loggedInUser;

											if (loggedInUser.myExams == undefined) {
												loggedInUser.myExams = [];
											}
											if (loggedInUser.myBooks == undefined) {
												loggedInUser.myBooks = [];
											}
											if (loggedInUser.institute == undefined) {
												loggedInUser.institute = [];
											}

											if (loggedInUser.id == undefined) {
												$log
														.debug('Inside loggedInUser.id == undefined...');
												loggedInUser.email_id = profile
														.getEmail();
												profile.getName().split(" ")[0];
												loggedInUser.firstName = profile
														.getName().split(" ")[0];
												loggedInUser.lastName = profile
														.getName().split(" ")[1];

												appEndpointSF
														.getLocalUserService()
														.saveLoggedInUser(
																loggedInUser);

												$state.go("updatemyprofile", {
													flag : $scope.flag
												});

											} else {
												$log
														.debug('Inside else of loggedInUser.id == undefined...');
												$scope.getInstituteById();

											}

											$scope.loading = false;

										});

					}

					$scope.getRoleSecListByInstitute = function() {

						$scope.selection = [];
						var UserService = appEndpointSF.getUserService();

						UserService.getRoleSecListByInstitute(
								$scope.curUser.instituteID).then(
								function(modules) {
									$scope.modules = modules;

								});

					}

					$scope.getInstituteById = function() {

						var InstituteService = appEndpointSF
								.getInstituteService();

						InstituteService.getInstituteById(
								$scope.curUser.instituteID).then(
								function(institute) {
									var curUser = appEndpointSF
											.getLocalUserService()
											.getLoggedinUser();
									curUser.instituteObj = institute;
									appEndpointSF.getLocalUserService()
											.saveLoggedInUser(curUser);

									$scope.curUser = curUser;
									$scope.initCommonSetting();
								});

					}

					function getUserAuthTree() {
						var authService = appEndpointSF
								.getAuthorizationService();
						authService
								.getAuthorizationMasterEntity()
								.then(
										function(result) {
											$log.debug("result:" + result);
											var authorizationMasterEntity = {
												authorizations : []
											};
											var userAuthMasterEntity = {
												authorizations : []
											};

											var jsonUserAuthObject = angular
													.fromJson($scope.curUser.authorizations);

											if ($scope.curUser.authorizations) {
												var jsonUserAuthObject = angular
														.fromJson($scope.curUser.authorizations);
												$scope.userAuthObject = jsonUserAuthObject;
											} else {
												$scope.userAuthObject = {
													authorizations : []
												};
											}

											if (result
													&& result.authorizations != undefined) {

												authorizationMasterEntity.authorizations = result.authorizations;

												userAuthMasterEntity = authService
														.filterMasterAuthTree(
																authorizationMasterEntity,
																$scope.userAuthObject,
																userAuthMasterEntity);

												userAuthMasterEntity.authorizations
														.sort(function(a, b) {
															return (a.orderNumber > b.orderNumber) ? 1
																	: -1
														});

												$log
														.debug("userAuthMasterEntity:"
																+ angular
																		.toJson(userAuthMasterEntity));

												var curUser = appEndpointSF
														.getLocalUserService()
														.getLoggedinUser();
												curUser.userAuthMasterEntity = userAuthMasterEntity;
												appEndpointSF
														.getLocalUserService()
														.saveLoggedInUser(
																curUser);

												$scope.curUser = curUser;
												// $scope.safeApply();
											}
										});
					}

					$scope.signOut = function() {
						$log.debug('signOut1');
						if (gapi.auth2 == undefined) {
							$scope.curUser = null;
							$scope.curUser = appEndpointSF
									.getLocalUserService().logout();
							$scope.imgUrl = defaulLogingUserIconURL;
							$state.go("login");
							return;
						}
						$log.debug('signOut2');
						var auth2 = gapi.auth2.getAuthInstance();
						auth2.signOut().then(
								function() {
									$log.debug('User signed out.');
									// also remove login details from
									// chrome
									// browser

									$scope.googleUser = null;
									$scope.curUser = null;
									$scope.curUser = appEndpointSF
											.getLocalUserService().logout();
									$scope.imgUrl = defaulLogingUserIconURL;
									$state.go("login");

								});
					}

					$scope.$on('event:google-plus-signin-failure', function(
							event, authResult) {
						// User has not authorized the G+ App!
						$log.debug('Not signed into Google Plus.');
						$scope.googleUser = null;
						// $scope.getInstituteById();
					});

					// $window.initGAPI = function() {}

					$scope.initCommonSetting = function() {
						$log.debug('Inside initCommonSetting');

						$scope.curUser = appEndpointSF.getLocalUserService()
								.getLoggedinUser();

						if ($scope.curUser == null) {
							$state.go("login");
							return; // else it goes to login state but continues
							// the this js flow
						}
						$scope.theme = $scope.curUser.instituteObj.theme;
						$scope.logoURL = '//' + window.location.host
								+ '/serve?blob-key='
								+ $scope.curUser.instituteObj.logBlobKey;

						$scope.institute = $scope.curUser.instituteObj;
						getUserAuthTree();
						$scope.initDone = true;
						$state.go("welcome");

					}

					$scope.initGAPI = function() {
						$log.debug("Came to initGAPI");

						// $scope.theme = $scope.curUser.theme;
						// This will load all server side end points
						// $scope.loadAppGoogleServices();
						$timeout(
								function() {
									appEndpointSF
											.loadAppGoogleServices($q.defer())
											.then(
													function() {
														$log
																.debug("##########Loaded All Google Endpoint Services....#########");
														$scope.loading = false;
													});
								}, 2000);

					};

					$scope.waitForServiceLoad = function(authResult) {
						if (!appEndpointSF.is_service_ready) {
							$log
									.debug("Index: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
							return;
						}

						$log
								.debug("####Index: Loaded All Services, Continuing####");
						if (authResult) {
							continueGoogleLogin(authResult);
						}
						if (!$scope.initDone) {
							$scope.initCommonSetting();
						}
					}

					$scope.initGAPI();
					$scope.waitForServiceLoad();

					$scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if (phase == '$apply' || phase == '$digest') {
							if (fn && (typeof (fn) === 'function')) {
								fn();
							}
						} else {
							this.$apply(fn);
						}
					};

				}).controller('AppCtrl',
				function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
					$scope.toggleLeft = buildToggler('left');

					function buildToggler(navID) {
						var debounceFn = $mdUtil.debounce(function() {
							$mdSidenav(navID).toggle().then(function() {
								$log.debug("toggle " + navID + " is done");
							});
						}, 200);
						return debounceFn;
					}

				}).controller('LeftCtrl',
				function($scope, $timeout, $mdSidenav, $log) {
					$scope.close = function() {
						$mdSidenav('left').close().then(function() {
							$log.debug("close LEFT is done");
						});
					};
				});