angular
		.module("prostudyApp")
		.controller(
				"proAdminManageAuth",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, objectFactory, appEndpointSF) {

					$scope.mode = "list";
					
					$scope.selectedAuthStack=[];
					$scope.selectedAuth = null;
					// $scope.mode = "add";
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("Inside proAdminManageAuth");

					var authService = appEndpointSF.getAuthorizationService();
					$scope.authorizationMasterEntity = {
						authorizations : []
					};
					function getAllAuthorizations() {

						authService
								.getAuthorizationMasterEntity()
								.then(
										function(result) {
											$log.debug("result:" + result);
											if (result
													&& result.authorizations != undefined) {
												$scope.authorizationMasterEntity.authorizations = result.authorizations;
												//initially selected auth is master list
												$scope.selectedAuth = $scope.authorizationMasterEntity;
												$scope.selectedAuthStack.push($scope.authorizationMasterEntity);
											}
											$scope.mode = "list";
										});

						$log.debug("Called getAllAuthorizations...");

					}

					$scope.saveAuthorization = function() {
						authService.saveAuthorizationMasterEntity(
								$scope.authorizationMasterEntity).then(
								function(result) {
									$log.debug("result:" + result);
									$scope.showUpdateToast();
									$scope.mode = "list";
								});
						$log.debug("Called saveAuthorization...");

					}
					
					$scope.editAuthorization = function() {						
						$log.debug("Called editAuthorization...");
						$scope.selectedAuth = $scope.selected[0];
						$scope.selectedAuthStack.push($scope.selected[0]);
					}
					
					$scope.showAddAuthorization = function() {						
						$scope.mode = "add";						
					}
					
					$scope.addAuthorization = function() {						
						//Save newly added auth at current auth level and show msg.
						$scope.selectedAuth.authorizations.push($scope.tempAuth);
						$scope.saveAuthorization();						
					}

					

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							getAllAuthorizations();

						} else {
							$log
									.debug("proAdminManageAuth: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();

					$scope.tempAuth = {
						id : '',
						authName : '',
						authDisplayName : '',
						uiStateName : '',
						orderNumber : ''
					};

					$scope.selected = []
					$scope.query = {
						order : 'id',
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

					$scope.backButton = function() {						
						$scope.selectedAuthStack.pop();
						if($scope.selectedAuthStack.length>1){
							$scope.selectedAuth = $scope.selectedAuthStack[$scope.selectedAuthStack.length-1];
						}else{
							$scope.selectedAuth = $scope.authorizationMasterEntity;
						}
						
						$scope.mode = "list";
					}

				});