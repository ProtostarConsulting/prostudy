
app = angular.module("stockApp");

app
		.controller(
				"addItemStockCtr",
				[
						'$scope',
						'$window',
						'$mdToast',
						'$resource',
						function($scope, $window, $mdToast, $resource,
								$mdDialog) {
							$scope.newStock = function() {
								return {
									id :'',
									item_Id : '',
									item_Name : '',
									category : '',
									qty : '',
									price : '',
									notes : '',							
								}
							};

							$scope.selected = [];

							$scope.stock = $scope.newStock();
							
							$scope.addStock = function() {
								console.log("in side addStock");
								// console.log($scope.addStock);
								gapi.client.stockServices.addStockService(
										$scope.stock).execute(function(resp) {
									console.log("Stock Added: " + resp.msg);

									/*
									 * if (resp.token == "U") {
									 * alert("Updated"); } else {
									 * alert("Saved"); }
									 */
									alert("Saved");

									$scope.clearAddfields();
									// $scope.getAllStockService();
									// $scope.$apply();
									// $scope.examque =
									// $scope.newExamQuestion();
								/*	$("#addField").show();
									$("#stockTable").hide();
									$("#anotherStock").hide();
									$("#update").hide();*/
								})

							};

								$scope.updateStock = function() {
								console.log("in side updateCust");
								// console.log($scope.addStock);
								gapi.client.stockServices.addStockService(
										$scope.selected[0]).execute(function(resp) {
									console.log("Customer Updated: " + resp.msg);

									alert("Saved");

									$scope.clearAddfields();
									 $scope.getAllStockService();
									 $scope.$apply();
									
								/*	$("#addField").show();
									$("#custTable").hide();
									$("#anotherCust").hide();
									$("#update").hide();*/
								})

							};
							
							$scope.getAllStockService = function() {
								console.log("In loadGetStockList");
								gapi.client.stockServices
										.getAllStockService()
										.execute(
												function(resp) {
													console.log(resp.items);
													// $scope.items =
													// resp.items;
													$scope.$apply();

													$scope.stockData = resp.items;
													$scope.$apply();
													console
															.log("Response"
																	+ $scope.stockData);

										
											$scope.query = {
													order : 'item_Name',
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
												
											/*		$("#addField").show();
													$("#stockTable").hide();
													$("#anotherStock").hide();
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

							$scope.clearAddfields = function () {
								id='',
								item_Id = '',
								item_Name = '',
								category = '',
								qty = '',
								price = '',
								notes = ''
							}
							
					

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
												'stockServices',
												'v0.1',
												function() {
													console
															.log("Inside gapi.client.load");
													$scope.is_backend_ready = true;
													$scope.getAllStockService();

												}, apiRoot);

							};
						
							$scope.addAnotherStock = function() {
							/*	$("#addField").show();
								$("#stockTable").hide();
								$("#anotherStock").hide();
								$("#update").hide();*/
							}
						} ]);
