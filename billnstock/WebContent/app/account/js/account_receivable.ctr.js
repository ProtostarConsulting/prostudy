var app= angular.module("stockApp");

app.controller(
		"accountReceivableCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside accountAddCtr");

			$scope.curUser = appEndpointSF.getLocalUserService()
			.getLoggedinUser();
			$log.debug("$scope.curUser++++++++"+angular.toJson($scope.curUser));
			
			
			$scope.accountReveivable = {
					customer:[],
					invoiceId : '',
					invoiceDate : '',
					finalTotal : '',
					invoiceDueDate : '',
					loggedInUser : ''
				};
			
			$scope.addReceivable = function() {
				$log.debug("No1");
				$scope.accountReveivable.loggedInUser =$scope.curUser;
				var accountService = appEndpointSF.getAccountService();
				accountService.addReceivable($scope.accountReveivable).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addAccount");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();

						});
				$log.debug("No4");
				$scope.account = {};
			}
	
			$scope.getAllAccountsByBusiness = function() {
				var accountService = appEndpointSF.getAccountService();

				accountService.getAllAccountsByBusiness($scope.curUser.businessAccount.id).then(
						function(accountList) {
							$log.debug("Inside Ctr getAllAccountsByBusiness");
							$scope.accounts = accountList;							
							$log.debug("Inside Ctr $scope.accounts:"
									+ angular.toJson($scope.accounts));
						});
			}

			$scope.accounts = [];
			$scope.getAllAccountsByBusiness();
			
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
			
			
			$scope.getAllCustomersByCurrUser = function() {
				$log.debug("Inside Ctr $scope.getAllCustomers");
				var customerService = appEndpointSF.getCustomerService();

				customerService.getAllCustomersByCurrUser($scope.curUser.businessAccount.id).then(
						function(custList) {
							$log.debug("Inside Ctr getAllCustomers");
							$scope.customersforaccount = custList;
							$log.debug("Inside Ctr $scope.customers:"
									+ angular.toJson($scope.customersforaccount));
						});
			}

			$scope.customersforaccount = [];
			$scope.getAllCustomersByCurrUser();
			
		});
