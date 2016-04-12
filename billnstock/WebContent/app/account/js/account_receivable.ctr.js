var app= angular.module("stockApp");

app.controller(
		"accountReceivableCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams,$q, objectFactory, appEndpointSF) {

			$log.debug("Inside accountAddCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			
			
			$scope.accountReveivable = {
					customer:[],
					business : '',
					invoiceId : '',
					receivableDate: '',
					invoiceDate : '',
					invoiceDueDate : '',
					finalTotal : '',
					status:"NotPaid"
					
				};
			
			$scope.addReceivable = function() {
				$log.debug("No1");
				$scope.accountReveivable.business =$scope.curUser.business;
				var accountService = appEndpointSF.getAccountService();
				accountService.addReceivable($scope.accountReveivable).then(
						function(msgBean) {
							$scope.showSimpleToast();

						});
				$log.debug("No4");
				$scope.account = {};
			}
	
			$scope.getAllAccountsByBusiness = function() {
				var accountService = appEndpointSF.getAccountService();

				accountService.getAllAccountsByBusiness($scope.curUser.business.id).then(
						function(accountList) {
							$log.debug("Inside Ctr getAllAccountsByBusiness");
							$scope.accounts = accountList;							
							$log.debug("Inside Ctr $scope.accounts:"
									+ angular.toJson($scope.accounts));
						});
			}

			$scope.accounts = [];
			
			
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
			
			// list of `state` value/display objects
			$scope.customersforinvoice = [];
	
			$scope.accountReveivable.customer = null;
			$scope.searchTextInput = null;

			$scope.querySearch = function(query) {
				var results = query ? $scope.customersforinvoice
						.filter(createFilterFor(query)) : $scope.customersforinvoice;
				var deferred = $q.defer();
				$timeout(function() {
					deferred.resolve(results);
			//		$scope.salesOrder.customer = results;
				}, Math.random() * 1000, false);
				return deferred.promise;
			}

			function loadAllCustomers() {
				
					var customerService = appEndpointSF.getCustomerService();
					customerService.getAllCustomersByBusiness($scope.curUser.business.id).then(
							function(custList) {
								$scope.customersforinvoice = custList.items;	
							});			
			}

			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);
				return function filterFn(cus) {
					return (angular.lowercase(cus.firstName).indexOf(lowercaseQuery) === 0);
				};
			}

			$scope.waitForServiceLoad = function() {
				if (appEndpointSF.is_service_ready) {
					loadAllCustomers();
					$scope.getAllAccountsByBusiness();
				} else {
					$log.debug("Services Not Loaded, watiting...");
					$timeout($scope.waitForServiceLoad, 1000);
				}
			}
			$scope.waitForServiceLoad();
		});
