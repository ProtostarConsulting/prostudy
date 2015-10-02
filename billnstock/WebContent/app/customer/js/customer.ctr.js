
app = angular.module("stockApp");

app
		.controller(
				"customerCtr",
				[
						'$scope',
						'$window',
						'$mdToast',
						'$resource',
						function($scope, $window, $mdToast, $resource,
								$mdDialog) {
							$scope.newCustomer = function() {
								return {
									id : '',
									cust_id : '',
									cust_Name : '',
									mobile : '',
									email : '',
									address : '',
								}
							};

							$scope.cust = $scope.newCustomer();

							$scope.selected = [];

							$scope.addCust = function() {
								console.log("in side addCust");
								// console.log($scope.addStock);
								gapi.client.stockcustomerservice.addCustomer(
										$scope.cust).execute(function(resp) {
									console.log("Customer Added: " + resp.msg);

									if (resp.token == "U") {
										alert("Updated");
									} else {
										alert("Saved");
									}

//									alert("Saved");

									$scope.clearAddfields();
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
							
							$scope.updateCust = function() {
								console.log("in side updateCust");
								// console.log($scope.addStock);
								gapi.client.stockcustomerservice.addCustomer(
										$scope.cust).execute(function(resp) {
									console.log("Customer Updated: " + resp.msg);

									if (resp.token == "U") {
										alert("Updated");
									} else {
										alert("Saved");
									}

//									alert("Saved");

							//		$scope.clearAddfields();
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

							/*
							 * $scope.updateCust = function(stocks) {
							 * $scope.customerData.push(stocks); $scope.stocks =
							 * {}; // $scope.clearall(); }
							 */

/*							$scope.editItem = function(index) {
								$scope.editing = $scope.items.indexOf(index);
								console.log("in side Edit Mode");
								// console.log($scope.addStock);
								gapi.client.stockcustomerservice.addCustomer(
										$scope.cust).execute(
										function(resp) {
											console.log("Customer Updated: "
													+ resp.msg);

											alert("Saved");

										//	$scope.clearAddfields();
										})
							};
*/
							$scope.getAllCustomers = function() {
								console.log("In loadGetCustomerList");
								gapi.client.stockcustomerservice
										.getAllCustomers()
										.execute(
												function(resp) {
													console.log(resp.items);
													// $scope.items =
													// resp.items;
													$scope.$apply();

													$scope.customerDataActual = resp.items;
													$scope.$apply();
													console.log("Response"+ $scope.customerDataActual);

													$scope.query = {
														filter : '',
														order : 'cust_id',
														limit : 5,
														page : 1
													};

											//		$scope.customerData = $scope.customerDataActual;

													$scope.customerData = $scope.customerDataActual
															.slice(0, 5);

													
													$scope.onOrderChange = function(order) {
														console.log(order);
														console.log($scope.query);
														var order = order.startsWith("-");
														//$scope.desserts = sortBy($scope.desserts, order);
														$scope.customerData = $scope.customerData
																.sort(order?compareByColDesc:compareByColAsc);
														console.log($scope.customerData);

													};

													$scope.onPaginationChange = function(page, limit) {
														console.log("limit"+ limit);
														console.log("page" + page);
														var from = (page == 1) ? 0 : (page * limit - limit);
														var till = page * limit;
														$scope.customerData = $scope.customerDataActual.slice(from,
																till);
													};
													
													
/*													$scope.onOrderChange = function(
															order) {
														console.log(order);
														console
																.log($scope.query);
														var order = order
																.startsWith("-");
														// $scope.desserts =
														// sortBy($scope.desserts,
														// order);
														$scope.customerData = $scope.customerData
																.sort(order ? compareByColDesc
																		: compareByColAsc);
														console
																.log($scope.customerData);
													};

													$scope.onPaginationChange = function(
															page, limit) {
														console.log("limit"+ limit);
														console.log("page" + page);
														var from = (page == 1) ? 0: (page * limit - limit);
														var till = page * limit;
														$scope.customerData = $scope.customerDataActual
																.slice(from,
																		till);
													};
													
													*/
													

													// Inline Table

			/*										$scope.addQuestion = function(
															item) {
														$scope.customerData
																.push(item);
														$scope.item = {};
													}

													// Inline Table modification
													$scope.editingData = [];

													for (var i = 0, length = $scope.customerData.length; i < length; i++) {
														$scope.editingData[$scope.customerData[i].cust_id] = false;
													}

													// Inline Table modification
													$scope.modify = function(
															customerData) {
														$scope.editingData[customerData.cust_id] = true;
													};

													// Inline Table Updation
													$scope.update = function(
															customerData) {
														$scope.editingData[customerData.cust_id] = false;
														// $scope.clearall();
													};

													$scope.removeQuestion = function(
															index) {
														$scope.customerData
																.splice(index,
																		1);
													};

													$scope.clearall = function(
															ExamAssignedQue) {
														cust_id = "",
																questionId = ""
													}

*/													function compareByColAsc(a,
															b) {
														if (a.cust_Name < b.cust_Name) {
															return -1;
														}
														if (a.cust_Name > b.cust_Name) {

															return 1;
														}
														return 0;
													}

													function compareByColDesc(
															a, b) {
														if (a.cust_Name < b.cust_Name) {
															return 1;
														}
														if (a.cust_Name > b.cust_Name) {

															return -1;
														}
														return 0;
													}

												/*	$("#addField").show();
													$("#custTable").hide();
													$("#anotherCust").hide();
													$("#update").hide();*/
												});
							};// end of GetStockList

							/*
							 * $scope.totalPrice = function(){ var total = 0;
							 * for(count=0;count<$scope.items.length;count++){
							 * total +=
							 * $scope.items[count].Price*$scope.items[count].Quantity; }
							 * return total; }
							 */

							/*
							 * $scope.taxDetails = function() {
							 * console.log("Inside Tax details");
							 * 
							 * $("#taxForm").hide(); $("#tableTax").show();
							 * 
							 * 
							 * 
							 * };//end of taxDetails
							 * 
							 * $scope.addNewTax = function() {
							 * console.log("Inside addNewTax");
							 * $scope.addTax.code_Name = "";
							 * $scope.addTax.tax_Rate = "";
							 * 
							 * $("#taxForm").show(); $("#tableTax").hide();
							 * $("#actionMsgDivR").hide();
							 * $("#actionMsgDivU").hide();
							 * 
							 * 
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

								// Loads the OAuth and helloworld APIs
								// asynchronously, and
								// triggers login
								// when they have completed.
								var apisToLoad;

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()

								gapi.client
										.load(
												'stockcustomerservice',
												'v0.1',
												function() {
													console.log("Inside gapi.client.load");
													$scope.is_backend_ready = true;
													$scope.getAllCustomers();

												}, apiRoot);

							};
							/*$scope.loadCustList = function() {
								gapi.client.stockcustomerservice
										.getAllCustomers()
										.execute(
												function(resp) {
													console.log(resp.items);

													// $scope.items =
													// resp.items;
													// $scope.$apply();

													$scope.customerDataActual = resp.items;
													$scope.$apply();
													console
															.log("Response"
																	+ $scope.customerDataActual);

													$scope.query = {
														filter : '',
														order : 'cust_id',
														limit : 3,
														page : 1
													};

													$scope.customerData = $scope.customerDataActual;

													$scope.customerData = $scope.customerDataActual
															.slice(0, 3);

													$scope.onOrderChange = function(
															order) {
														console.log(order);
														console
																.log($scope.query);
														var order = order
																.startsWith("-");
														// $scope.desserts =
														// sortBy($scope.desserts,
														// order);
														$scope.customerData = $scope.customerData
																.sort(order ? compareByColDesc
																		: compareByColAsc);
														console
																.log($scope.customerData);
													};

													$scope.onPaginationChange = function(
															page, limit) {
														var from = (page == 1) ? 0
																: (page * limit - limit);
														var till = page * limit;
														$scope.customerDatafromBD = $scope.customerDataActual
																.slice(from,
																		till);
													};

													// Inline Table

													
													 * $scope.addQuestion =
													 * function( stocks) {
													 * $scope.customerData
													 * .push(stocks);
													 * $scope.stocks = {}; //
													 * $scope.clearall(); }
													 
													// Inline Table modification
													$scope.editingData = [];

													for (var i = 0, length = $scope.customerData.length; i < length; i++) {
														$scope.editingData[$scope.customerData[i].cust_id] = false;
													}

													// Inline Table modification
													$scope.modify = function(
															customerData) {
														$scope.editingData[customerData.cust_id] = true;
													};

													// Inline Table Updation
													$scope.update = function(
															customerData) {
														$scope.editingData[customerData.cust_id] = false;
														// $scope.clearall();
													};

													$scope.removeQuestion = function(
															index) {
														$scope.customerData
																.splice(index,
																		1);
													};

													$scope.clearall = function(
															ExamAssignedQue) {
														cust_id = "",
																questionId = ""
													}

													function compareByColAsc(a,
															b) {
														if (a.cust_id < b.cust_id) {
															return -1;
														}
														if (a.cust_id > b.cust_id) {

															return 1;
														}
														return 0;
													}

													function compareByColDesc(
															a, b) {
														if (a.cust_id < b.cust_id) {
															return 1;
														}
														if (a.cust_id > b.cust_id) {

															return -1;
														}
														return 0;
													}

													$("#addField").hide();
													$("#custTable").show();
													$("#anotherCust").show();
													$("#update").show();
												});
							}*/
/*
							$scope.clearAddfields = function() {
								cust_id = '', item_Name = '', category = '',
										qty = '', price = '', notes = ''
							}
							$scope.addanotherCust = function() {
								$("#addField").show();
								$("#custTable").hide();
								$("#anotherCust").hide();
								$("#update").hide();
							}*/
						} ]);
