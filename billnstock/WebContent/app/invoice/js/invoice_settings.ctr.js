app = angular.module("stockApp");
app
		.controller(
				"invoiceSettingsCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $mdMedia, $mdDialog, $q,
						objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));


					$scope.settingsObj = {
							noteToCustomer :'',
							modifiedBy :'',
							createdDate : new Date(),
							modifiedDate: new Date(),
							business:''
					}
					
					
					$scope.addInvoiceSettings = function() {
				
							var InvoiceService = appEndpointSF.getInvoiceService();
							$scope.settingsObj.business = $scope.curUser.business;
							$scope.settingsObj.modifiedBy =$scope.curUser.email_id;
							
							InvoiceService.addInvoiceSettings($scope.settingsObj).then(
									function(savedRecoed) {

										$scope.settingsObj = savedRecoed;
										$scope.showSimpleToast();

									});
						
					}
					
					
					$scope.getInvoiceSettingsByBiz = function() {
						
						var invoiceService = appEndpointSF.getInvoiceService();

						invoiceService.getInvoiceSettingsByBiz(
										$scope.curUser.business.id)
								.then(
										function(settingsList) {
											
											$scope.settingsObj1 = settingsList.items;
											$log
													.debug("Inside Ctr $scope.settingsObj:"
															+ $scope.settingsObj.noteToCustomer);
											return $scope.settingsObj;
										});
					}

					
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getInvoiceSettingsByBiz();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					

					$scope.settingsObj = [];
					$scope.selected = [];	
					$scope.waitForServiceLoad();
					
					
					/* Setup menu */
					$scope.toggleRight = buildToggler('right');
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

					$scope.close = function() {
						$mdSidenav('right').close().then(function() {
							$log.debug("close RIGHT is done");
						});
					};

					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Data Saved!').position("top")
								.hideDelay(3000));
					};

				});
