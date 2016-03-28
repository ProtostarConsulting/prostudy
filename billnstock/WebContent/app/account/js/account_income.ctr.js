var app = angular.module("stockApp");
app
		.controller(
				"accountIncomeCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, objectFactory,
						appEndpointSF) {

					$log.debug("Inside accountIncomeCtr");					  
					$scope.accountIncome = {
							fromDate : '',
							toDate : ''
						};
						
				//		 $("#allInvoices").show();	
				//		 $("#filteredInvoices").hide();
						 
					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.getAllInvoice = function() {
						$log.debug("Inside Ctr $scope.getAllInvoice");
						var invoiceService = appEndpointSF.getInvoiceService();
						invoiceService
								.getAllInvoice(
										$scope.curUser.businessAccount.id)
								.then(
										function(invoiceList) {
											$log
													.debug("Inside Ctr getAllInvoice");
											$scope.invoiceData = invoiceList;
											$log
													.debug("Inside Ctr $scope.invoiceData:"
															+ angular
																	.toJson($scope.invoiceData));
											$scope.total = 0;
											for (var i = 0; i < $scope.invoiceData.length; i++) {
												$scope.total = $scope.total
														+ (parseInt($scope.invoiceData[i].finalTotal));
											}

											$log.debug("total:"
													+ ($scope.total));
										});
					}

					$scope.invoiceData = [];
					$scope.getAllInvoice();

					
					$scope.showAccountIncomme = function() {
						$scope.income.filteredDataIncome = 0;
						
						
						
						for (i = 0; i < $scope.invoiceData.length; i++) {
							
/*							var getFrom = $scope.accountIncome.fromDate;						
							var getTo = $scope.accountIncome.toDate;
								
							$scope.from = getFrom.getDate()+"-"+getFrom.getMonth()+"-"+getFrom.getFullYear();
							$scope.To = getTo.getDate()+"-"+getTo.getMonth()+"-"+getTo.getFullYear();
*/							
							var getFrom = new Date($scope.invoiceData[i].invoiceDate);
							
							var getFrom1 = getFrom.getDate();
						
							
							var getFrom = $scope.invoiceData[i].invoiceDate;
							$scope.from = getFrom.getUTCDate();
							
							
							
							
							if ($scope.invoiceData[i].invoiceDate >= $scope.accountIncome.fromDate
									&& $scope.invoiceData[i].invoiceDate <= $scope.accountIncome.toDate) {
								
								$scope.income.filteredData.push($scope.invoiceData[i]);
	//							$scope.income.filteredDataIncome = ($scope.income.filteredDataIncome + (parseInt($scope.invoiceData[i].finalTotal)));
								}
							$log.debug("##Outer filteredDataIncome:"
									+ ($scope.income.filteredDataIncome));		
							
							$log.debug("## filteredData:"
									+ angular.toJson($scope.income.filteredData));	
						}
								
						$scope.filteredDatatotal = 0;
						for (var i = 0; i < $scope.income.filteredData.length; i++) {
							$scope.filteredDatatotal = $scope.filteredDatatotal
									+ (parseInt($scope.income.filteredData[i].finalTotal));
						}

						$log.debug("filteredDatatotal:"+ ($scope.filteredDatatotal));	
						
			//			 $("#allInvoices").hide();	
			//			 $("#filteredInvoices").show();
					}
					
					$scope.filteredData = [];
					$scope.income = {
							filteredData : [],
							filteredDataIncome  :0
					}
					
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

					$scope.showSimpleToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Customer Data Saved!').position("top")
								.hideDelay(3000));
					};

				});
