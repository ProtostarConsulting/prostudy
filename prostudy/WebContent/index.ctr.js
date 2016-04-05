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
					$scope.tempUser = {email_id: '', password: ''};
					$scope.loginClick = function() {
						$state.go("login");
					};
					
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
					
					$scope.$on('event:google-plus-signin-success', function(
							event, authResult) {
						// User successfully authorized the G+ App!
						$log.debug('Signed in!');
						var profile = authResult.getBasicProfile();
						$scope.googleUser = profile;
						$scope.imgUrl=$scope.googleUser.getImageUrl();
						
						$log.debug('ID: ' + profile.getId());
						// Do not send to your backend! Use an ID token instead.
						$log.debug('Name: ' + profile.getName());
						$log.debug('Image URL: ' + profile.getImageUrl());
						$log.debug('email_id: ' + profile.getEmail());
						$scope.googleUserDetails = profile.getName() + "<br>"
								+ profile.getEmail()

						appEndpointSF.getUserService().getUserByEmailID(
								profile.getEmail()).then(
								function(loggedInUser) {

									appEndpointSF.getLocalUserService()
											.saveLoggedInUser(loggedInUser);

									if (loggedInUser.myExams == undefined) {
										loggedInUser.myExams=[];
									}
									if (loggedInUser.myBooks == undefined) {
										loggedInUser.myBooks=[];
									}
									if (loggedInUser.institute == undefined) {
										loggedInUser.institute=[];
									}
									$scope.curUser = loggedInUser;
									$log.debug("$scope.curUser:"
											+ angular.toJson($scope.curUser));
								
									if (loggedInUser.id == undefined) {
											
										loggedInUser.email_id = profile.getEmail();
										profile.getName().split(" ")[0];
										loggedInUser.firstName = profile.getName().split(" ")[0];
										loggedInUser.lastName = profile.getName().split(" ")[1];
										
										appEndpointSF.getLocalUserService()
										.saveLoggedInUser(loggedInUser);
										
										$state.go("updatemyprofile",{flag: $scope.flag});
										return;
									}	

								})
								
								

						$log.debug("Forwarding to home state...");
						$state.go("home");

					});
					
				

					$log.debug('$scope.curUser'
							+ angular.toJson($scope.curUser));

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
									//also remove login details from chrome browser
									
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
														$scope.loading = false;		
													});
								}, 2000);

					};

					// initialize local objects

					$scope.initGAPI();
					
					$scope.safeApply = function(fn) {
						  var phase = this.$root.$$phase;
						  if(phase == '$apply' || phase == '$digest') {
						    if(fn && (typeof(fn) === 'function')) {
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