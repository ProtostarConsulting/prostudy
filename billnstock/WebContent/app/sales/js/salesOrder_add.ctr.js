app = angular.module("stockApp");
app
		.controller(
				"salesOrderAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $q, $mdMedia, $mdDialog,
						objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.salesOrder = {
						customer : {},
						customerRefId : '',
						quotationDate : '',
						salesOrderDate : new Date(),
						to : '',
						shipTo : '',
						salesPerson : '',
						shippedVia : '',
						shippingTerms : '',
						deliveryDate : '',
						paymentTerms : '',
						dueDate : '',
						sOLineItemList : [],
						subTotal : 0,
						taxCodeName : '',
						taxPercenatge : '',

						productTaxTotal : 0,
						serviceTaxTotal : 0,
						productTotal : 0,
						serviceTotal : 0,
						productSubTotal : 0,
						serviceSubTotal : 0,
						finalTotal : 0,

						createdDate : new Date(),
						modifiedDate : new Date(),
						modifiedBy : '',
						serviceName : '',
						serviceLineItemList : [],
						business : ""
					};

					$scope.addSalesOrder = function() {
						if ($scope.salesOrder.sOLineItemList.length == 0
								&& $scope.salesOrder.serviceLineItemList.length == 0) {
							console.log("Please select atleast one item");
							$scope.errorMsg = "Please select atleast one item.";
						} else {
							var salesOrderService = appEndpointSF
									.getSalesOrderService();
							$scope.salesOrder.business = $scope.curUser.business;

							salesOrderService.addSalesOrder($scope.salesOrder)
									.then(function(msgBean) {
										$scope.showSimpleToast(msgBean.msg);
									});

							$scope.salesOrder = {};
						}
					}
					$scope.addItem = function() {
						var item = {
							srNo : $scope.salesOrder.sOLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							productSubTotal : ""
						};

						$scope.salesOrder.sOLineItemList.push(item);
					};

					$scope.removeItem = function(index) {
						$scope.salesOrder.sOLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.salesOrder.productSubTotal = 0;

						for (var i = 0; i < $scope.salesOrder.sOLineItemList.length; i++) {
							var line = $scope.salesOrder.sOLineItemList[i];
							$scope.salesOrder.productSubTotal += (line.qty * line.price);
						}

						$scope.salesOrder.productTotal = $scope.salesOrder.productSubTotal + $scope.salesOrder.productTaxTotal;
						$scope.calfinalTotal();

						return $scope.salesOrder.productSubTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calfinalTotal...");

						$scope.salesOrder.finalTotal = parseInt($scope.salesOrder.productSubTotal)
								+ parseFloat($scope.salesOrder.productTaxTotal)
								+ parseFloat($scope.salesOrder.serviceTotal);

						$scope.salesOrder.finalTotal = parseFloat(
								($scope.salesOrder.finalTotal)).toFixed(2);

					}

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.salesOrder.sOLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.productSubTotal = stockItem.productSubTotal;

						$scope.salesOrder.productTotal = $scope.salesOrder.productSubTotal + $scope.salesOrder.productTaxTotal
						
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index, customer) {
						$log.debug("##Came to CustomerddlChange...");
					};

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						$scope.salesOrder.taxCodeName = $scope.salesOrder.selectedTaxItem.taxCodeName;
						$scope.salesOrder.taxPercenatge = $scope.salesOrder.selectedTaxItem.taxPercenatge;

						$scope.salesOrder.productTaxTotal = ($scope.salesOrder.selectedTaxItem.taxPercenatge / 100)
								* ($scope.salesOrder.productSubTotal)

						$scope.salesOrder.productTaxTotal = parseFloat(
								Math
										.round($scope.salesOrder.productTaxTotal * 100) / 100)
								.toFixed(2);
						$scope.calfinalTotal();
					};

					/*
					 * ====================================Services
					 * Provided===================================
					 */
					$scope.addService = function() {
						var service = {
							srNo : $scope.salesOrder.serviceLineItemList.length + 1,
							serviceName : "",
							sQty : 1,
							sPrice : "",
							serviceSubTotal : 0
						};

						$scope.salesOrder.serviceLineItemList.push(service);
					};

					$scope.removeService = function(index) {
						$scope.salesOrder.serviceLineItemList.splice(index, 1);
					};

					$scope.serviceTaxChange = function(index,
							selectedServiceTax, $event) {
						$log.debug("##Came to lineItemTaxChange...");

						$scope.salesOrder.serviceTaxTotal = parseFloat(($scope.salesOrder.selectedServiceTax.taxPercenatge / 100)
								* ($scope.salesOrder.serviceSubTotal));

						$scope.salesOrder.serviceTotal = parseInt($scope.salesOrder.serviceSubTotal)
								+ $scope.salesOrder.serviceTaxTotal;
						
						$scope.calServiceSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calServiceSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.salesOrder.serviceSubTotal = 0;

						for (var i = 0; i < $scope.salesOrder.serviceLineItemList.length; i++) {
							var line = $scope.salesOrder.serviceLineItemList[i];
							$scope.salesOrder.serviceSubTotal += (line.sQty * line.sPrice);

							$log.debug("serviceSubTotal :"
									+ $scope.salesOrder.serviceSubTotal);
						}

						$scope.salesOrder.serviceSubTotal = parseFloat(
								Math
										.round(($scope.salesOrder.serviceSubTotal) * 100) / 100)
								.toFixed(2);

						$scope.salesOrder.serviceTotal = parseFloat($scope.salesOrder.serviceSubTotal)
								+ $scope.salesOrder.serviceTaxTotal;

						$scope.calfinalTotal();

						return $scope.salesOrder.serviceSubTotal;
					}

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
					}

					$scope.getAllStock = function() {
						$log.debug("Inside Ctr $scope.getAllStock");
						var stockService = appEndpointSF.getStockService();

						stockService
								.getAllStock($scope.curUser.business.id)
								.then(
										function(stockList) {
											$log
													.debug("Inside Ctr getAllStock");
											$scope.stockforPO = stockList;
											$log
													.debug("@@@ $scope.stockforPO==="
															+ $scope.stockforPO);
										});
					}

					$scope.getAllTaxes = function() {
						$log.debug("Inside Ctr $scope.getAllTaxes");
						var taxService = appEndpointSF.getTaxService();

						taxService.getTaxesByVisibility(
								$scope.curUser.business.id).then(
								function(taxList) {
									$log.debug("Inside Ctr getAllTaxes");
									$scope.taxforSO = taxList;
									$log.debug("@@@ $scope.taxforSO==="
											+ $scope.taxforSO);
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							loadAllCustomers();
							$scope.getAllTaxes();
							$scope.getAllStock();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.taxData = [];
					$scope.waitForServiceLoad();

					// list of `state` value/display objects
					$scope.customersforinvoice = [];

					$scope.salesOrder.customer = null;
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
					}

					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(cus) {
							return (angular.lowercase(cus.firstName).indexOf(
									lowercaseQuery) === 0);
						};
					}

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
										curBusi : $scope.curUser.business,
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

					function DialogController($scope, $mdDialog, curBusi,
							customer) {

						$scope.addCustomer = function() {
							$scope.customer.business = curBusi;
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
