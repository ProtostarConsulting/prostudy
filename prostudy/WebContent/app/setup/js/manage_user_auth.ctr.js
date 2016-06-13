angular
		.module("prostudyApp")
		.controller(
				"manageUserAuthCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $stateParams, objectFactory,
						appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("Inside manageUserAuthCtr");

					$scope.selectedUserEmailId = $stateParams.selectedUserEmailId;

					if (!$scope.selectedUserEmailId) {
						return;
					}

					$scope.authorizationMasterEntity = {
						authorizations : []
					};
					$scope.instituteAuthMasterEntity = {
						authorizations : []
					};

					$scope.institute = $scope.curUser.instituteObj;
					$scope.existingInstituteAuthObject = angular
							.fromJson($scope.curUser.instituteObj.authorizations);
					$log
					.debug("$scope.curUser.instituteObj.authorizations: "
							+ $scope.curUser.instituteObj.authorizations);
					
					$scope.selectedUser = null
					$scope.userAuthObject = null;

					function getAuthorizationMasterEntity() {
						var authService = appEndpointSF
								.getAuthorizationService();
						authService
								.getAuthorizationMasterEntity()
								.then(
										function(result) {
											$log.debug("result:" + result);
											if (result
													&& result.authorizations != undefined) {
												$scope.authorizationMasterEntity.authorizations = result.authorizations;

												collectInstituteAuthMasterEntity(
														$scope.authorizationMasterEntity,
														$scope.instituteAuthMasterEntity);

												var UserService = appEndpointSF
														.getUserService();
												UserService
														.getUserByEmailID(
																$scope.selectedUserEmailId)
														.then(
																function(user) {
																	$scope.selectedUser = user;
																	$log
																			.debug("user.authorizations: "
																					+ user.authorizations);
																	var jsonUserAuthObject = angular
																			.fromJson(user.authorizations);
																	$scope.userAuthObject = jsonUserAuthObject;
																	if (user.authorizations) {
																		markExistingInstituteAuthorizations($scope.instituteAuthMasterEntity);
																	}
																});

											}
											$scope.mode = "list";
										});

						$log.debug("End of getAuthorizationMasterEntity...");

					}

					function collectInstituteAuthMasterEntity(masterAuth,
							instituteAuthMaster) {
						if (masterAuth.authName != undefined) {
							if (containsInAuthTree(masterAuth.authName,
									$scope.existingInstituteAuthObject)) {
								var tempAuth = getAuthCopy(masterAuth);
								instituteAuthMaster.push(tempAuth);
								if (masterAuth.authorizations) {									
									angular.forEach(masterAuth.authorizations,
											function(auth, index) {
												collectInstituteAuthMasterEntity(auth,
														tempAuth.authorizations);
											});
								}
							}
							return;
						}
						
						if (masterAuth.authorizations) {									
							angular.forEach(masterAuth.authorizations,
									function(auth, index) {
										collectInstituteAuthMasterEntity(auth,
												instituteAuthMaster.authorizations);
									});
						}
						
					}
					
					function getAuthCopy(auth){
						return {
							authName : auth.authName,
							authDisplayName : auth.authDisplayName,
							uiStateName : auth.uiStateName,
							orderNumber : auth.orderNumber,
							authorizations:[]
						};
					}

					function markExistingInstituteAuthorizations(auth) {
						if (auth.authName != undefined) {
							auth.selected = containsInAuthTree(auth.authName,
									$scope.userAuthObject);
						}
						if (auth.authorizations) {
							angular.forEach(auth.authorizations, function(auth,
									index) {
								markExistingInstituteAuthorizations(auth)
							});
						}

					}

					function containsInAuthTree(authName, authHierarchy) {
						if (authHierarchy.authName != undefined
								&& authName == authHierarchy.authName) {
							return true;
						} else {
							if (authHierarchy.authorizations) {
								for (var i = 0; i < authHierarchy.authorizations.length; i++) {
									var found = containsInAuthTree(authName,
											authHierarchy.authorizations[i]);
									if (found)
										return true;
								}
							} else {
								return false;
							}
						}
					}

					$scope.saveAuthorization = function() {

						$log.debug("Called saveAuthorization...");
						var jsonObj = {
							authorizations : []
						};

						angular
								.forEach(
										$scope.instituteAuthMasterEntity.authorizations,
										function(auth, index) {
											getSelectedJsonAuthorizations(auth,
													jsonObj);
										});

						var toSaveJsonString = angular.toJson(jsonObj);

						$log.debug("toSaveJsonString: " + toSaveJsonString);

						$scope.selectedUser.authorizations = toSaveJsonString;

						var UserService = appEndpointSF.getUserService();
						UserService.updateUser($scope.selectedUser).then(
								function(user) {
									$scope.showUpdateToast();
								});

					}

					function getSelectedJsonAuthorizations(authHirarachy,
							jsonObj) {
						var currentAuth = null;
						if (authHirarachy.selected) {
							currentAuth = {
								'authName' : authHirarachy.authName,
								'authorizations' : []
							}
							jsonObj.authorizations.push(currentAuth);
						}

						if (currentAuth != null && authHirarachy.authorizations) {
							for (var i = 0; i < authHirarachy.authorizations.length; i++) {
								getSelectedJsonAuthorizations(
										authHirarachy.authorizations[i],
										currentAuth);
							}
						}

						return jsonObj;
					}

					$scope.cancelButton = function() {
						$state.go("^", {});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							getAuthorizationMasterEntity();

						} else {
							$log
									.debug("proAdminManageInstituteAuth: Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();

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

				});