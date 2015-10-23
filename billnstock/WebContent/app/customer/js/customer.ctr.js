angular.module("stockApp").controller(
		"customerCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");
			

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Data Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.getCustomers = function() {
				$log.debug("in side getCustomers");
				$scope.customers = appEndpointSF.getCustomerService().getCustomers();
				$log.debug("in side getCustomers : $scope.customers:"+ $scope.customers);
			};
				
			$scope.addCust = function() {
				$log.debug("in side addStudent. added...");
				appEndpointSF.getCustomerService().addCustomer($scope.cust);		
				$scope.showSimpleToast();
				$scope.cust = {};
			};// end of call to addStudent

			//$scope.cust = objectFactory.newCustomer();
			$scope.cust = {};
			$scope.customers = [];
			$scope.getCustomers();
			
//			 Setup menu 
			$scope.toggleRight = buildToggler('right');
		
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
		});

/*
app = angular.module("stockApp");

app.controller("customerCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
						$log, objectFactory, appEndpointSF){ 
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
								$log.debug("in side addCust");
								// $log.debug($scope.addStock);
								gapi.client.stockcustomerservice.addCustomer(
										$scope.cust).execute(function(resp) {
									$log.debug("Customer Added: " + resp.msg);

									if (resp.token == "U") {
										alert("Updated");
									} else {
										alert("Saved");
									}

//									alert("Saved");

									$scope.clearAddfields();
									// $scope.getAllStockService();
									// $scope.$apply();
									$("#addField").show();
									$("#custTable").hide();
									$("#anotherCust").hide();
									$("#update").hide();
								})

							};
							
							$scope.updateCust = function() {
								$log.debug("in side updateCust");
								// $log.debug($scope.addStock);
								gapi.client.stockcustomerservice.addCustomer(
										$scope.cust).execute(function(resp) {
									$log.debug("Customer Updated: " + resp.msg);

									if (resp.token == "U") {
										alert("Updated");
									} else {
										alert("Saved");
									}
								})

							};

						
							$scope.getAllCustomers = function() {
								$log.debug("In loadGetCustomerList");
								gapi.client.stockcustomerservice
										.getAllCustomers()
										.execute(
												function(resp) {
													$log.debug(resp.items);
													// $scope.items =
													// resp.items;
													$scope.$apply();

													$scope.customerDataActual = resp.items;
													$scope.$apply();
													$log.debug("Response"+ $scope.customerDataActual);

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
														$log.debug(order);
														$log.debug($scope.query);
														var order = order.startsWith("-");
														//$scope.desserts = sortBy($scope.desserts, order);
														$scope.customerData = $scope.customerData
																.sort(order?compareByColDesc:compareByColAsc);
														$log.debug($scope.customerData);

													};

													$scope.onPaginationChange = function(page, limit) {
														$log.debug("limit"+ limit);
														$log.debug("page" + page);
														var from = (page == 1) ? 0 : (page * limit - limit);
														var till = page * limit;
														$scope.customerData = $scope.customerDataActual.slice(from,
																till);
													};
													
													
												function compareByColAsc(a,
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

													$("#addField").show();
													$("#custTable").hide();
													$("#anotherCust").hide();
													$("#update").hide();
												});
							};// end of GetStockList

						
							$scope.clearAddfields = function() {
								cust_id = '', item_Name = '', category = '',
										qty = '', price = '', notes = ''
							}
							
							$window.initGAPI = function() {
								$log.debug("Came to initGAPI");
								$scope.$apply($scope.loadCustomService);

							};

							$scope.loadCustomService = function() {
								$log.debug("Inside window.loadCustomServices");
								var apiRoot = '//' + window.location.host
										+ '/_ah/api';

								// Loads the OAuth and helloworld APIs
								// asynchronously, and
								// triggers login
								// when they have completed.
								var apisToLoad;

								apisToLoad = 1; // must match number of calls to
								// gapi.client.load()

								gapi.client.load('stockcustomerservice','v0.1',function() {
													$log.debug("Inside gapi.client.load");
													$scope.is_backend_ready = true;
													$scope.getAllCustomers();

												}, apiRoot);

							};
							
							

		//					 Setup menu 
							$scope.toggleRight = buildToggler('right');
						
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
*/

