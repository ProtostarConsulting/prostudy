angular.module("stockApp").factory('googleEndpointSF', googleEndpointSFFunc);

function googleEndpointSFFunc($log, $q) {

	var serviceFactory = {};

	// Add Customer Service
	var CustomerService = {};

	serviceFactory.getCustomerService = function() {
		return CustomerService;
	}

	CustomerService.addCustomer = function(cust) {
		var deferred = $q.defer();
		gapi.client.customerService.addCustomer(cust).execute(
				function(resp) {
					$log.debug("addCustomer#resp:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	CustomerService.getAllCustomers = function() {
		var deferred = $q.defer();
		gapi.client.customerService.getAllCustomers().execute(
				function(resp) {
					$log.debug("getAllCustomers#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} // End of CustomerService

	// Start of StockService
	var StockService = {};

	serviceFactory.getStockService = function() {
		return StockService;
	}

	StockService.addStock = function(stockItem) {
		var deferred = $q.defer();
		gapi.client.stockService.addStock(stockItem).execute(
				function(resp) {
					$log.debug("addStock#resp:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	StockService.getAllStock = function() {
		var deferred = $q.defer();
		gapi.client.stockService.getAllStock().execute(
				function(resp) {
					$log.debug("getAllStock#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} // End of StockService

	
	return serviceFactory;
}
