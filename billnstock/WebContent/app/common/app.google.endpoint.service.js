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

	StockService.addStock = function(stock) {
		var deferred = $q.defer();
		gapi.client.stockService.addStock(stock).execute(
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

	// Start of StockService
	var TaxService = {};

	serviceFactory.getTaxService = function() {
		return TaxService;
	}

	TaxService.addTax = function(tax) {
		var deferred = $q.defer();
		gapi.client.stockService.addTax(tax).execute(
				function(resp) {
					$log.debug("addTax#resp:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	TaxService.getAllTaxes = function() {
		var deferred = $q.defer();
		gapi.client.taxService.getAllTaxes().execute(
				function(resp) {
					$log.debug("getAllTaxes#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} // End of StockService

	
	return serviceFactory;
}
