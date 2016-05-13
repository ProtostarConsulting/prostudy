app = angular.module("stockApp");

app
		.controller(
				"purchaseOrderAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $state, $http, $stateParams,
						$routeParams, $filter, $q, $mdMedia, $mdDialog, objectFactory, appEndpointSF) {

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.purchaseOrderObj = {

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

					$scope.addPurchaseOrder = function() {
						if ($scope.purchaseOrderObj.pOLineItemList.length == 0
								|| $scope.purchaseOrderObj.pOLineItemList.itemName == "") {
							console.log("Please select atleast one item");
							$scope.errorMsg = "Please select atleast one item.";
						} else {
							var purchaseService = appEndpointSF
									.getPurchaseOrderService();
							$scope.purchaseOrderObj.business = $scope.curUser.business;

							purchaseService
									.addPurchaseOrder($scope.purchaseOrderObj)
									.then(
											function(msgBean) {

												$log
														.debug("Inside Ctr addPurchaseOrder");
												$log.debug("msgBean.msg:"
														+ msgBean.msg);
												$scope.showSimpleToast();
												// $scope.getAllPurchaseOrder();
											});

							$scope.purchaseOrderObj = {};
						}
					}

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

						$scope.purchaseOrderObj.finalTotal = parseFloat($scope.purchaseOrderObj.subTotal)
								+ parseFloat($scope.purchaseOrderObj.taxTotal);
					}

					$scope.lineItemStockChange = function(index, stockItem) {
						$log.debug("##Came to lineItemStockChange...");
						var lineSelectedItem = $scope.purchaseOrderObj.pOLineItemList[index];
						lineSelectedItem.price = stockItem.price;
						lineSelectedItem.itemName = stockItem.itemName;
						lineSelectedItem.subTotal = stockItem.subTotal;

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

						$scope.purchaseOrderObj.taxTotal = ($scope.purchaseOrderObj.selectedTaxItem.taxPercenatge / 100)
								* ($scope.purchaseOrderObj.subTotal)

								$scope.purchaseOrderObj.taxTotal = parseFloat(
								Math.round($scope.purchaseOrderObj.taxTotal * 100) / 100)
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
/*						var results = query ? $scope.supplierList
								.filter(createFilterFor(query))
								: $scope.supplierList;
*/								
						var results = query ? $scope.supplierList.filter(createFilterFor(query)) : [];		
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

					$scope.tempSupp = [];
					
					function createFilterFor(query) {
						var lowercaseQuery = angular.lowercase(query);
						return function filterFn(supp) {
														
							return (angular.lowercase(supp.supplierName)
									.indexOf(lowercaseQuery) >= 0);
						};
					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {
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
								.show({
									controller : DialogController,
									templateUrl : '/app/purchase/supplier_add.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen,
									locals : {
										curBusi : $scope.curUser.business,
										supplier : $scope.supplier,
										curUser :  $scope.curUser
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

					function DialogController($scope, $mdDialog, curBusi,curUser,
							supplier) {

						$scope.addSupplier = function() {
							 $scope.supplier.business = curUser.business;
							 $scope.supplier.createdDate = new Date();
							 $scope.supplier.modifiedBy = curUser.email_id;
								var supplierService = appEndpointSF.getSupplierService();

								supplierService.addSupplier($scope.supplier).then(function(msgBean) {
							
								});
								$scope.hide();
								//window.history.back();
						}
						
						$scope.hide = function() {
							$mdDialog.hide();
						};
					}
				});
