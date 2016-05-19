angular
		.module("prostudyApp")
		.controller(
				"directoryUserListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
							
					$scope.loading = true;
					
					$scope.loadCurrentUserDomain = function() {
					gapi.client
					.load('plus',
							'v1',
							function() {
						
								var request = gapi.client.plus.people
										.get({
											'userId' : 'me'
										});
								request.execute(function(resp) {
											$scope.currentUserDomain = resp.emails[0].value.split("@")[1];		
											
										
										
										if($scope.$parent.directoryUserListBackup === null){
											$scope.getDirectoryUserList();
										}
										else{
											$log.debug('Using Cached List of Dir Users ...');
											$scope.directoryUserList = $scope.$parent.directoryUserListBackup;
											$scope.$apply(function(){
												$scope.loading = false;
											});		
										}
										
										
										});
							});
					
					}
				
				$scope.directoryUserList=[];
				$scope.selected = [];
				$scope.query = {
					order : 'name',
					limit : 5,
					page : 1
				};

				$scope.onpagechange = function(page, limit) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};			
				
				$scope.onorderchange = function(order) {
					var deferred = $q.defer();

					$timeout(function() {
						deferred.resolve();
					}, 2000);

					return deferred.promise;
				};
				
				
				$scope.deleteUser = function(primaryEmail) {					
					$scope.deleting = true;					
					$scope.loading = true;
					var request = gapi.client.directory.users.delete({userKey:primaryEmail});

					request.execute(function(resp) {						
						$scope.showUserDeletedToast();
						$scope.selected = [];
						$scope.getDirectoryUserList();						
					});
				}
				$scope.getDirectoryUserList= function() {	
					$scope.loading = true;
					var request = gapi.client.directory.users.list({domain:$scope.currentUserDomain,maxResults:'500'});				
					request.execute(function(resp) {
						$scope.users=resp.users;
						
						if ($scope.users.length > 0) {
							for (i = 0; i < $scope.users.length; i++) {
								
								$scope.directoryUserList.push( $scope.users[i]);
							}
						} else {
							$log.debug('No users found.');
						}						
						// $scope.loading = false;
						$scope.$apply(function(){
							$scope.loading = false;
						});						
						
						$scope.$parent.directoryUserListBackup = $scope.directoryUserList;
					});				
				}
				$scope.fitlerCompFn = function(actual, expected) {					
					return actual.indexOf(expected) > -1
				};
				$scope.showUserDeletedToast = function() {
					$mdToast.show($mdToast.simple().content(
							'Selected User Deleted Successfully!').position("top")
							.hideDelay(3000));
				};
				
				$scope.cancelButton = function() {
					$state.go("^", {});
				}
				$scope.loadCurrentUserDomain();
				
				
			
				});