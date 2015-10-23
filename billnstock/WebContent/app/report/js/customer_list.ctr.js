app = angular.module("stockApp");

app.controller("reportCtr", function($scope, $window, $mdToast, $timeout,
		$mdSidenav, $mdUtil, $log) {

	$scope.selected = [];
	
	$scope.getAllCustomers = function() {
		console.log("In loadGetCustomerList");
		gapi.client.stockcustomerservice.getAllCustomers().execute(
				function(resp) {
					console.log(resp.items);
					// $scope.items =
					// resp.items;
					$scope.$apply();

					$scope.customerDataActual = resp.items;
					$scope.$apply();
					console.log("Response" + $scope.customerDataActual);

					$scope.query = {
						filter : '',
						order : 'cust_id',
						limit : 5,
						page : 1
					};

					// $scope.customerData = $scope.customerDataActual;

					$scope.customers = $scope.customerDataActual.slice(0, 5);

					$scope.onOrderChange = function(order) {
						console.log(order);
						console.log($scope.query);
						var order = order.startsWith("-");
						// $scope.desserts = sortBy($scope.desserts, order);
						$scope.customerData = $scope.customerData
								.sort(order ? compareByColDesc
										: compareByColAsc);
						console.log($scope.customerData);

					};

					$scope.onPaginationChange = function(page, limit) {
						console.log("limit" + limit);
						console.log("page" + page);
						var from = (page == 1) ? 0 : (page * limit - limit);
						var till = page * limit;
						$scope.customerData = $scope.customerDataActual.slice(
								from, till);
					};
				});
	};// end of GetStockList

	$window.initGAPI = function() {
		console.log("Came to initGAPI");
		$scope.$apply($scope.loadCustomService);

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

		gapi.client.load('stockcustomerservice', 'v0.1', function() {
			console.log("Inside gapi.client.load");
			$scope.is_backend_ready = true;
			$scope.getAllCustomers();

		}, apiRoot);

	};

	/* Setup menu */
	$scope.toggleRight = buildToggler('right');
	/**
	 * Build handler to open/close a SideNav; when animation finishes report
	 * completion in console
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

});
