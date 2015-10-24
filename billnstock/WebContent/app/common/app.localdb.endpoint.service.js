angular.module("stockApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $q, $timeout, $localStorage) {

	var serviceFactory = {};

	// Add Customer Service
	var CustomerService = {};

	serviceFactory.getCustomerService = function() {
		return CustomerService;
	}

	CustomerService.addCustomer = function(cust) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addCustomer...");
			var custList = angular.fromJson($localStorage.dbCustomers);
			if (typeof custList === 'undefined')
				custList = [];
			custList.push(cust);
			$localStorage.dbCustomers = angular.toJson(custList);
			deferred.resolve({
				"msg" : "Customer Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	CustomerService.getAllCustomers = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getCustomers...");
			var custList = angular.fromJson($localStorage.dbCustomers);
			if (typeof custList === 'undefined')
				custList = [];
			deferred.resolve(custList);
		}, 1000);

		return deferred.promise;

	} // End of CustomerService

	// Start of StockService
	var StockService = {};

	serviceFactory.getStockService = function() {
		return StockService;
	}

	StockService.addStock = function(stockItem) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStock...");
			var stockList = angular.fromJson($localStorage.dbStocks);
			if (typeof stockList === 'undefined')
				stockList = [];
			stockList.push(stockItem);
			$localStorage.dbStocks = angular.toJson(stockList);
			deferred.resolve({
				"msg" : "StockItem Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	StockService.getAllStock = function() {
		var deferred = $q.defer();
		$timeout(function() {
			var stockList = angular.fromJson($localStorage.dbStocks);
			if (typeof stockList === 'undefined')
				stockList = [];
			deferred.resolve(stockList);		

		}, 1000);

		return deferred.promise;
	} // End of StockService

	return serviceFactory;
}
