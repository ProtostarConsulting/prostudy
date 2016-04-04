var app = angular.module("stockApp");

app
		.controller(
				"accountReceivableListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, objectFactory,
						appEndpointSF, monthList) {

					$log.debug("Inside accountReceivableListCtr");

					$scope.curUser = appEndpointSF.getLocalUserService()
							.getLoggedinUser();
					$log.debug("$scope.curUser++++++++"
							+ angular.toJson($scope.curUser));

					$scope.accountReveivable = {
						customer : [],
						invoiceId : '',
						invoiceDate : '',
						finalTotal : '',
						invoiceDueDate : '',
						loggedInUser : ''
					};

					$scope.getAllReceivablesByBusiness = function() {
						var receivableService = appEndpointSF
								.getAccountService();

						receivableService
								.getAllReceivablesByBusiness(
										$scope.curUser.businessAccount.id)
								.then(
										function(accountList) {

											$scope.receivables = accountList;

											$scope.totalReceivable = 0;
											for (var i = 0; i < $scope.receivables.length; i++) {
												$scope.receivables[i].invoiceDueDate = new Date(
														$scope.receivables[i].invoiceDueDate);
												$scope.totalReceivable = $scope.totalReceivable
														+ (parseInt($scope.receivables[i].finalTotal));
											}

											$log.debug("totalReceivable:"
													+ ($scope.totalReceivable));

										});
					}

					$scope.receivables = [];
					$scope.getAllReceivablesByBusiness();

					/*
					 * $scope.ReceivablesAtDate = { atDate : '',
					 * filteredByAtDate : [] };
					 * 
					 */
					$scope.filteredByAtDate = [];
/*					$scope.getByDate = function(atDate) {
						for (var i = 0; i < $scope.receivables.length; i++) {
							if ($scope.receivables[i].invoiceDueDate == atDate) {
								$scope.filteredByAtDate
										.push($scope.receivables[i]);
							}
							$log.debug("$scope.filteredByAtDate:"
									+ $scope.filteredByAtDate);

						}
					}
*/
					$scope.getBeforeDate = function(date) {

					}

					$scope.getAfterDate = function(date) {

					}

					$scope.getBetweenTwoDates = function(from, to) {

						$scope.fRBetweenTwoDates = [];
						
						var a = from.getTime();
						var b = to.getTime();
						if (a > b) {
							$scope.errorMsg = "From date must be less than To Date. please select correct date.";
						} else {
							for (var i = 0; i < $scope.receivables.length; i++) {

								if ($scope.receivables[i].invoiceDueDate >= from
										&& $scope.receivables[i].invoiceDueDate < to) {
									$scope.fRBetweenTwoDates
											.push($scope.receivables[i]);
								}
							}
						}
					}

					$scope.RPBetweenTwoDates = [];

					$scope.getByDate = function() {

						var fromDate = new Date($scope.atDate
								.getFullYear(), $scope.atDate
								.getMonth(), $scope.atDate
								.getDate());
						var toDate = new Date($scope.atDate
								.getFullYear(), $scope.atDate
								.getMonth(), $scope.atDate
								.getDate());

						toDate.setDate(toDate.getDate() + 1);

						$scope.filteredByAtDate = $scope
								.getBetweenDate(fromDate, toDate);
						$log.debug("$scope.filteredByAtDate:"
								+ $scope.filteredByAtDate);
					}

					$scope.filteredListByDate =[];
					$scope.getBetweenDate = function(fromDate, toDate) {
						var filteredList = [];
						for (var i = 0; i < $scope.receivables.length; i++) {

							if ($scope.receivables[i].invoiceDueDate >= fromDate
									&& $scope.receivables[i].invoiceDueDate < toDate)
								$scope.filteredListByDate.push($scope.receivables[i]);
						}
						return filteredList;
					}

					$scope.months = monthList;

					$scope.MonthsddlChange = function(index, selectedMonth) {
						$log.debug("##Came to MonthsddlChange...");
						$scope.countMonth = 0;
						for (var i = 0; i < $scope.months.length; i++) {
							if ($scope.months[i] == selectedMonth) {
								$scope.countIndex = $scope.months
										.indexOf($scope.months[i]) + 1;
								$log.debug("##$scope.indexOf..."
										+ $scope.countIndex);
							}
						}
					};

					
					
					$scope.getByMonth = function(month) {
						$scope.filteredReceivablesMonth = [];
						for (var i = 0; i < $scope.receivables.length; i++) {
							var a = $scope.receivables[i].invoiceDueDate;

							if ($scope.countIndex == a.getMonth() + 1) {
								$scope.filteredReceivablesMonth
										.push($scope.receivables[i]);
								// $scope.fPBetweenTwoDates.push($scope.payables[i]);
							}

						}
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
								'Account Data Saved!').position("top")
								.hideDelay(3000));
					};
				});
