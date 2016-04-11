app = angular.module("stockApp");
app
		.controller(
				"salesOrderListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, objectFactory, appEndpointSF) {

					$scope.query = {
						order : 'name',
						limit : 5,
						page : 1
					};

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.salesOrder = {};

					$scope.getAllSalesOrder = function() {
						$log.debug("Inside Ctr $scope.getAllSalesOrder");
						var salesOrderService = appEndpointSF
								.getSalesOrderService();

						salesOrderService
								.getAllSalesOrder($scope.curUser.business.id)
								.then(
										function(salesOrderList) {
											$scope.salesOrderList = salesOrderList;
											$log.debug("$scope.salesOrderList"
													+ $scope.salesOrderList);
										});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.getAllSalesOrder();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.salesOrderList = [];
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

					$scope.back = function() {
						window.history.back();
					}

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedCustomerId:",
							$stateParams.selectedCustomerId);

					$scope.customerId = $stateParams.selectedCustomerId;
					$log.debug("$scope.customerId"
							+ angular.toJson($scope.customerId));
				});
