app = angular.module("stockApp");
app
		.controller(
				"invoiceViewCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, objectFactory, appEndpointSF) {

					$scope.invoiceObj = {

						invoiceId : '',
						purchaseOrderNo : '',
						salesOrderId : '',
						customer : '',
						customerAddress : '',
						invoiceDate : $filter("date")(Date.now(), 'dd-MM-yyyy'),
						invoiceLineItemList : [],
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : ''
					};
					$scope.selected = [];

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedInvoiceNo:",
							$stateParams.selectedInvoiceNo);

					$scope.selectedBillNo = $stateParams.selectedInvoiceNo;

					$scope.showBill = function() {
						var invoiceService = appEndpointSF.getInvoiceService();

						invoiceService
								.getinvoiceByID($scope.selectedBillNo)
								.then(
										function(invoiceList) {
											$scope.invoiceDetail = invoiceList;
											$log
													.debug("$scope.showBill:invoiceDetail ===="
															+ angular
																	.toJson($scope.invoiceDetail));
										});

					}
					$scope.invoiceDetail = [];
					$scope.showBill();
/*
					$scope.addInvoice = function() {
						$log.debug("No1");
						var InvoiceService = appEndpointSF.getInvoiceService();

						InvoiceService.addInvoice($scope.invoiceObj).then(
								function(msgBean) {
									$log.debug("No6");
									$log.debug("Inside Ctr addInvoice");
									$log.debug("msgBean.msg:" + msgBean.msg);
									$scope.showSimpleToast();

								});
						$log.debug("No4");

						$scope.invoiceObj = {};
					}

					$scope.getAllInvoice = function() {
						$log.debug("Inside Ctr $scope.getAllInvoice");
						var invoiceService = appEndpointSF.getInvoiceService();

						invoiceService
								.getAllInvoice()
								.then(
										function(invoiceList) {
											$log
													.debug("Inside Ctr getAllInvoice");
											$scope.invoiceData = invoiceList;

											$scope.tempInvoiceId = $scope.invoiceData.length + 1;
											$scope.invoiceObj.invoiceId = $scope.tempInvoiceId;
											$log
													.debug("Inside Ctr $scope.invoiceData:"
															+ angular
																	.toJson($scope.invoiceData));
										});
					}

					$scope.invoiceData = [];
					$scope.tempInvoiceId;
					$scope.getAllInvoice();

					$scope.addItem = function() {
						var item = {
							srNo : $scope.invoiceObj.invoiceLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							subTotal : ""
						};

						$scope.invoiceObj.invoiceLineItemList.push(item);
					};

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.invoiceObj.invoiceLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.invoiceObj.subTotal = 0;

						for (var i = 0; i < $scope.invoiceObj.invoiceLineItemList.length; i++) {
							var line = $scope.invoiceObj.invoiceLineItemList[i];
							$scope.invoiceObj.subTotal += (line.qty * line.price);

							$log.debug("subTotal :"
									+ $scope.invoiceObj.subTotal);
						}
						$log.debug("$scope.invoiceObj 1 :"
								+ $scope.invoiceObj.subTotal);
						return $scope.invoiceObj.subTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calSubTotal...");

						$scope.invoiceObj.finalTotal = $scope.invoiceObj.subTotal
								+ $scope.invoiceObj.taxTotal;
					}

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						$scope.invoiceObj.taxTotal = ($scope.invoiceObj.selectedTaxItem.taxPercenatge / 100)
								* ($scope.invoiceObj.subTotal)

						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index,
							selectedcustomerName) {
						$log.debug("##Came to CustomerddlChange...");

					};

					$scope.SOddlChange = function(index, selectedSOId) {
						$log.debug("##Came to SOddlChange...");

					};

					$scope.POddlChange = function(index, selectedPOId) {
						$log.debug("##Came to POddlChange...");

					};

					$scope.removeItem = function(index) {
						$scope.invoiceObj.invoiceLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};
*/
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
/*
					$scope.getAllCustomers = function() {
						$log.debug("Inside Ctr $scope.getAllCustomers");
						var customerService = appEndpointSF
								.getCustomerService();

						customerService.getAllCustomers().then(
								function(custList) {
									$log.debug("Inside Ctr getAllCustomers");
									$scope.customersforinvoice = custList;
								});
					}

					// $scope.customers = [];
					$scope.getAllCustomers();

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService.getAllStock().then(function(stockList) {
							$log.debug("Inside Ctr getAllStock");
							$scope.stockforinvoice = stockList;
						});
					}

					// $scope.stockData = [];
					$scope.getAllStock();

					$scope.getAllTaxes = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService.getAllTaxes().then(function(taxList) {
							$log.debug("Inside Ctr getAllTaxes");
							$scope.taxforinvoice = taxList;
						});
					}
					// $scope.taxData = [];
					$scope.getAllTaxes();
*/
/*					$scope.getAllSalesOrder = function() {
						$log.debug("Inside Ctr $scope.getAllSalesOrder");
						var salesService = appEndpointSF.getSalesService();

						salesService
								.getAllSalesOrder()
								.then(
										function(salesOrderList) {
											$log
													.debug("Inside Ctr getAllSalesOrder");
											$scope.SOforinvoice = salesOrderList;
											$log
													.debug("@@@@@@@getAllSalesOrder"
															+ angular
																	.toJson($scope.SOforinvoice));

										});
					}

					// $scope.SOforinvoice = [];
					$scope.getAllSalesOrder();

					$scope.getAllPurchaseOrder = function() {
						$log.debug("Inside Ctr $scope.getAllPurchaseOrder");
						var purchaseService = appEndpointSF
								.getPurchaseService();

						purchaseService
								.getAllPurchaseOrder()
								.then(
										function(purchaseOrderList) {
											$log
													.debug("Inside Ctr getAllPurchaseOrder");
											$scope.POforinvoice = purchaseOrderList;
											$log
													.debug("@@@@@@@getAllPurchaseOrder"
															+ angular
																	.toJson($scope.POforinvoice));
										});
					}

					// $scope.purchaseOrderList = [];
					$scope.getAllPurchaseOrder();
*/
					var printDivCSS = new String(
							'<link href="/lib/base/css/angular-material.min.css"" rel="stylesheet" type="text/css">'
									+ '<link href="/lib/base/css/bootstrap.min.css"" rel="stylesheet" type="text/css">')
					$scope.printDiv = function(divId) {
						// window.frames["print_frame"].document.body.innerHTML
						// = printDivCSS
						// + document.getElementById(divId).innerHTML;
						window.frames["print_frame"].document.body.innerHTML = document
								.getElementById(divId).innerHTML;
						window.frames["print_frame"].window.focus();
						window.frames["print_frame"].window.print();
					}
				});
