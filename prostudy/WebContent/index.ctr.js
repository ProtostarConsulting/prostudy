angular
		.module("prostudyApp")
		.controller(
				"indexCtr",
				function($scope, $window, $log, $q, $timeout, $mdToast,
						$mdBottomSheet, $state, appEndpointSF) {

					$log.debug("Inside indexCtr");

					$scope.curUser = null;
					$scope.googleUserDetails = "";
					$scope.googleUser = 'null';

					$scope.loginClick = function() {
						$state.go("login");
					};

					$scope.$on('event:google-plus-signin-success', function(
							event, authResult) {
						// User successfully authorized the G+ App!
						console.log('Signed in!');
						var profile = authResult.getBasicProfile();
						$scope.googleUser = profile;
						console.log('ID: ' + profile.getId());
						// Do not send to your backend! Use an ID token instead.
						console.log('Name: ' + profile.getName());
						console.log('Image URL: ' + profile.getImageUrl());
						console.log('email_id: ' + profile.getEmail());
						$scope.googleUserDetails = profile.getName() + "<br>"
								+ profile.getEmail()

						appEndpointSF.getUserService().getUserByEmailID(
								profile.getEmail()).then(
								function(loggedInUser) {
									$log.debug("loggedInUser:"
											+ angular.toJson(loggedInUser));
									appEndpointSF.getLocalUserService()
											.saveLoggedInUser(loggedInUser);

									$scope.curUser = loggedInUser;
									if (loggedInUser.id == undefined) {

										$state.go("newUserStudent");
										return;
									}

								}

						)

						$log.debug("Forwarding to home state...");
						$state.go("home");

					});

					console.log('$scope.curUser'
							+ angular.toJson($scope.curUser));

					$scope.signOut = function() {
						console.log('signOut1');
						if (gapi.auth2 == undefined) {
							$scope.curUser = null;
							$scope.curUser = appEndpointSF
									.getLocalUserService().logout();

							$state.go("home");
							return;
						}
						console.log('signOut2');
						var auth2 = gapi.auth2.getAuthInstance();
						auth2.signOut().then(
								function() {
									console.log('User signed out.');
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
						console.log('Not signed into Google Plus.');
						$scope.googleUser = 'null';
					});

					// $window.initGAPI = function() {}
					$scope.initGAPI = function() {
						$log.debug("Came to initGAPI");
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
													});
								}, 2000);

					};

					// initialize local objects

					$scope.initGAPI();

				}).controller('AppCtrl',
				function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
					$scope.toggleLeft = buildToggler('left');
					// $scope.toggleRight = buildToggler('right');
					/**
					 * Build handler to open/close a SideNav; when animation
					 * finishes report completion in console
					 */
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