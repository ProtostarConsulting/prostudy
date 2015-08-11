function init() {
	//alert("Inside init");
	console.log("###Inside init###");
	window.initGAPI(); // Calls the init function defined on the window
}

app = angular.module("customerApp", [ 'ngMaterial', 'ngMessages' ]);
app.controller("customerCtr", [
		'$scope',
		'$window',
		function($scope, $window) {
			console.log("Inside Ctr");
			//alert("Inside Ctr");
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

			$window.initGAPI = function() {
				console.log("Came to initGAPI");
				//alert("Came to initGAPI");
				$scope.$apply($scope.loadCustomService);
				//$scope.loadCustomService(); 
				
				//temp. Loading customer list here
				//$scope.loadCustomerList();

			};

			$scope.loadCustomService = function() {
				console.log("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()

				gapi.client.load('customerservice', 'v0.1', function() {
					$scope.is_backend_ready = true;
					$scope.loadCustomerList();

				}, apiRoot);

			};

			// initialize local objects
			$scope.customer = $scope.newCustomer();
			$scope.customerList = {};

		} ]);
