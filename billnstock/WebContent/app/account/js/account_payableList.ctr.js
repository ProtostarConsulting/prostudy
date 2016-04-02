var app = angular.module("stockApp");

app.controller("accountPayableListCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $stateParams, objectFactory, appEndpointSF, monthList) {

			$log.debug("Inside accountAddCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"
					+ angular.toJson($scope.curUser));
/*
			$scope.accountPayable = {
				customer : [],
				invoiceId : '',
				invoiceDate : '',
				finalTotal : '',
				invoiceDueDate : '',
				purchaseOrderId : '',
				purchaseOrderDate : '',
				loggedInUser : ''
			};
*/
			$scope.getAllPayablesByBusiness = function() {
				var payableService = appEndpointSF.getAccountService();

				payableService.getAllPayablesByBusiness(
						$scope.curUser.businessAccount.id).then(
						function(accountList) {

							$scope.payables = accountList;

							for (var i = 0; i < $scope.payables.length; i++) {
								$scope.payables[i].payableDate = new Date(
										$scope.payables[i].payableDate);
							}

							$log.debug("Inside Ctr $scope.payables:"
									+ angular.toJson($scope.payables));
						});
			}

			$scope.payables = [];
			$scope.getAllPayablesByBusiness();

			$scope.payblesAtDate = {
				atDate : '',
				filteredByAtDate : []
			};

			$scope.showPayablesBeforeDate = function(date) {

			}

			$scope.showPayablesAfterDate = function(date) {

			}

			$scope.showPayablesBetweenDate = function(fromDate, toDate) {
				var filteredList = [];
				for (var i = 0; i < $scope.payables.length; i++) {

					if ($scope.payables[i].payableDate >= fromDate
							&& $scope.payables[i].payableDate < toDate)
						filteredList.push($scope.payables[i]);
				}
				return filteredList;
			}

			$scope.showPayablesByDate = function() {

				var fromDate = new Date($scope.payblesAtDate.atDate
						.getFullYear(), $scope.payblesAtDate.atDate.getMonth(),
						$scope.payblesAtDate.atDate.getDate());
				var toDate = new Date(
						$scope.payblesAtDate.atDate.getFullYear(),
						$scope.payblesAtDate.atDate.getMonth(),
						$scope.payblesAtDate.atDate.getDate());

				toDate.setDate(toDate.getDate() + 1);

				$scope.payblesAtDate.filteredByAtDate = $scope
						.showPayablesBetweenDate(fromDate, toDate);
				$log.debug("$scope.payblesAtDate.filteredByAtDate:"
						+ $scope.payblesAtDate.filteredByAtDate);

			}

			/*
			 * $scope.months = [ "January", "February", "March", "April", "May",
			 * "June", "July", "Augast", "September", "October", "November",
			 * "December" ];
			 */

			// monthList taken from common.app.js
			$scope.months = monthList;

			$scope.MonthsddlChange = function(index, selectedMonth) {
				$log.debug("##Came to MonthsddlChange...");
				$scope.countMonth = 0;
				for (var i = 0; i < $scope.months.length; i++) {
					if ($scope.months[i] == selectedMonth) {
						$scope.countIndex = $scope.months
								.indexOf($scope.months[i]) + 1;
						$log.debug("##$scope.indexOf..." + $scope.countIndex);
					}
				}
			};
			$scope.filteredPayablesMonth = [];
			$scope.fPBetweenTwoDates = [];
			$scope.showPayablesByMonth = function(month) {		
				for (var i = 0; i < $scope.payables.length; i++) {
					var a= $scope.payables[i].payableDate;
					
					if($scope.countIndex == a.getMonth()+1){
						$scope.filteredPayablesMonth.push($scope.payables[i]);
						$scope.fPBetweenTwoDates.push($scope.payables[i]);
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
				$mdToast.show($mdToast.simple().content('Account Data Saved!')
						.position("top").hideDelay(3000));
			};
		});
