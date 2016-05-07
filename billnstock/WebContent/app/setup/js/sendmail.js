angular
		.module("stockApp")
		.controller(
				"sendmail",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $stateParams, $log, objectFactory,
						appEndpointSF) {
					// ////////////////////////////////////////////////////////////////////////////////////////////////

					$scope.curuser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					$scope.authorized = false;
					$scope.loading = false;
					$scope.currentClassroomUser = null;
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();

					// var CLIENT_ID =
					// '871660457189-1ishasdcqph3an1eu26262htusofo6v2';
					var CLIENT_ID = '759880535753-3h86dfhcao97655vcnooobn17l4flp8q.apps.googleusercontent.com';
					var SCOPES = [ "https://mail.google.com",
							"https://www.googleapis.com/auth/plus.me",
							"https://www.googleapis.com/auth/gmail.modify",
							"https://www.googleapis.com/auth/gmail.compose",
							"https://www.googleapis.com/auth/gmail.send",
							"https://www.googleapis.com/auth/gmail.readonly" ]

					$scope.checkAuth = function checkAuth() {
						$log.debug("Inside checkAuth..");
						gapi.auth.authorize({
							'client_id' : CLIENT_ID,
							'scope' : SCOPES.join(' '),
							'immediate' : true
						}, $scope.handleAuthResult);
					}

					$scope.handleAuthResult = function(authResult) {
						$log.debug("Inside handleAuthResult..");
						// var authorizeDiv = document
						// .getElementById('authorize-div');
						if (authResult && !authResult.error) {
							// Hide auth UI, then load client library.
							// authorizeDiv.style.display = 'none';
							$scope.authorized = true;
							$scope.loadGmailApi();
							// $scope.loadClassroomApi(); // Do not auto load.
							// Do
							// it via user action
						} else {
							// Show auth UI, allowing the user to initiate
							// authorization by
							// clicking authorize button.
							// authorizeDiv.style.display = 'inline';
							$scope.authorized = false;
						}
					}

					$scope.handleAuthClick = function(event) {
						$log.debug("Inside handleAuthClick..");
						gapi.auth.authorize({
							client_id : CLIENT_ID,
							scope : SCOPES,
							immediate : false
						}, $scope.handleAuthResult);
						return false;
					}
					$scope.currentUser = null;
					$scope.loadGmailApi = function() {
						gapi.client.load('gmail', 'v1', $scope.listLabels);
						$log.debug("****load gmail api****");
						gapi.client.load('plus', 'v1', function() {
							var request = gapi.client.plus.people.get({
								'userId' : 'me'
							});
							request.execute(function(resp) {
								$scope.currentUser = resp;
								$log.debug('Retrieved profile for:'
										+ resp.displayName);
								$log.debug("$scope.currentUser:"
										+ angular.toJson($scope.currentUser));
							});

						});
					}

					$scope.listLabels = function() {
						var request = gapi.client.gmail.users.labels.list({
							'userId' : 'me'
						});
						$log.debug("****list gmail api****"
								+ angular.toJson(request));
					}
					/*
					 * 
					 * $scope.getCurrentUser = function() { var request =
					 * gapi.client.plus.people.get({ 'userId' : 'me' });
					 * request.execute(function(resp) { $scope.currentUser =
					 * resp; console.log('Retrieved profile for:' +
					 * resp.displayName); }); }
					 * 
					 * 
					 * $scope.getCurrentUser();
					 */

					$scope.sendEmailMessage = function() {
						$log.debug("$scope.currentUser:" + $scope.currentUser);
						// var base64EncodedEmail = btoa("Test message");

						/*
						 * var base64EncodedEmail = btoa( "From:
						 * pushpak.pimpale@gmail.com\n" + "To:
						 * pushpak6191@gmail.com\n" + "Subject: Example
						 * Subject\n\n" +
						 * 
						 * "This is the body of the mail" ).replace(/\+/g,
						 * '-').replace(/\//g, '_');
						 * 
						 * 
						 * var mail= base64EncodedEmail; var request =
						 * gapi.client.gmail.users.messages .send({ //'userId' :
						 * "pushpak6191@gmail.com", 'userId' : "me", 'message' : {
						 * 'raw' : mail } }); request.execute(function(resp) {
						 * $log.debug("Send Emnail resp:" +
						 * angular.toJson(resp));
						 * 
						 * }); }
						 */

						var base64EncodedEmail = btoa("pushpak6191@gmail.com");
						var request = gapi.client.gmail.users.messages.send({
							'userId' : "me",
							'message' : {
								'raw' : base64EncodedEmail
							}
						});

						//request.execute(callback);
						 request.execute(function(resp) {
							 $log.debug("Send Emnail resp:" +
							 angular.toJson(resp));
						 });
					}

					/* $scope.sendEmailMessage(); */

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
