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
			cust.customerId = custList.length + 1;
			custList.push(cust);
			$localStorage.dbCustomers = angular.toJson(custList);
			deferred.resolve({
				"msg" : "Customer Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	CustomerService.getCustomerByID = function(selectedCustomerId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
		
			var custList = angular.fromJson($localStorage.dbCustomers);

			if (typeof custList === 'undefined')
				custList = [];

			for (i = 0; i < custList.length; i++) {
				if (selectedCustomerId == custList[i].customerId) {

					// selectedBillNo = invoiceList[i];
					tempItem.push(custList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
			
/*			var tempInvoice = [];
			var custInvoiveList = angular.fromJson($localStorage.dbinvoice);
			custInvoiveList = [];
			
			for (i = 0; i < custInvoiveList.length; i++) {
				if (selectedCustomerId == custInvoiveList[i].customerId) {

					// selectedBillNo = invoiceList[i];
					tempInvoice.push(custInvoiveList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
		*/	
			deferred.resolve(tempItem);

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

	StockService.addStock = function(stock) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStock...");
			var stockList = angular.fromJson($localStorage.dbStocks);
			if (typeof stockList === 'undefined')
				stockList = [];
			stockList.push(stock);
			$localStorage.dbStocks = angular.toJson(stockList);
			deferred.resolve({
				"msg" : "StockItem Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	StockService.updateStock = function(invoiceObj) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB updateStock...");
			var stockList = angular.fromJson($localStorage.dbStocks);

			if (typeof stockList === 'undefined')
				stockList = [];

			 for(var i=0;i<stockList.length;i++)
			   { 
			    if(invoiceObj.invoiceLineItemList.itemName==stockList[i].itemName)
			    	stockList[i] = invoiceObj;
			   }
			 
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

	// Start of StockService
	var TaxService = {};

	serviceFactory.getTaxService = function() {
		return TaxService;
	}

	TaxService.addTax = function(tax) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addTax...");
			var taxList = angular.fromJson($localStorage.dbTaxes);
			if (typeof taxList === 'undefined')
				taxList = [];
			taxList.push(tax);
			$localStorage.dbTaxes = angular.toJson(taxList);
			deferred.resolve({
				"msg" : "Tax Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	TaxService.getAllTaxes = function() {
		var deferred = $q.defer();
		$timeout(function() {
			var taxList = angular.fromJson($localStorage.dbTaxes);
			if (typeof taxList === 'undefined')
				taxList = [];
			deferred.resolve(taxList);

		}, 1000);

		return deferred.promise;
	} // End of TaxService

	// Start of StockService
	var InvoiceService = {};

	serviceFactory.getInvoiceService = function() {
		return InvoiceService;
	}

	InvoiceService.addInvoice = function(invoice) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addInvoice...");
			var invoiceList = angular.fromJson($localStorage.dbinvoice);

			if (typeof invoiceList === 'undefined')
				invoiceList = [];

			invoice.invoiceId = invoiceList.length + 100;

			invoiceList.push(invoice);
			$localStorage.dbinvoice = angular.toJson(invoiceList);


/*			var stockList = angular.fromJson($localStorage.dbStocks);		
			for(i=0;i<=invoice.invoiceLineItemList.length;i++)
				{
				if (invoice.invoiceLineItemList[i].itemName == stockList.itemName) {
					stockList.qty = stockList.qty - invoice.invoiceLineItemList[i].qty;
				}
				}
			
*/
/*			 for(var i=0;i<stockList.length;i++)
			   { 
			    if(invoice.invoiceLineItemList.itemName==stockList[i].itemName)
			    	stockList[i] = invoice;
			   }
*/			 
//			$localStorage.dbStocks = angular.toJson(stockList);
			deferred.resolve({
				"msg" : "StockItem Updated Successfully."
			});

			deferred.resolve({
				"msg" : "Invoice Added Successfully."

			});

		}, 1000);

		return deferred.promise;
	}

	InvoiceService.getAllInvoice = function(invoiceId) {
		var deferred = $q.defer();
		$timeout(function() {
			var invoiceList = angular.fromJson($localStorage.dbinvoice);
			if (typeof invoiceList === 'undefined')
				invoiceList = [];
			deferred.resolve(invoiceList);

		}, 1000);

		return deferred.promise;
	} // End of TaxService

	InvoiceService.getinvoiceByID = function(selectedBillNo) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempItem = [];
			var invoiceList = angular.fromJson($localStorage.dbinvoice);

			if (typeof invoiceList === 'undefined')
				invoiceList = [];

			for (i = 0; i < invoiceList.length; i++) {
				if (selectedBillNo == invoiceList[i].invoiceId) {

					// selectedBillNo = invoiceList[i];
					tempItem.push(invoiceList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
			deferred.resolve(tempItem);

		}, 1000);
		return deferred.promise;
	}

	
	InvoiceService.getAllInvoiceByCustId = function(selectedCustomerId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempInvoice = [];
			var custInvoiveList = angular.fromJson($localStorage.dbinvoice);

			if (typeof custInvoiveList === 'undefined')
				custInvoiveList = [];

			for (i = 0; i < custInvoiveList.length; i++) {
				if (selectedCustomerId == custInvoiveList[i].customerName.customerId) {

					// selectedBillNo = invoiceList[i];
					tempInvoice.push(custInvoiveList[i]);

					// $log.debug("TEMP===" + tempItem[i]);
				}
			}
			deferred.resolve(tempInvoice);

		}, 1000);
		return deferred.promise;
	}
	
	return serviceFactory;
}
