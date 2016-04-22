app = angular.module("stockApp");
app
		.controller(
				"salesOrderEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $q, $mdMedia, $mdDialog,
						objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.salesOrderObjEdit = {
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
						subTotal : '',
						taxCodeName : '',
						taxPercenatge : '',
						taxTotal : 0,
						finalTotal : 0,
						createdDate : new Date(),
						modifiedDate : new Date(),
						modifiedBy : '',
						
						serviceName : '',
						discount : '',
						discValue : '',
						discAmount : '0',
						pOrder : '',
						serviceSubTotal : 0,
						serviceLineItemList : [],
						business : ""
					};

					
					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedSOId:",
							$stateParams.selectedSOId);

					$scope.selectedSalesOrderNo = $stateParams.selectedSOId;

					$scope.getSOByID = function() {
						var salesService = appEndpointSF.getSalesOrderService();

						salesService
								.getSOByID($scope.selectedSalesOrderNo)
								.then(
										function(sOList) {
											$scope.salesOrderObjEdit = sOList;

					/*						$scope.salesOrderObjEdit.finalTotal = Math
													.round($scope.sODetail.finalTotal);
					*/						$scope.salesOrderObjEdit.dueDate = new Date($scope.salesOrderObjEdit.dueDate)
											$scope.salesOrderObjEdit.quotationDate = new Date($scope.salesOrderObjEdit.quotationDate)
											$scope.salesOrderObjEdit.deliveryDate = new Date($scope.salesOrderObjEdit.deliveryDate)
												
											
											var tempArray = $scope.salesOrderObjEdit.sOLineItemList;

											if (tempArray != undefined) {
												if ($scope.salesOrderObjEdit.sOLineItemList.length > 0) {
													for (var i = 0; i < $scope.salesOrderObjEdit.sOLineItemList.length; i++) {
														var a = parseInt($scope.salesOrderObjEdit.sOLineItemList[i].qty);
														$scope.salesOrderObjEdit.sOLineItemList[i].qty = a;
													}
												}
											}
										});

					}
					$scope.salesOrderObjEdit = [];
					
					$scope.updateSalesOrder = function() {
						if ($scope.salesOrderObjEdit.sOLineItemList.length == 0
								|| $scope.salesOrderObjEdit.sOLineItemList.itemName == "") {
							console.log("Please select atleast one item");
							$scope.errorMsg = "Please select atleast one item.";
						} else {
							var salesOrderService = appEndpointSF
									.getSalesOrderService();
							$scope.salesOrderObjEdit.business = $scope.curUser.business;

							salesOrderService.addSalesOrder($scope.salesOrderObjEdit)
									.then(function(msgBean) {
										$scope.showSimpleToast(msgBean.msg);
									});

							$scope.salesOrderObjEdit = {};
						}
					}
					$scope.addItem = function() {
						var item = {
							srNo : $scope.salesOrderObjEdit.sOLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							subTotal : ""
						};

						$scope.salesOrderObjEdit.sOLineItemList.push(item);
					};

					$scope.removeItem = function(index) {
						$scope.salesOrderObjEdit.sOLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.salesOrderObjEdit.subTotal = 0;

						for (var i = 0; i < $scope.salesOrderObjEdit.sOLineItemList.length; i++) {
							var line = $scope.salesOrderObjEdit.sOLineItemList[i];
							$scope.salesOrderObjEdit.subTotal += (line.qty * line.price);
						}

						$scope.salesOrderObjEdit.subTotal = parseFloat(
								Math.round(($scope.salesOrderObjEdit.subTotal) * 100) / 100)
								.toFixed(2);

						$scope.calfinalTotal();
						
						return $scope.salesOrderObjEdit.subTotal;
						
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calfinalTotal...");

						$scope.salesOrderObjEdit.finalTotal = parseFloat($scope.salesOrderObjEdit.subTotal)
								+ parseFloat($scope.salesOrderObjEdit.taxTotal) + $scope.salesOrderObjEdit.serviceSubTotal;

						$scope.salesOrderObjEdit.finalTotal = parseFloat(
								($scope.salesOrderObjEdit.finalTotal)).toFixed(2);

					}

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.salesOrderObjEdit.sOLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index, customer) {
						$log.debug("##Came to CustomerddlChange...");
					};

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						$scope.salesOrderObjEdit.taxCodeName = $scope.salesOrderObjEdit.selectedTaxItem.taxCodeName;
						$scope.salesOrderObjEdit.taxPercenatge = $scope.salesOrderObjEdit.selectedTaxItem.taxPercenatge;

						$scope.salesOrderObjEdit.taxTotal = ($scope.salesOrderObjEdit.selectedTaxItem.taxPercenatge / 100)
								* ($scope.salesOrderObjEdit.subTotal)

						$scope.salesOrderObjEdit.taxTotal = parseFloat(
								Math.round($scope.salesOrderObjEdit.taxTotal * 100) / 100)
								.toFixed(2);
						$scope.calfinalTotal();
					};

					
					/*
					 * ====================================Services
					 * Provided===================================
					 */
					$scope.addService = function() {
						var service = {
							srNo : $scope.salesOrderObjEdit.serviceLineItemList.length + 1,
							serviceName : "",
							sQty : 1,
							sPrice : "",
							serviceSubTotal : 0
						};

						$scope.salesOrderObjEdit.serviceLineItemList
								.push(service);
					};

					$scope.removeService = function(index) {
						$scope.salesOrderObjEdit.serviceLineItemList.splice(
								index, 1);
					};

					$scope.calServiceSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.salesOrderObjEdit.serviceSubTotal = 0;

						for (var i = 0; i < $scope.salesOrderObjEdit.serviceLineItemList.length; i++) {
							var line = $scope.salesOrderObjEdit.serviceLineItemList[i];
							$scope.salesOrderObjEdit.serviceSubTotal += (line.sQty * line.sPrice);

							$log.debug("subTotal :"
									+ $scope.salesOrderObjEdit.serviceSubTotal);
						}

						$scope.salesOrderObjEdit.subTotal = parseFloat(
								Math.round(($scope.salesOrderObjEdit.subTotal) * 100) / 100)
								.toFixed(2);

						$scope.calfinalTotal();

						return $scope.salesOrderObjEdit.subTotal;
					}

					$scope.discountType = [ "%", "Fixed" ];
					$scope.lineItemDiscountChange = function(index,
							selectedDiscount) {
						$log.debug("##Came to lineItemStockChange...");
						$scope.lineSelectedDiscount = selectedDiscount;
						$scope.salesOrderObjEdit.discount = selectedDiscount;
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
									$scope.taxforPO = taxList;
									$log.debug("@@@ $scope.taxforPO==="
											+ $scope.taxforPO);
								});
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							loadAllCustomers();
							$scope.getAllTaxes();
							$scope.getAllStock();
							$scope.getSOByID();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.taxData = [];
					$scope.waitForServiceLoad();

					// list of `state` value/display objects
					$scope.customersforinvoice = [];

					$scope.salesOrderObjEdit.customer = null;
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
							var customerService = appEndpointSF.getCustomerService();

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
