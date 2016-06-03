angular
		.module("prostudyApp")
		.controller(
				"directoryUserListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,$state,
						$mdUtil, $log, $q, tableTestDataFactory, appEndpointSF) {
							
				$scope.loading = true;
				
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
					var request = gapi.client.directory.users.list({domain:$scope.$parent.currentUserDomain,maxResults:'500'});				
					request.execute(function(resp) {
						if (resp.users.length > 0) {
							$scope.directoryUserList = resp.users; 
							$scope.$parent.directoryUserListBackup = $scope.directoryUserList;	
						} else {
							$log.debug('No users found.');
						}						
						// $scope.loading = false;
						$scope.$apply(function(){
							$scope.loading = false;
						});	
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
				
				if($scope.$parent.directoryUserListBackup === null){
					$scope.getDirectoryUserList();
				}
				else{
					$log.debug('Using Cached List of Dir Users ...');
					$scope.directoryUserList = $scope.$parent.directoryUserListBackup;
					$scope.loading = false;		
				}
			
				});