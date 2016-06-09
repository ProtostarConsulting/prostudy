angular
		.module("prostudyApp")
		.controller(
				"proAdminManageInstituteAuth",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("Inside proAdminManageAuth");

					$scope.authorizationMasterEntity = {
						authorizations : []
					};
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

												var InstituteService = appEndpointSF
														.getInstituteService();

												InstituteService
														.getInstituteById(
																$scope.curUser.instituteID)
														.then(
																function(
																		institute) {
																	$scope.institute = institute;
																	var jsonString = angular.toJson($scope.institute.authorizations);

																	$log.debug("$scope.institute.authorizations:Json: " + jsonString);
																	getCurrentInstituteAuthorizations();
																});

											}
											$scope.mode = "list";
										});

						$log.debug("Called getAllAuthorizations...");

					}

					$scope.institute = null;

					// for testing only. This will be fetched from server
					var selectedInstitute = {
						name : "MBIS",
						'authorizations' : [ {
							'authName' : 'gfe',
							'authorizations' : [ {
								'authName' : 'list'
							}, {
								'authName' : 'edit',
								'authorizations' : ''
							} ]
						}, {
							'authName' : 'exams',
							'authorizations' : ''
						}, {
							'authName' : 'setup',
							'authorizations' : ''
						} ]

					};

					$scope.existingAuthObject = null;
					function getCurrentInstituteAuthorizations() {
						// $scope.authObject =
						// angular.fromJson(selectedInstitute.authorizations);
						$log.debug("jsonauth: "
								+ angular.toJson(selectedInstitute));
						$scope.existingAuthObject = selectedInstitute.authorizations;
						markExistingInstituteAuthorizations($scope.authorizationMasterEntity);

					}

					function markExistingInstituteAuthorizations(auth) {
						if (auth.authName != undefined) {
							auth.selected = containsInAuthTree(auth.authName,
									selectedInstitute);
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

					/*
					 * function getCurrentInstituteAuthorizations() { }
					 */

					$scope.saveAuthorization = function() {

						$log.debug("Called saveAuthorization...");
						var jsonObj = {
							authorizations : []
						};

						angular
								.forEach(
										$scope.authorizationMasterEntity.authorizations,
										function(auth, index) {
											getSelectedJsonAuthorizations(auth,
													jsonObj);
										});

						var jsonString = angular.toJson(jsonObj);

						$log.debug("jsonString: " + jsonString);

						$scope.institute.authorizations = jsonString;
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.updateInstitute($scope.institute)
								.then(function(msgBean) {
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