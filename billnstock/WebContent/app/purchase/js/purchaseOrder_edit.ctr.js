app = angular.module("stockApp");

app
		.controller(
				"purchaseOrderEditCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $q, $mdMedia, $mdDialog,
						objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.pOObjEdit = {

						// purchaseOrderNo: '',
						supplier : '',
						to : '',
						shipTo : '',
						poDate : new Date(),
						poDueDate : "",
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
						business : ""
					};

					$log.debug("$stateParams:", $stateParams);
					$log.debug("$stateParams.selectedInvoiceNo:",
							$stateParams.selectedPONo);

					$scope.selectedPONo = $stateParams.selectedPONo;

					$scope.showPO = function() {
						var purchaseService = appEndpointSF
								.getPurchaseOrderService();

						purchaseService
								.getPOByID($scope.selectedPONo)
								.then(
										function(pOList) {
											$scope.pOObjEdit = pOList;
											// $scope.pOObjEdit.pOLineItemList.qty.push(parseInt($scope.pOObjEdit.pOLineItemList.qty));
											$scope.pOObjEdit.poDueDate = new Date(
													$scope.pOObjEdit.poDueDate);
											$scope.pOObjEdit.subTotal = $scope.pOObjEdit.subTotal;

											var tempArray = $scope.pOObjEdit.pOLineItemList;

											if (tempArray != undefined) {
												if ($scope.pOObjEdit.pOLineItemList.length > 0) {
													for (var i = 0; i < $scope.pOObjEdit.pOLineItemList.length; i++) {
														var a = parseInt($scope.pOObjEdit.pOLineItemList[i].qty);
														$scope.pOObjEdit.pOLineItemList[i].qty = a;
													}
												}
											}
										});

					}
					$scope.pOObjEdit = [];

					$scope.updatePurchaseOrder = function() {
						if ($scope.pOObjEdit.pOLineItemList.length == 0
								|| $scope.pOObjEdit.pOLineItemList.itemName == "") {
							console.log("Please select atleast one item");
							$scope.errorMsg = "Please select atleast one item.";
						} else {
							var purchaseService = appEndpointSF
									.getPurchaseOrderService();
							$scope.pOObjEdit.business = $scope.curUser.business;

							purchaseService
									.addPurchaseOrder($scope.pOObjEdit)
									.then(
											function(msgBean) {

												$log
														.debug("Inside Ctr addPurchaseOrder");
												$log.debug("msgBean.msg:"
														+ msgBean.msg);
												$scope.showSimpleToast();
												// $scope.getAllPurchaseOrder();
											});

							$scope.pOObjEdit = {};
						}
					}

					$scope.addItem = function() {
						var item = {
							srNo : $scope.pOObjEdit.pOLineItemList.length + 1,
							itemName : "",
							qty : 1,
							price : "",
							subTotal : ""
						};

						$scope.pOObjEdit.pOLineItemList.push(item);
					};

					$scope.removeItem = function(index) {
						$scope.pOObjEdit.pOLineItemList.splice(index, 1);
						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.calSubTotal = function() {
						$log.debug("##Came to calSubTotal...");
						$scope.pOObjEdit.subTotal = 0;

						for (var i = 0; i < $scope.pOObjEdit.pOLineItemList.length; i++) {
							var line = $scope.pOObjEdit.pOLineItemList[i];
							$scope.pOObjEdit.subTotal += (line.qty * line.price);

							$log.debug("subTotal :"
									+ $scope.pOObjEdit.subTotal);
						}
						$log.debug("$scope.pOObjEdit 1 :"
								+ $scope.pOObjEdit.subTotal);
						return $scope.pOObjEdit.subTotal;
					}

					$scope.calfinalTotal = function() {
						$log.debug("##Came to calfinalTotal...");

						$scope.pOObjEdit.finalTotal = parseFloat($scope.pOObjEdit.subTotal)
								+ parseFloat($scope.pOObjEdit.taxTotal);
					}

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.pOObjEdit.pOLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

						$scope.calSubTotal();
						$scope.calfinalTotal();
					};

					$scope.CustomerddlChange = function(index, customer) {
						$log.debug("##Came to CustomerddlChange...");
						// $scope.pOObjEdit.customer
						// =$scope.pOObjEdit.customer;
					};

					$scope.lineItemTaxChange = function(index, selectedTaxItem) {
						$log.debug("##Came to lineItemTaxChange...");

						var tempArray = $scope.pOObjEdit.selectedTaxItem;
						if (tempArray != undefined) {
							$scope.pOObjEdit.taxTotal = (tempArray.taxPercenatge / 100)
									* ($scope.pOObjEdit.subTotal)

							$scope.pOObjEdit.taxTotal = parseFloat(
									Math
											.round($scope.pOObjEdit.taxTotal * 100) / 100)
									.toFixed(2);

							$scope.calfinalTotal();
						}

						$scope.pOObjEdit['selectedTaxItem'] = selectedTaxItem;

						$scope.pOObjEdit.taxTotal = ($scope.pOObjEdit.selectedTaxItem.taxPercenatge / 100)
								* ($scope.pOObjEdit.subTotal)

						$scope.pOObjEdit.taxTotal = parseFloat(
								Math
										.round($scope.pOObjEdit.taxTotal * 100) / 100)
								.toFixed(2);

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

					$scope.getTaxesByVisibility = function() {
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
					$scope.taxforPO = [];

					// list of `state` value/display objects
					$scope.supplierList = [];

					$scope.supplier = null;
					$scope.searchTextInput = null;

					$scope.querySearch = function(query) {
						var results = query ? $scope.supplierList
								.filter(createFilterFor(query))
								: $scope.supplierList;
						var deferred = $q.defer();
						$timeout(function() {
							deferred.resolve(results);

						}, Math.random() * 1000, false);
						return deferred.promise;
					}

					function loadAllSuppliers() {

						var supplierService = appEndpointSF
								.getSupplierService();

						supplierService.getAllSuppliersByBusiness(
								$scope.curUser.business.id).then(
								function(supplierList) {

									$scope.supplierList = supplierList;

								});
					}

					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(supp) {
							return (angular.lowercase(supp.supplierName)
									.indexOf(lowercaseQuery) === 0);
						};
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
							$scope.showPO();
							$scope.getAllStock();
							$scope.getTaxesByVisibility();
							loadAllSuppliers();
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}
					$scope.waitForServiceLoad();

					$scope.addSupplier = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/purchase/supplier_add.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {
												curBusi : $scope.curUser.business,
												supplier : $scope.supplier,
												curUser : $scope.curUser
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
							curUser, supplier) {

						$scope.addSupplier = function() {
							$scope.supplier.business = curUser.business;
							$scope.supplier.createdDate = new Date();
							$scope.supplier.modifiedBy = curUser.email_id;
							var supplierService = appEndpointSF
									.getSupplierService();

							supplierService.addSupplier($scope.supplier).then(
									function(msgBean) {

									});
							$scope.hide();
							// window.history.back();
						}

						$scope.hide = function() {
							$mdDialog.hide();
						};
					}
				});
