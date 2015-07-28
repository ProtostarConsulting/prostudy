function init() {
	alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

app = angular.module("customerApp", [ 'ngMaterial', 'ngMessages' ]);
app.controller("customerCtr", [
		'$scope',
		'$window',
		function($scope, $window) {

			$scope.loadVendor = function() {
				console.log("loadCustomerList");
				gapi.client.vendorservice.getAllVendors().execute(
						function(resp) {
							console.log(resp);
						});
			};

			$scope.addVendor = function() {
				console.log("in side addVendor");
				gapi.client.vendorservice.saveVendor($scope.vend)
						.execute(function(resp) {
							console.log("Add Vendor Response: " + resp.msg);

						})
			};// end of call to addCustomer

			$scope.newVendor = function() {
				return {
					vendorName : '',
					mobileNo : '',
					emailid : '',
					city : '',
					pin :'',
				};
			}

			$scope.vend = $scope.newVendor();

			$window.initGAPI = function() {
				alert("inside initGAPI");
				console.log("Came to initGAPI");
				$scope.$apply($scope.loadCustomService);
				//$scope.loadCustomService(); 
				
				//temp. Loading customer list here
				//$scope.loadVendorList();

			};

			$scope.loadCustomService = function() {
				console.log("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()

				gapi.client.load('vendorservice', 'v0.1', function() {
					alert("Inside vendorservice");
					$scope.is_backend_ready = true;
					$scope.loadVendor();

				}, apiRoot);

			};

			// initialize local objects

			$scope.vendor = $scope.newVendor();
			$scope.vendorList = {};

		} ]);
