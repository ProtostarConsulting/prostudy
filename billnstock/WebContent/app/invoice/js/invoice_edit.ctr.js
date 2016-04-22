app = angular.module("stockApp");
app
		.controller(
				"invoiceEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $mdMedia, $mdDialog, $q,
						objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.invoiceObjEdit = {
						salesOrderId : null,
						customer : '',
						// invoiceDate : $filter("date")(Date.now(),
						// 'dd-MM-yyyy'),
						invoiceDate : new Date(),
						invoiceDueDate : '',
						invoiceLineItemList : [],
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : '',
						noteToCustomer : '',
						account : "",
						createdDate : new Date(),
						modifiedDate : new Date(),
						modifiedBy : '',

						serviceName : '',
						discount : '',
						discValue : '',
						discAmount : 0,
						pOrder : '',
						serviceSubTotal : 0,
						invoiceServiceLineItemList : [],
						business : ""
					};

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedInvoiceNo:",
							$stateParams.selectedInvoiceNo);

					$scope.selectedBillNo = $stateParams.selectedInvoiceNo;

					$scope.selectedBillNo = $stateParams.selectedInvoiceNo;

					$scope.showBill = function() {
						var invoiceService = appEndpointSF.getInvoiceService();

						invoiceService
								.getinvoiceByID($scope.selectedBillNo)
								.then(
										function(invoiceList) {
											$scope.invoiceObjEdit = invoiceList;
											// $scope.invoiceObjEdit.invoiceLineItemList.qty.push(parseInt($scope.invoiceObjEdit.invoiceLineItemList.qty));
											$scope.invoiceObjEdit.invoiceDueDate = new Date(
													$scope.invoiceObjEdit.invoiceDueDate);
											$scope.invoiceObjEdit.subTotal = $scope.invoiceObjEdit.subTotal;

											var tempArray = $scope.invoiceObjEdit.invoiceLineItemList;

											if (tempArray != undefined) {
												if ($scope.invoiceObjEdit.invoiceLineItemList.length > 0) {
													for (var i = 0; i < $scope.invoiceObjEdit.invoiceLineItemList.length; i++) {
														var a = parseInt($scope.invoiceObjEdit.invoiceLineItemList[i].qty);
														$scope.invoiceObjEdit.invoiceLineItemList[i].qty = a;
													}
												}
											}
										});

					}
					$scope.invoiceObjEdit = [];

					$scope.updateInvoice = function() {
						if ($scope.invoiceObjEdit.invoiceLineItemList.length == 0
								|| $scope.invoiceObjEdit.invoiceLineItemList.itemName == "") {
							console.log("Please select atleast one item");
							$scope.errorMsg = "Please select atleast one item.";
						} else {
							var InvoiceService = appEndpointSF
									.getInvoiceService();
							$scope.invoiceObjEdit.business = $scope.curUser.business;
							$scope.invoiceObjEdit.modifiedBy = $scope.curUser.email_id;

							InvoiceService.addInvoice($scope.invoiceObjEdit).then(
									function(msgBean) {

										$scope.showSimpleToast();

									});
							$scope.invoiceEdit.$setPristine();
							$scope.invoiceEdit.$setValidity();
							$scope.invoiceEdit.$setUntouched();

							$scope.invoiceObjEdit = {};

						}
					}

					invoiceLineItemList = [];
					$scope.addItem = function() {
						var tempArray = $scope.invoiceObjEdit.invoiceLineItemList;
						if (tempArray == undefined) {

							$scope.invoiceObjEdit['invoiceLineItemList'] = invoiceLineItemList;

							var item = {
								srNo : $scope.invoiceObjEdit.invoiceLineItemList.length + 1,
								itemName : "",
								qty : 1,
								price : "",
								subTotal : ""
							};
						} else {
							var item = {
								srNo : $scope.invoiceObjEdit.invoiceLineItemList.length + 1,
								itemName : "",
								qty : 1,
								price : "",
								subTotal : ""
							}
						}
						;

						$scope.invoiceObjEdit.invoiceLineItemList.push(item);
					};

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.invoiceObjEdit.invoiceLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.invoiceObjEdit.subTotal = 0;

						for (var i = 0; i < $scope.invoiceObjEdit.invoiceLineItemList.length; i++) {
							var line = $scope.invoiceObjEdit.invoiceLineItemList[i];
							$scope.invoiceObjEdit.subTotal += (line.qty * line.price);

						}

						$scope.invoiceObjEdit.subTotal = parseFloat(
								Math.round(($scope.invoiceObjEdit.subTotal) * 100) / 100)
								.toFixed(2);

						$scope.calfinalTotal();

						return $scope.invoiceObjEdit.subTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calSubTotal...");

						$scope.tempDiscAmount = 0;
						var finalTotal = 0;
						var disc = 0;
						if ($scope.lineSelectedDiscount == "Fixed") {

							$scope.tempDiscAmount = ($scope.invoiceObjEdit.discAmount)
									.toFixed(2);
							

						} else {
							disc = parseInt($scope.invoiceObjEdit.discAmount);
							finalTotal = parseFloat($scope.invoiceObjEdit.subTotal)
									+ parseFloat($scope.invoiceObjEdit.taxTotal)
									+ parseFloat($scope.invoiceObjEdit.serviceSubTotal);

							$scope.tempDiscAmount = ((disc / 100) * finalTotal)
									.toFixed(2);
							;
							$scope.invoiceObjEdit.discAmount = $scope.tempDiscAmount;

						}
						$scope.invoiceObjEdit.finalTotal = (parseFloat($scope.invoiceObjEdit.subTotal)
								+ parseFloat($scope.invoiceObjEdit.taxTotal) + parseFloat($scope.invoiceObjEdit.serviceSubTotal))
								- parseFloat($scope.tempDiscAmount).toFixed(2);
					}

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						var tempArray = $scope.invoiceObjEdit.selectedTaxItem;
						if (tempArray != undefined) {
							$scope.invoiceObjEdit.taxTotal = parseFloat(($scope.invoiceObjEdit.selectedTaxItem.taxPercenatge / 100)
									* ($scope.invoiceObjEdit.subTotal));													
						
							$scope.calfinalTotal();
						}
						
						$scope.invoiceObjEdit['selectedTaxItem'] = selectedTaxItem;
						
						$scope.invoiceObjEdit.taxTotal = parseFloat(($scope.invoiceObjEdit.selectedTaxItem.taxPercenatge / 100)
								* ($scope.invoiceObjEdit.subTotal));
						$scope.calfinalTotal();
					};

					$scope.removeItem = function(index) {
						$scope.invoiceObjEdit.invoiceLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					/*
					 * ====================================Services
					 * Provided===================================
					 */
					$scope.addService = function() {

						var tempArray = $scope.invoiceObjEdit.invoiceServiceLineItemList;
						if (tempArray == undefined) {

							$scope.invoiceObjEdit['invoiceServiceLineItemList'] = invoiceServiceLineItemList;

							var service = {
								srNo : $scope.invoiceObjEdit.invoiceServiceLineItemList.length + 1,
								serviceName : "",
								sQty : 1,
								sPrice : "",
								serviceSubTotal : 0
							};
						} else {
							var service = {
								srNo : $scope.invoiceObjEdit.invoiceServiceLineItemList.length + 1,
								serviceName : "",
								sQty : 1,
								sPrice : "",
								serviceSubTotal : 0
							};
						}
						$scope.invoiceObjEdit.invoiceServiceLineItemList
								.push(service);
					};

					$scope.removeService = function(index) {
						$scope.invoiceObjEdit.invoiceServiceLineItemList.splice(
								index, 1);
					};

					$scope.calServiceSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.invoiceObjEdit.serviceSubTotal = 0;

						for (var i = 0; i < $scope.invoiceObjEdit.invoiceServiceLineItemList.length; i++) {
							var line = $scope.invoiceObjEdit.invoiceServiceLineItemList[i];
							$scope.invoiceObjEdit.serviceSubTotal += (line.sQty * line.sPrice);

							$log.debug("subTotal :"
									+ $scope.invoiceObjEdit.serviceSubTotal);
						}

						$scope.invoiceObjEdit.subTotal = parseFloat(
								Math.round(($scope.invoiceObjEdit.subTotal) * 100) / 100)
								.toFixed(2);

						$scope.calfinalTotal();

						return $scope.invoiceObjEdit.subTotal;
					}

					$scope.discountType = [ "%", "Fixed" ];
					$scope.lineItemDiscountChange = function(index,
							selectedDiscount) {
						$log.debug("##Came to lineItemStockChange...");
						$scope.lineSelectedDiscount = selectedDiscount;

						// $scope.calSubTotal();
						// $scope.calfinalTotal();
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
								'Customer Data Saved!').position("top")
								.hideDelay(3000));
					};

					$scope.showSimpleToastError = function() {
						$mdToast.show($mdToast.simple().content(
								'Stock not sufficient!').position("right")
								.hideDelay(10000));
					};

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService.getAllStock($scope.curUser.business.id)
								.then(function(stockList) {
									$log.debug("Inside Ctr getAllStock");
									$scope.stockforinvoice = stockList;
								});
					}

					$scope.checkStock = function(item, $event) {
						for (var i = 0; i <= $scope.stockforinvoice.length; i++) {
							if ($scope.stockforinvoice[i].itemName == item.itemName) {
								$scope.qtyErrorMsg = "";
								if ($scope.stockforinvoice[i].qty < item.qty) {
									$scope.qtyErrorMsg = "Quantity entered is not available in stock";
									// $scope.showSimpleToastError();
									$scope.dialogBox();
								}
							}
						}
					}

					$scope.dialogBox = function(ev) {
						$mdDialog
								.show($mdDialog
										.alert()
										.targetEvent(ev)
										.clickOutsideToClose(true)
										.parent('body')
										.title('Error')
										.textContent(
												'Quantity entered is not available in stock!')
										.ok('OK'));
						ev = null;
					};

					$scope.getTaxesByVisibility = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService.getTaxesByVisibility(
								$scope.curUser.business.id).then(
								function(taxList) {
									$log.debug("Inside Ctr getAllTaxes");
									$scope.taxforinvoice = taxList;
								});
					}
					$scope.taxData = [];

					$scope.getAllSalesOrder = function() {
						$log.debug("Inside Ctr $scope.getAllSalesOrder");
						var salesService = appEndpointSF.getSalesOrderService();

						salesService
								.getAllSalesOrder($scope.curUser.business.id)
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

					$scope.SOforinvoice = [];

					$scope.getAllAccountsByBusiness = function() {
						var accountService = appEndpointSF.getAccountService();

						accountService
								.getAllAccountsByBusiness(
										$scope.curUser.business.id)
								.then(
										function(accountList) {
											$log
													.debug("Inside Ctr getAllAccountsByBusiness");
											$scope.accountforinvoice = accountList;
											$log
													.debug("Inside Ctr $scope.accounts:"
															+ angular
																	.toJson($scope.account));
										});
					}
					$scope.accountforinvoice = [];

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

					// FOR CUSTOMER

					$scope.invoiceObjEdit.customer = null;
					$scope.searchTextInput = null;

					$scope.querySearch = function(query) {
						var results = query ? $scope.customersforinvoice
								.filter(createFilterFor(query))
								: $scope.customersforinvoice;
						var deferred = $q.defer();
						$timeout(function() {
							deferred.resolve(results);
						}, Math.random() * 1000, false);
						return deferred.promise;
					}
					/**
					 * Build `states` list of key/value pairs
					 */
					function loadAllCustomers() {

						var customerService = appEndpointSF
								.getCustomerService();
						customerService
								.getAllCustomersByBusiness(
										$scope.curUser.business.id)
								.then(
										function(custList) {
											$scope.customersforinvoice = custList.items;
										});
						$scope.customersforinvoice = [];
					}
					/**
					 * Create filter function for a query string
					 */
					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(cus) {
							return (angular.lowercase(cus.firstName).indexOf(
									lowercaseQuery) === 0);
						};
					}

					// FOR STOCK

					/*
					 * // $scope.invoiceObjEdit.customer = null;
					 * $scope.searchTextInput = null;
					 * 
					 * $scope.querySearch = function(query) { var results =
					 * query ? $scope.stockforinvoice
					 * .filter(createFilterFor(query)) : $scope.stockforinvoice;
					 * var deferred = $q.defer(); $timeout(function() {
					 * deferred.resolve(results); }, Math.random() * 1000,
					 * false); return deferred.promise; }
					 *//**
						 * Build `states` list of key/value pairs
						 */
					/*
					 * function loadAllStock() {
					 * 
					 * var stockService = appEndpointSF.getStockService();
					 * 
					 * stockService.getAllStock($scope.curUser.business.id)
					 * .then(function(stockList) {
					 * 
					 * $scope.stockforinvoice = stockList; });
					 * $scope.stockforinvoice = []; }
					 *//**
						 * Create filter function for a query string
						 */
					/*
					 * function createFilterFor(query) { var lowercaseQuery =
					 * angular.lowercase(query); return function filterFn(stk) {
					 * return (angular.lowercase(stk.itemName).indexOf(
					 * lowercaseQuery) === 0); }; }
					 * 
					 */
					/*
					 * $scope.getInvoiceSettingsByBiz = function() {
					 * 
					 * var invoiceService = appEndpointSF.getInvoiceService();
					 * 
					 * invoiceService.getInvoiceSettingsByBiz(
					 * $scope.curUser.business.id) .then( function(settingsList) {
					 * 
					 * $scope.invoiceObjEdit = settingsList; $log .debug("Inside
					 * Ctr $scope.settingsList:" + $scope.invoiceObjEdit); //
					 * return $scope.settingsObj; }); }
					 */
					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							loadAllCustomers();
							// loadAllStock();
							$scope.getAllStock();
							$scope.getAllSalesOrder();
							$scope.getTaxesByVisibility();
							$scope.getAllAccountsByBusiness();
							// $scope.getInvoiceSettingsByBiz();
							$scope.showBill();

						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.addCustomer = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogController,
									templateUrl : '/app/crm/customer_add.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals : {
										curUser : $scope.curUser,
										customer : $scope.customer
									}
								})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});

					};

					function DialogController($scope, $mdDialog, curUser,
							customer) {

						$scope.addCustomer = function() {
							$scope.customer.business = curUser.business;
							$scope.customer.createdDate = new Date();
							$scope.customer.modifiedBy = curUser.email_id;

							var customerService = appEndpointSF
									.getCustomerService();

							customerService.addCustomer($scope.customer).then(
									function(msgBean) {

									});
							$scope.hide();
						}

						$scope.hide = function() {
							$mdDialog.hide();
						};
					}

				});
