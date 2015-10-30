app = angular.module("stockApp");

app
		.controller(
				"invoiceCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF) {

					$scope.invoice = {
						id : '',
						invoice_id : 101,
						sr_No : '',
						cust_Name : '',
						note : "If you have any query please contact on finance@protostar.co.in"
					}
/*
					$scope.itemline1 = {
						sr_No : 1,
						item_Name : '',
						qty : 1,
						fetchedPrice : ''
					}
					$scope.itemline2 = {
						sr_No : 2,
						item_Name : '',
						qty : 1,
						fetchedPrice : ''
					}
*/
					$scope.rows = [{
						sr_No : 1,
						item_Name : '',
						qty : 1,
						price : '',
						total : 0
					}]

					$scope.selected = [];

					$scope.addInvoice = function() {
						$log.debug("No1");
						var invoiceService = appEndpointSF.getInvoiceService();

						invoiceService.addInvoice($scope.tax).then(
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

					$scope.itemline1Qty = 1;
					$scope.selectedItem1 = {};
					$scope.selectedItem = {};
					$scope.qty = 1;
					
					$scope.itemline2Qty = 1;
					$scope.selectedItem2 = {};

					// $scope.tax_Rate = 0;
					$scope.selectedTax = {};

					/*
					 * $scope.getItemPrice = function(){ console.log("Selected
					 * Item:"+ $scope.selectedItem ); $scope.key =
					 * $scope.stockforinvoice.indexOf[$scope.selectedItem];
					 * $log.debug("Key"+ $scope.stockforinvoice.fetchedPrice);
					 * $log.debug("Key"+ $scope.key); // $scope.myNewOptions =
					 * $scope.city[ $scope.key ]; $scope.fetchedPrice =
					 * $scope.stockforinvoice[$scope.key]; console.log("Selected
					 * prices:"+ $scope.fetchedPrice ); };
					 */

					$scope.getItemPrice = function(item) {
						var seleItem = $scope.selectedItem;

						var key = $.grep($scope.stockforinvoice,
								function(item) {

									return item_Id == seleItem;

								})
						$window.alert("Selected Value: " + seleItem
								+ "\nSelected Text: " + key);
					}

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

					$scope.taxData = [];
					$scope.getAllTaxes();

					$scope.addRow = function() {

						$scope.rows.push({
							'sr_No' : 1,
							'selectedItem' : '',
							'qty' : 1,
							'selectedItem.price' : '',
							'total' :0
						});
					/*
					 * $scope.totalPrice = function(){ var total = 0;
					 * for(count=0;count<$scope.items.length;count++){ total +=
					 * $scope.items[count].Price*$scope.items[count].Quantity; }
					 * return total; } };
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

					}
					/*
					 * $scope.invoice = { items: [{ item_name:'', qty: 10,
					 * description: 'item', cost: 9.95}] };
					 * 
					 * $scope.addItem = function() { $scope.invoice.items.push({
					 * qty: 1, description: '', cost: 0 }); },
					 * 
					 * $scope.removeItem = function(index) {
					 * $scope.invoice.items.splice(index, 1); },
					 * 
					 * $scope.total = function() { var total = 0;
					 * angular.forEach($scope.invoice.items, function(item) {
					 * total += item.qty * item.cost; })
					 * 
					 * return total; }
					 * 
					 */
		/*			$scope.total = function() { var total = 0;
					 angular.forEach($scope.stockData1.item, function(item) {
					 total += item.qty * item.cost; })
					}
			*/
					
					 $scope.total = function(type) {
					        var total = 0;
					        angular.forEach($scope.stockData1, function(el) {
					            total += el[type];
					        });
					        return total;
					    };
					    
					$scope.stockData1 = [];
					                 
					               $scope.addItem = function(){
					                 var item = {
					                		 sr_No: $scope.sr_No,
					                		 item_Name: $scope.item_Name,
					                		 qty: $scope.qty,
					                		 price: $scope.price,
					                		 total: $scope.total
					                 };
					                 
					                 $scope.stockData1.push(item);
					               };
					                
					                $scope.removeItem = function(index){
					                 $scope.stockData1.splice(index, 1);
					                }; 
					                
				});
