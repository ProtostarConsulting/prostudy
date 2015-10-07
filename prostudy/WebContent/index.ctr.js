/*function init() {
	// alert("Inside init");
	console.log("###Inside init###");
	window.initGAPI(); // Calls the init function defined on the window
}*/


angular.module("prostudyApp").controller(
		"indexCtr",
		function($scope, $window, $q, $timeout, $mdToast, $mdBottomSheet, appEndpointSF) {
			console.log("Inside indexCtr");

							console.log("Inside indexCtr");

							$scope.showSimpleToast = function() {
								$mdToast.show($mdToast.simple().content(
										'Customer Saved!').position("top")
										.hideDelay(3000));
						};


			// $window.initGAPI = function() {}
			$scope.initGAPI = function() {
				console.log("Came to initGAPI");
				// This will load all server side end points
				// $scope.loadAppGoogleServices();
				$timeout(function() {
					appEndpointSF.loadAppGoogleServices($q.defer()).then(
							function() {
								console.log("Loaded All Services....");
							});
				}, 2000);
				

			};
			/*
			 * $scope.loadAppGoogleServices = function() {
			 * console.log("###Inside loadAppGoogleServices###"); var apiRoot =
			 * '//' + window.location.host + '/_ah/api';
			 * 
			 * var apisToLoad;
			 * 
			 * apisToLoad = 1; // must match number of calls to //
			 * gapi.client.load()
			 * 
			 * gapi.client.load('examService', 'v0.1', function() {
			 * console.log("exameService Loaded...."); // $scope.addTaxToDB(); },
			 * apiRoot);
			 * 
			 * gapi.client.load('questionService', 'v0.1', function() {
			 * console.log("questionService Loaded....");
			 * $scope.is_backend_ready = true;
			 *  }, apiRoot);
			 *  };
			 */

			$scope.openBottomSheet = function() {
				$mdBottomSheet.show({
					template : '<md-bottom-sheet>Hello!</md-bottom-sheet>'
				});
			};

			// initialize local objects
		/*	$scope.customer = $scope.newCustomer();
			$scope.customerList = {};*/
			$scope.initGAPI();

		}).controller('AppCtrl',
		function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
			$scope.toggleLeft = buildToggler('left');
			// $scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
				return debounceFn;
			}
		}).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function() {
		$mdSidenav('left').close().then(function() {
			$log.debug("close LEFT is done");
		});
	};
});