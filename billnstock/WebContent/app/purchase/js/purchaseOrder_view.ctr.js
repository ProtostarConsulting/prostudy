app = angular.module("stockApp");

app
		.controller(
				"purchaseOrderViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, objectFactory, appEndpointSF) {

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedPONo:",
							$stateParams.selectedPONo);

					$scope.purchaseOrderNo = $stateParams.selectedPONo;

					$scope.getPOByID = function() {
						var purchaseService = appEndpointSF
								.getPurchaseOrderService();

						purchaseService
								.getPOByID($scope.purchaseOrderNo)
								.then(
										function(pODetails) {
											$scope.pODetail = pODetails;

											$scope.pODetail.finalTotal = Math
													.round($scope.pODetail.finalTotal);
											$scope.finalTotalInWord = NumToWord($scope.pODetail.finalTotal);

											$log
													.debug("getPOByID at controller===="
															+ angular
																	.toJson($scope.pODetail));
										});

					}
					$scope.pODetail = [];

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							if ($scope.purchaseOrderNo != undefined) {
								$scope.getPOByID();
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

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
								'Purchase Order Saved!').position("top")
								.hideDelay(3000));
					};

					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/css/header.css"" rel="stylesheet" type="text/css">')
					$scope.printDiv = function(divId) {
						// window.frames["print_frame"].document.body.innerHTML
						// = printDivCSS
						// + document.getElementById(divId).innerHTML;
						window.frames["print_frame"].document.body.innerHTML = document
								.getElementById(divId).innerHTML;
						window.frames["print_frame"].window.focus();
						window.frames["print_frame"].window.print();
					}

					$scope.back = function() {
						window.history.back();
					}
				});
