angular.module("prostudyApp").controller(
		"homeCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $location, objectFactory, appEndpointSF,
				tableTestDataFactory, $timeout, $interval) {
			$scope.loginCheck();
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Customer Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.loadCustomerList = function() {
				console.log("loadCustomerList");
				gapi.client.customerservice.getAllCustomers().execute(
						function(resp) {
							console.log(resp);
						});
			};

			$scope.addCustomer = function() {
				console.log("in side addCustomer");
				gapi.client.customerservice.addCustomer($scope.cust).execute(
						function(resp) {
							console.log("Add Customer Response: " + resp.msg);
							$scope.showSimpleToast();
							$scope.cust = $scope.newCustomer();

						})
			};// end of call to addCustomer

			$scope.newCustomer = function() {
				return {
					firstName : '',
					lastName : '',
					mobileNo : '',
					email : '',
					address : {
						line1 : '',
						line2 : '',
						city : '',
						state : '',
						pin : '',
					}
				};
			}

			$scope.cust = $scope.newCustomer();

			// initialize local objects
			$scope.customer = $scope.newCustomer();
			$scope.customerList = {};

			$scope.myDate = new Date();

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('X Saved!').position(
						"top").hideDelay(3000));
			};

			$scope.showDateValue = function() {
				console.log("in side showDateValue");
				$log.debug("$scope.myDate:" + $scope.myDate);

			};// end of call to addCustomer

		});
