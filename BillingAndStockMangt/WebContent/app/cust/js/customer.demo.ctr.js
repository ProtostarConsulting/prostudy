function init() {
	// alert("Inside init");
	window.initGAPI(); // Calls the init function defined on the window

}

app = angular.module("customerApp", [ 'ngMaterial', 'ngMessages' ]);
app.controller("customerCtr", [
		'$scope',
		'$window',
		function($scope, $window) {

			 $scope.isOpen = false;
		      $scope.demo = {
		        isOpen: false,
		        count: 0,
		        selectedAlignment: 'md-left'
		      };
		      
			$scope.user = {
				name : 'John Doe',
				email : '',
				phone : '',
				address : 'Mountain View, CA'
			};
			$scope.loadCustomerList = function() {
				alert("loadCustomerList");
				gapi.client.customerService.getAllCustomers().execute(
						function(resp) {
							console.log(resp);
						});
			};

			$scope.addCustomer = function() {

				gapi.client.customerService.addCustomer($scope.customer)
						.execute(function(resp) {
							console.log(resp.token);

						})
			};// end of call to addCustomer

			$scope.newCustomer = function() {
				return {
					firstName : "",
					lastName : "",
					mobileNo : ""
				};
			}

			$window.initGAPI = function() {
				console.log("Came to initGAPI");
				// $scope.$apply($scope.loadCustomService);

			};

			$scope.loadCustomService = function() {
				// alert("Inside window.loadCustomServices");
				var apiRoot = '//' + window.location.host + '/_ah/api';

				// Loads the OAuth and helloworld APIs
				// asynchronously, and
				// triggers login
				// when they have completed.
				var apisToLoad;

				apisToLoad = 1; // must match number of calls to
				// gapi.client.load()

				gapi.client.load('customerService', 'v0.1', function() {
					$scope.is_backend_ready = true;
					$scope.loadCustomerList

				}, apiRoot);

			};

			// initialize local objects
			$scope.customer = $scope.newCustomer();
			$scope.customerList = {};

		} ]);

app
		.controller(
				'DemoCtrl',
				function($scope) {
					$scope.user = {
						title : 'Developer',
						email : 'ipsum@lorem.com',
						firstName : '',
						lastName : '',
						company : 'Google',
						address : '1600 Amphitheatre Pkwy',
						city : 'Mountain View',
						state : 'CA',
						biography : 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
						postalCode : '94043'
					};
				}).config(
				function($mdThemingProvider) {
					// Configure a dark theme with primary foreground yellow
					$mdThemingProvider.theme('docs-dark', 'default')
							.primaryPalette('yellow').dark();
				});