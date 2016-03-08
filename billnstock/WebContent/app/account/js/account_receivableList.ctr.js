var app = angular.module("stockApp");

app
		.controller(
				"accountReceivableListCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $stateParams, objectFactory,
						appEndpointSF,monthList) {

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
						var payableService = appEndpointSF.getAccountService();

						payableService
								.getAllReceivablesByBusiness(
										$scope.curUser.businessAccount.id)
								.then(
										function(accountList) {

											$scope.receivables = accountList;
											$log
													.debug("Inside Ctr $scope.receivables:"
															+ angular
																	.toJson($scope.receivables));

											$scope.totalReceivable = 0;
											for (var i = 0; i < $scope.receivables.length; i++) {
												$scope.totalReceivable = $scope.totalReceivable
														+ (parseInt($scope.receivables[i].finalTotal));
											}

											$log.debug("totalReceivable:"
													+ ($scope.totalReceivable));

										});
					}

					$scope.receivables = [];
					$scope.getAllReceivablesByBusiness();

					$scope.ReceivablesAtDate = {
						atDate : '',
						filteredByAtDate : []
					};
					$scope.showReceivablesByDate = function(atDate) {
						for (var i = 0; i < $scope.receivables.length; i++) {
							if ($scope.receivables[i].invoiceDueDate == $scope.ReceivablesAtDate.atDate) {
								$scope.ReceivablesAtDate.filteredByAtDate
										.push($scope.receivables[i]);
							}
							$log
									.debug("$scope.ReceivablesAtDate.filteredByAtDate:"
											+ $scope.ReceivablesAtDate.filteredByAtDate);

						}
					}

/*					$scope.months = [ "January", "February", "March", "April",
							"May", "June", "July", "Augast", "September",
							"October", "November", "December" ];
*/
					
					$scope.months = monthList;
					
					$scope.MonthsddlChange = function(index, selectedMonth) {
						$log.debug("##Came to MonthsddlChange...");
						$scope.countMonth = 0;
						for (var i = 0; i < $scope.months.length; i++) {
							if ($scope.months[i] == selectedMonth) {
								$scope.countIndex = $scope.months.indexOf($scope.months[i]) + 1;
								$log.debug("##$scope.indexOf..."+$scope.countIndex);
							} 
						}
					};
					
					$scope.showReceivablesByMonth = function(month) {
						$scope.month = month;
						$scope.month
						for (var i = 0; i < $scope.receivables.length; i++) {

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
