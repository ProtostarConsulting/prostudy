app = angular.module("stockApp");

app
		.controller(
				"purchaseOrderAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.purchaseOrderObj = {

						// purchaseOrderNo: '',
						customer : '',
						to : '',
						shipTo : '',
						poDate : '',
						requisitioner : '',
						shippedVia : '',
						fOBPoint : '',
						terms : '',
						pOLineItemList : [],
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : '',
						loggedInUser : ""
					};

					$scope.addPurchaseOrder = function() {
						var purchaseService = appEndpointSF
								.getPurchaseOrderService();
						$scope.purchaseOrderObj.loggedInUser = $scope.curUser;

						purchaseService.addPurchaseOrder(
								$scope.purchaseOrderObj).then(
								function(msgBean) {

									$log.debug("Inside Ctr addPurchaseOrder");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast();
//									$scope.getAllPurchaseOrder();
								});

						$scope.purchaseOrderObj = {};
					}

/*					$scope.getAllPurchaseOrder = function() {
						$log.debug("Inside Ctr $scope.getAllPurchaseOrder");
						var purchaseService = appEndpointSF
								.getPurchaseOrderService();

						purchaseService
								.getAllPurchaseOrder()
								.then(
										function(purchaseOrderList) {
											$log
													.debug("Inside Ctr getAllPurchaseOrder");
											$scope.purchaseOrderList = purchaseOrderList;
											$log
													.debug("@@@@@@@getAllPurchaseOrder"
															+ angular
																	.toJson($scope.purchaseOrderList));
											$scope.temppurchaseOrder = $scope.purchaseOrderList.length + 1;
											$scope.purchaseOrderObj.purchaseOrderNo = $scope.temppurchaseOrder;
										});
					}

					$scope.purchaseOrderList = [];
					$scope.temppurchaseOrder;
					$scope.getAllPurchaseOrder();
*/				

					$scope.addItem = function() {
						var item = {
							srNo : $scope.purchaseOrderObj.pOLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							subTotal : ""
						};

						$scope.purchaseOrderObj.pOLineItemList.push(item);
					};

					$scope.removeItem = function(index) {
						$scope.purchaseOrderObj.pOLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.purchaseOrderObj.subTotal = 0;

						for (var i = 0; i < $scope.purchaseOrderObj.pOLineItemList.length; i++) {
							var line = $scope.purchaseOrderObj.pOLineItemList[i];
							$scope.purchaseOrderObj.subTotal += (line.qty * line.price);

							$log.debug("subTotal :"
									+ $scope.purchaseOrderObj.subTotal);
						}
						$log.debug("$scope.purchaseOrderObj 1 :"
								+ $scope.purchaseOrderObj.subTotal);
						return $scope.purchaseOrderObj.subTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calfinalTotal...");

						$scope.purchaseOrderObj.finalTotal = $scope.purchaseOrderObj.subTotal
								+ $scope.purchaseOrderObj.taxTotal;
					}

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.purchaseOrderObj.pOLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						// $scope.purchaseOrderObj.itemName
						// =$scope.purchaseOrderObj.stockItem.itemName;
						// $scope.purchaseOrderObj.taxPercenatge
						// =$scope.purchaseOrderObj.stockItem.taxPercenatge;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index, customer) {
						$log.debug("##Came to CustomerddlChange...");
						// $scope.purchaseOrderObj.customer
						// =$scope.purchaseOrderObj.customer;
					};

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						// $scope.purchaseOrderObj.taxCodeName
						// =$scope.purchaseOrderObj.selectedTaxItem.taxCodeName;
						// $scope.purchaseOrderObj.taxPercenatge
						// =$scope.purchaseOrderObj.selectedTaxItem.taxPercenatge;

						$scope.purchaseOrderObj.taxTotal = ($scope.purchaseOrderObj.selectedTaxItem.taxPercenatge / 100)
								* ($scope.purchaseOrderObj.subTotal)

						$scope.calfinalTotal();
					};

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

					$scope.getAllCustomersByCurrUser = function() {
						$log.debug("Inside Ctr $scope.getAllCustomers");
						var customerService = appEndpointSF.getCustomerService();

						customerService.getAllCustomersByCurrUser($scope.curUser.businessAccount.id).then(
								function(custList) {
									$log.debug("Inside Ctr getAllCustomers");
									$scope.customersforinvoice = custList;
									$log.debug("Inside Ctr $scope.customers:"
											+ angular.toJson($scope.customersforinvoice));
								});
					}

					$scope.customersforinvoice = [];
					$scope.getAllCustomersByCurrUser();

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService.getAllStock($scope.curUser.businessAccount.id).then(
								function(stockList) {
									$log.debug("Inside Ctr getAllStock");
									$scope.stockforPO = stockList;
									$log.debug("@@@ $scope.stockforPO==="
											+ $scope.stockforPO);
								});
					}

					$scope.stockforPO = [];
					$scope.getAllStock();

					$scope.getTaxesByVisibility = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService.getTaxesByVisibility($scope.curUser.businessAccount.id).then(
								function(taxList) {
									$log.debug("Inside Ctr getAllTaxes");
									$scope.taxforPO = taxList;
									$log.debug("@@@ $scope.taxforPO==="
											+ $scope.taxforPO);
								});
					}
					$scope.taxforPO = [];
					$scope.getTaxesByVisibility();
				});
