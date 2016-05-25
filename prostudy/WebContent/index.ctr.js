angular
		.module("prostudyApp")
		.controller(
				"indexCtr",
				function($scope, $window, $log, $q, $timeout, $mdToast,
						$mdBottomSheet, $state, appEndpointSF) {

					$log.debug("Inside indexCtr");
					$scope.loading = true;
					$scope.curUser = null;
					$scope.googleUserDetails = "";
					$scope.googleUser = 'null';
					$scope.flag = true;
					$scope.theme = 'default';

					
					$scope.themeList = [ 'default', 'red', 'pink', 'purple',
											'deep-purple', 'indigo', 'blue', 'light-blue',
											'cyan', 'teal', 'green', 'light-green', 'lime',
											'yellow', 'amber', 'orange', 'deep-orange',
											'brown', 'grey', 'blue-grey' ];

									$scope.changeTheme = function(themeName) {
										$scope.theme = themeName
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
/*
					$scope.$on('customLoginEvent', function(event, args) {
						$log.debug("In side customLogin on Index Page");
						$scope.curUser = args.curUser;

					});
*/
					$scope.$on('moduleData', function(event, args1) {
						$log.debug("In side customLogin on Index Page");
						$scope.modules = args1.modules;
					});
					
					
					
					
					$scope.authModule = [];
					$scope.$on('customLoginEvent', function(event, args) {
						$log.debug("In side customLogin on Index Page");
						$scope.curUser = args.curUser;
						
						$scope.getCurrentUserRoleByInstitute();
						$scope.modules = args.modules;
					});
					
					
					
					$scope.getCurrentUserRoleByInstitute = function() {

						$scope.selection = [];
						$scope.data = {instituteID : '',role:'' };
						var UserService = appEndpointSF.getUserService();

						UserService.getCurrentUserRoleByInstitute(
								$scope.curUser.instituteID,$scope.curUser.role).then(
								function(modules) {
									$scope.modules = modules;
									console.log("$scope.modules==ROLE=="+$scope.modules);
									$scope.$emit('moduleData', { modules:$scope.modules });
								});

					}
					
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope
							.$on(
									'event:google-plus-signin-success',
									function(event, authResult) {

										// User successfully authorized the G+
										// App!
										$log.debug('Signed in!');
										var profile = authResult
												.getBasicProfile();
										$scope.googleUser = profile;
										$scope.imgUrl = $scope.googleUser
												.getImageUrl();

										$log.debug('ID: ' + profile.getId());

										$scope.googleUserDetails = profile
												.getName()
												+ "<br>" + profile.getEmail()

										appEndpointSF
												.getUserService()
												.getUserByEmailID(
														profile.getEmail())
												.then(
														function(loggedInUser) {

															appEndpointSF
																	.getLocalUserService()
																	.saveLoggedInUser(
																			loggedInUser);

															if (loggedInUser.myExams == undefined) {
																loggedInUser.myExams = [];
															}
															if (loggedInUser.myBooks == undefined) {
																loggedInUser.myBooks = [];
															}
															if (loggedInUser.institute == undefined) {
																loggedInUser.institute = [];
															}
															$scope.curUser = loggedInUser;

															if (loggedInUser.id == undefined) {

																loggedInUser.email_id = profile
																		.getEmail();
																profile
																		.getName()
																		.split(
																				" ")[0];
																loggedInUser.firstName = profile
																		.getName()
																		.split(
																				" ")[0];
																loggedInUser.lastName = profile
																		.getName()
																		.split(
																				" ")[1];

																appEndpointSF
																		.getLocalUserService()
																		.saveLoggedInUser(
																				loggedInUser);

																$scope.curUser = loggedInUser;

																$state
																		.go(
																				"updatemyprofile",
																				{
																					flag : $scope.flag
																				});
																return;
															}

														})

										$state.go("home");

									});

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
									$scope.institute = institute;
									$scope.theme = $scope.institute.theme;

								});

					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							$scope.getRoleSecListByInstitute();
							$scope.getInstituteById();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.signOut = function() {
						$log.debug('signOut1');
						if (gapi.auth2 == undefined) {
							$scope.curUser = null;
							$scope.curUser = appEndpointSF
									.getLocalUserService().logout();

							$state.go("home");
							return;
						}
						$log.debug('signOut2');
						var auth2 = gapi.auth2.getAuthInstance();
						auth2.signOut().then(
								function() {
									$log.debug('User signed out.');
									// also remove login details from chrome
									// browser

									$scope.googleUser = 'null';
									$scope.curUser = null;
									$scope.curUser = appEndpointSF
											.getLocalUserService().logout();

									$state.go("home");
								});
					}

					$scope.$on('event:google-plus-signin-failure', function(
							event, authResult) {
						// User has not authorized the G+ App!
						$log.debug('Not signed into Google Plus.');
						$scope.googleUser = 'null';
					});

					// $window.initGAPI = function() {}

					
					$scope.themeList = [ 'default', 'red', 'pink', 'purple',
							'deep-purple', 'indigo', 'blue', 'light-blue',
							'cyan', 'teal', 'green', 'light-green', 'lime',
							'yellow', 'amber', 'orange', 'deep-orange',
							'brown', 'grey', 'blue-grey' ];

					$scope.changeTheme = function(themeName) {
						$scope.theme = themeName
					}

					$scope.initCommonSetting = function() {
						$scope.theme = $scope.curUser.business.theme;
						
					}

					$scope.initGAPI = function() {
						$log.debug("Came to initGAPI");

					//	$scope.theme = $scope.curUser.theme;
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

					// initialize local objects

					$scope.initGAPI();

					
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