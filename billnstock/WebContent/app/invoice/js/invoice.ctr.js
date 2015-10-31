app = angular.module("stockApp");

app
		.controller(
				"invoiceCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF) {

					$scope.invoice = {
						id : '',
						invoiceId : 101,
						sr_No : '',
						customerName : '',
						customerAddress : '',
						note : "If you have any query please contact on finance@protostar.co.in"
					}

					$scope.invoiceObj = {
						invoiceId : '',
						customerName : '',
						customerAddress : '',
						invoiceLineItemList : [],
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : ''
					};
					$scope.selected = [];

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
					}

					$scope.getAllCustomers = function() {
						$log.debug("Inside Ctr $scope.getAllCustomers");
						var customerService = appEndpointSF
								.getCustomerService();

						customerService
								.getAllCustomers()
								.then(
										function(custList) {
											$log
													.debug("Inside Ctr getAllCustomers");
											$scope.customersforinvoice = custList;
											$log
													.debug("Inside Ctr $scope.customers:"
															+ angular
																	.toJson($scope.customersforinvoice));
										});
					}

					$scope.customers = [];
					$scope.getAllCustomers();

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService
								.getAllStock()
								.then(
										function(stockList) {
											$log
													.debug("Inside Ctr getAllStock");
											$scope.stockforinvoice = stockList;
											$log
													.debug("Inside Ctr $scope.stockforinvoice:"
															+ angular
																	.toJson($scope.stockforinvoice));
										});
					}

					$scope.stockData = [];
					$scope.getAllStock();

					$scope.getAllTaxes = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService
								.getAllTaxes()
								.then(
										function(taxList) {
											$log
													.debug("Inside Ctr getAllTaxes");
											$scope.taxforinvoice = taxList;
											$log
													.debug("Inside Ctr $scope.taxforinvoice:"
															+ angular
																	.toJson($scope.taxforinvoice));
										});
					}

					$scope.selectedTax = {};
					$scope.taxData = [];
					$scope.getAllTaxes();

					$scope.itemline1Qty = 1;
					$scope.selectedItem1 = {};
					$scope.selectedItem = {};
					$scope.qty = 1;

					$scope.itemline2Qty = 1;
					$scope.selectedItem2 = {};

					$scope.invoiceCustomerList = [],
							$scope.selectedStockItem = {};
					// $scope.customerName = {};

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

						$scope.invoiceObj.taxTotal = (selectedTaxItem.taxPercenatge / 100)
								* ($scope.invoiceObj.subTotal)

						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index, customerName) {
						$log.debug("##Came to CustomerddlChange...");

						var SelectedCust = $scope.invoiceCustomerList[index];
						SelectedCust.customerName = customerName.customerName;
						SelectedCust.customerAddress = customerName.customerAddress;
					};

					$scope.removeItem = function(index) {
						$scope.invoiceObj.invoiceLineItemList.splice(index, 1);
						$scope.calSubTotal();
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

					$scope.checkedOut = false;

					app.directive('nestedReadonly',
							function() {
								return {
									scope : {
										readonly : '=nestedReadonly'
									},
									link : function(scope, el) {
										function toggle(readonly) {
											el.find('input').attr('readonly',
													readonly);
											el.find('textarea').attr(
													'readonly', readonly);
											el.find('select').attr('disabled',
													readonly);
											// ...
										}
										scope.$watch('readonly', function(val) {
											if (angular.isDefined(val)) {
												toggle(val);
											}
										});
									}
								};
							});
				});
