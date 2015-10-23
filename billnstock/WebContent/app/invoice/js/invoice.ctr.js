app = angular.module("stockApp");

app
		.controller(
				"invoiceCtr",function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log){ 
							
							$scope.newitemTObill = function() {
								return {
									bill_No : '',
									sr_No : '',
									cust_Name : '',
									item_Name : '',
									rate : '',
									qty : '',
									discount : '',
								}
							};
										
							$scope.itemTObill = $scope.newitemTObill();

							$scope.selected = [];

							$scope.addItemTObill = function() {
								console.log("in side addItemTObill");
								// console.log($scope.addStock);
								gapi.client.addItemInBillServices.addItemInBill(
										$scope.itemTObill).execute(function(resp) {
									console.log("Item Added: " + resp.msg);

//									alert("Saved");

								//	$scope.clearAddfields();
									// $scope.getAllStockService();
									// $scope.$apply();
									// $scope.examque =
									// $scope.newExamQuestion();
								/*	$("#addField").show();
									$("#custTable").hide();
									$("#anotherCust").hide();
									$("#update").hide();*/
								})

							};
							

							
							$scope.updateBillItem = function() {
								console.log("in side updateBillItem");
								// console.log($scope.addStock);
								gapi.client.addItemInBillServices.addItemInBill(
										$scope.selected[0]).execute(function(resp) {
									console.log("Bill Item Updated: " + resp.msg);

									alert("Saved");

								//	$scope.clearAddfields();
									 $scope.getAllBillItems();
									 $scope.$apply();
									
								/*	$("#addField").show();
									$("#custTable").hide();
									$("#anotherCust").hide();
									$("#update").hide();
								*/
								})

							};
							
							$scope.saveANDprint = function() {
								console.log("in side saveANDprint");
								
								};
							
								
							$scope.LoadNewItemBill = function() {
								console.log("In LoadNewItemBill");								
								gapi.client.addItemInBillServices.getItemBills().execute(
												function(resp) {
													console.log(resp.items);
													$scope.$apply();

													$scope.billsItem= resp.items;
													console.log("Response"+ $scope.billsItem);

													$scope.query = {
															order : 'cust_Name',
															limit : 5,
															page : 1
														};

														$scope.onpagechange = function(page, limit) {
															var deferred = $q.defer();

															$timeout(function() {
																deferred.resolve();
															}, 2000);

															return deferred.promise;
														};
														

														$scope.onorderchange = function(order) {
															var deferred = $q.defer();

															$timeout(function() {
																deferred.resolve();
															}, 2000);

															return deferred.promise;
														};	

												/*	$("#addField").show();
													$("#custTable").hide();
													$("#anotherCust").hide();
													$("#update").hide();*/
												});
								
							};// end of GetStockList
						
														
							console.log("In getItemBills............"+$scope.getItemBills);
							
							$scope.LoadAllBills = function() {
								console.log("In LoadAllBills");
								
								gapi.client.invoiceService.getAllBills().execute(
												function(resp) {
													console.log(resp.items);
													$scope.$apply();

													$scope.billsItem= resp.items;
													console.log("Response billsItem"+ $scope.billsItem);

							
							})};// end of loadAllBills
								
							$scope.deleteNumber = function(val)
							{
							    numbers.splice(val, 1);
							};
							
							
							/*
							 * $scope.totalPrice = function(){ var total = 0;
							 * for(count=0;count<$scope.items.length;count++){
							 * total +=
							 * $scope.items[count].Price*$scope.items[count].Quantity; }
							 * return total; }
							 
							 * };//end of addNewTax
							 */

							$window.initGAPI = function() {
								console.log("Came to initGAPI");
								$scope.$apply($scope.loadCustomService);

							};

							$scope.loadCustomService = function() {
								console.log("Inside window.loadCustomServices");
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								var apisToLoad;
								

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()
								
								gapi.client.load('addItemInBillServices','v0.1',function() {
													console.log("Inside gapi.client.load");
													$scope.is_backend_ready = true;
													$scope.LoadNewItemBill();

												}, apiRoot);
								
								gapi.client.load('invoiceService','v0.1',function() {
									console.log("Inside gapi.client.load");
									$scope.is_backend_ready = true;
									$scope.LoadAllBills();

								}, apiRoot);

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
							
						} );
