angular.module("prostudyApp").controller(
		"gfeModuleCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside gfeModuleCtr");			
					$scope.authorized = false;
					$scope.loading = false;
					$scope.currentClassroomUserDomain = null;
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					
					
					var CLIENT_ID = '759880535753-3h86dfhcao97655vcnooobn17l4flp8q.apps.googleusercontent.com';

					var SCOPES = [
					       
							"https://www.googleapis.com/auth/classroom.courses",
							"https://www.googleapis.com/auth/userinfo.profile",							
							"https://www.googleapis.com/auth/classroom.profile.emails",
							"https://www.googleapis.com/auth/classroom.profile.photos",
							"https://www.googleapis.com/auth/plus.me",
							"https://www.googleapis.com/auth/userinfo.email",
							"https://www.googleapis.com/auth/admin.directory.user",
							"https://www.googleapis.com/auth/classroom.rosters",
							"https://mail.google.com",
							"https://www.googleapis.com/auth/gmail.modify",
							"https://www.googleapis.com/auth/gmail.compose",
							"https://www.googleapis.com/auth/gmail.send",
							"https://www.googleapis.com/auth/admin.directory.user.readonly",
				            "https://www.googleapis.com/auth/admin.directory.user"]
							

					
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
							$scope.loadDirectoryApi();
							$scope.loadClassroomApi(); // Do not auto load. Do
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

					
					$scope.loadDirectoryApi  =function () {
					      gapi.client.load('admin', 'directory_v1');
					    }
					
					$scope.loadClassroomApi = function() {
						gapi.client.load('gmail', 'v1', function(){});					
						gapi.client.load('classroom', 'v1');
						gapi.client
								.load(
										'plus',
										'v1',
										function() {
											var request = gapi.client.plus.people
													.get({
														'userId' : 'me'
													});
											request
													.execute(function(resp) {
														$scope.currentClassroomUserDomain = resp.emails[0].value.split("@")[1];
													
													});

										});

					}



				

				
			
		
			/* Setup menu */
			$scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
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
			
			$scope.checkAuth();
			
			

		});