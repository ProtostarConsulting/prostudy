angular.module("stockApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q) {

	var serviceFactory = {};
	// Add Customer Service

	var InternetService = {};

	serviceFactory.getInternetService = function() {
		return InternetService;
	}

	InternetService.addInternet = function(internet) {
		var deferred = $q.defer();
		gapi.client.internetService.addInternet(internet).execute(
				function(resp) {
					$log.debug("addInternet##Resp## at enpoint:", +resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	InternetService.getAllInternet = function() {
		var deferred = $q.defer();
		gapi.client.internetService.getAllInternet().execute(function(resp) {
			$log.debug("getAllInternet#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	InternetService.searchRecord = function(plan) {
		var deferred = $q.defer();
		gapi.client.internetService.searchRecord({
			'plan' : plan
		}).execute(function(resp) {
			$log.debug("searchRecord at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}// End of CustomerService

	InternetService.searchByCost = function(cost) {
		var deferred = $q.defer();
		gapi.client.internetService.searchByCost({
			'cost' : cost
		}).execute(function(resp) {
			$log.debug("searchRecord By Cost at enpoint" + resp);
			deffered.resolve(resp);
		})
		return deferred.promise;
	}
	// =====================================================================================================================================
	// Add Customer Service
	var CustomerService = {};

	serviceFactory.getCustomerService = function() {
		return CustomerService;
	}

	CustomerService.addCustomer = function(cust) {
		var deferred = $q.defer();
		gapi.client.customerService.addCustomer(cust).execute(function(resp) {
			$log.debug("addCustomer#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	CustomerService.getAllCustomers = function() {
		var deferred = $q.defer();
		gapi.client.customerService.getAllCustomers().execute(function(resp) {
			$log.debug("getAllCustomers#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	CustomerService.searchCustomerByName = function(customerName) {
		var deferred = $q.defer();
		gapi.client.customerService.searchCustomerByName({
			"customerName" : customerName
		}).execute(function(resp) {
			$log.debug("getCustomerByID at enpoint" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	CustomerService.getCustomerByID = function(customerId) {
		var deferred = $q.defer();
		gapi.client.customerService.getCustomerByID({
			"customerId" : customerId
		}).execute(function(resp) {
			$log.debug("getCustomerByID at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}// End of CustomerService

	/* =============================================================================================================================== */
	// Start of StockService
	var StockService = {};

	serviceFactory.getStockService = function() {
		return StockService;
	}

	StockService.addStock = function(stock) {
		var deferred = $q.defer();
		gapi.client.stockService.addStock(stock).execute(function(resp) {
			$log.debug("addStock#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	StockService.getAllStock = function() {
		var deferred = $q.defer();
		gapi.client.stockService.getAllStock().execute(function(resp) {
			$log.debug("getAllStock#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} // End of StockService

	StockService.updateStock = function(updateStock) {
		var deferred = $q.defer();
		gapi.client.stockService.updateStock(updateStock).execute(
				function(resp) {
					$log.debug("updateStock#resp at enpoint:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	/* =============================================================================================================================== */

	// Start of StockService
	var TaxService = {};

	serviceFactory.getTaxService = function() {
		return TaxService;
	}

	TaxService.addTax = function(tax) {
		var deferred = $q.defer();
		gapi.client.taxService.addTax(tax).execute(function(resp) {
			$log.debug("addTax#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	TaxService.getAllTaxes = function() {
		var deferred = $q.defer();
		gapi.client.taxService.getAllTaxes().execute(function(resp) {
			$log.debug("getAllTaxes#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	TaxService.updateTax = function(tax) {
		var deferred = $q.defer();
		gapi.client.taxService.updateTax(tax).execute(function(resp) {
			$log.debug("updateTax#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	// End of TaxService

	/* =============================================================================================================================== */

	// Start of StockService
	var InvoiceService = {};

	serviceFactory.getInvoiceService = function() {
		return InvoiceService;
	}

	InvoiceService.addInvoice = function(invoice) {
		var deferred = $q.defer();
		gapi.client.invoiceService.addInvoice(invoice).execute(function(resp) {
			$log.debug("addInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	InvoiceService.getAllInvoice = function() {
		var deferred = $q.defer();
		gapi.client.invoiceService.getAllInvoice().execute(function(resp) {
			$log.debug("getAllInvoice#resp at enpoint:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	InvoiceService.getinvoiceByID = function(selectedBillNo) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getinvoiceByID({
			"invoiceId" : selectedBillNo
		}).execute(function(resp) {
			$log.debug("getinvoiceByID at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	InvoiceService.getAllInvoiceByCustId = function(CustomerId) {
		var deferred = $q.defer();
		gapi.client.invoiceService.getAllInvoiceByCustId({
			"selectedCustomerId" : CustomerId
		}).execute(function(resp) {
			$log.debug("getAllInvoiceByCustId at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}// End of StockService

	/* =============================================================================================================================== */

	// Start of SalesOrderService
	var SalesOrderService = {};

	serviceFactory.getSalesOrderService = function() {
		return SalesOrderService;
	}

	SalesOrderService.addSalesOrder = function(salesOrder) {
		var deferred = $q.defer();
		gapi.client.salesOrderService.addSalesOrder(salesOrder).execute(
				function(resp) {
					$log.debug("addSalesOrder#resp at enpoint:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	SalesOrderService.getAllSalesOrder = function() {
		var deferred = $q.defer();
		gapi.client.salesOrderService.getAllSalesOrder().execute(
				function(resp) {
					$log.debug("getAllSalesOrder#resp at enpoint:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}

	SalesOrderService.getSOByID = function(SOByID) {
		var deferred = $q.defer();
		gapi.client.salesOrderService.getSOByID({
			"SOByID" : SOByID
		}).execute(function(resp) {
			$log.debug("getSOByID  at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	/* =============================================================================================================================== */

	// Start of SalesOrderService
	var PurchaseOrderOrderService = {};

	serviceFactory.getPurchaseOrderOrderService = function() {
		return PurchaseOrderOrderService;
	}
	
	PurchaseOrderOrderService.addPurchaseOrder = function(purchaseOrder) {
		var deferred = $q.defer();
		gapi.client.purchaseOrderService.addPurchaseOrder(purchaseOrder).execute(function(resp) {
			$log.debug("addPurchaseOrder at enpoint:" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	PurchaseOrderOrderService.getAllPurchaseOrder = function(){
		var deferred = $q.defer();
		
		gapi.client.purchaseOrderService.getAllPurchaseOrder().execute(function(resp){
			$log.debug("getAllPurchaseOrder at enpoint:" + resp)
			deferred.resolve(resp.items)
		});
		return deferred.promise;
	}
	
	PurchaseOrderOrderService.getPOByID = function(purchaseOrderId){
		var deferred = $q.defer();
		
		gapi.client.purchaseOrderService.getPOByID("purchaseOrderId" , purchaseOrderId).execute(function(resp){
			$log.debug("getPOByID  at enpoint" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	return serviceFactory;
}
