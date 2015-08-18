angular.module("customerApp").controller("customerCtr", function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil, $log) {
			console.log("Inside customerCtr");
			//console.log("Via Serice:" + customerservice.addCustomer());
			$scope.showSimpleToast = function() {
			    $mdToast.show(
			      $mdToast.simple()
			        .content('Customer Saved!')
			        .position("top")
			        .hideDelay(3000)
			    );
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
				gapi.client.customerservice.addCustomer($scope.cust)
						.execute(function(resp) {
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
						state: '',
						pin : '',	
					}
				};
			}

			$scope.cust = $scope.newCustomer();
			
			/*Setup menu*/
			$scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation
			 * finishes report completion in console
			 */
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