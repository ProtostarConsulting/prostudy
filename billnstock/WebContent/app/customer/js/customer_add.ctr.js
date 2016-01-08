var app= angular.module("stockApp");

app.controller(
		"customerAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log,$stateParams, objectFactory, appEndpointSF) {

			$log.debug("Inside customerCtr");

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Data Saved!')
						.position("top").hideDelay(3000));
			};

			// $scope.cust = objectFactory.newCustomer();		
			
			$scope.cust = {
				customerId : "",
				customerName : "",
				mobile : "",
				email : "",
				customerAddress : ""
			};

			$scope.addCustomer = function() {
				$log.debug("No1");
				var customerService = appEndpointSF.getCustomerService();
				customerService.addCustomer($scope.cust).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addCustomer");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();

						});
				$log.debug("No4");
				$scope.cust = {};
			}

			$scope.getAllCustomers = function() {
				$log.debug("Inside Ctr $scope.getAllCustomers");
				var customerService = appEndpointSF.getCustomerService();

				customerService.getAllCustomers().then(
						function(custList) {
							$log.debug("Inside Ctr getAllCustomers");
							$scope.customers = custList;
							$scope.tempCustomerId = $scope.customers.length + 1;
							$scope.cust.customerId = $scope.tempCustomerId;
							
							$log.debug("Inside Ctr $scope.customers:"
									+ angular.toJson($scope.customers));
						});
			}

			$scope.customers = [];
			$scope.tempCustomerId;
			$scope.getAllCustomers();

			
			/*			
			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedCustomerId:",
					$stateParams.selectedCustomerId);

			$scope.selectedCustomerId = $stateParams.selectedCustomerId;

			$scope.showCustomerDetails = function() {
				var customerService = appEndpointSF.getCustomerService();

				customerService
						.getCustomerByID($scope.selectedCustomerId)
						.then(function(customerList) {
									$scope.customerDetails = customerList[0];
									$log
											.debug("$scope.showCustomerDetails:customerList ===="
													+ angular
															.toJson($scope.customerDetails));
								});

			}
			$scope.customerDetails = [];
			//$scope.showCustomerDetails();
			
			$scope.getAllInvoiceByCustId = function() {
				$log.debug("Inside Ctr $scope.getAllInvoiceByCustId");
				var invoiceService = appEndpointSF.getInvoiceService();

				invoiceService
						.getAllInvoiceByCustId($scope.selectedCustomerId)
						.then(
								function(custInvoiveList) {
									$log
											.debug("Inside Ctr getAllInvoiceByCustId");
									$scope.custInvoiceData = custInvoiveList;
									$log
											.debug("Inside Ctr $scope.custInvoiceData:"
													+ angular
															.toJson($scope.custInvoiceData));
								});
			}

			$scope.custInvoiceData = [];
			//$scope.getAllInvoiceByCustId();
			
*/			
			
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
