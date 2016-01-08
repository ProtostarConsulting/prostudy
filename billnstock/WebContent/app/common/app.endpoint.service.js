angular.module("stockApp").factory('appEndpointSF', appEndpointSFFn);

function appEndpointSFFn($log, localDBServiceFactory, googleEndpointSF) {

	// When app is in test mode, it will return service from local db store.
	// Else actual google end points.
//	var isTestMode = true;
	var isTestMode = false;

	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services

	endpointFactory.getCustomerService = function() {
		if (isTestMode)
			return localDBServiceFactory.getCustomerService();
		else
			return googleEndpointSF.getCustomerService();
	};
	// ----------------------------------------------------
	endpointFactory.gethrService = function() {
		if (isTestMode)
			return localDBServiceFactory.gethrService();
		else
			return googleEndpointSF.gethrService();
	};
	// ----------------------------------------------------
	endpointFactory.getleadService=function(){
		if (isTestMode)
			return localDBServiceFactory.getleadService();
		else
			return googleEndpointSF.getleadService();
	}

	//-----------------------------------------------------

	endpointFactory.getopportunityService=function(){
		if (isTestMode)
			return localDBServiceFactory.getopportunityService();
		else
			return googleEndpointSF.getopportunityService();
	}

	//-----------------------------------------------------
	endpointFactory.getsetupService=function(){
		if (isTestMode)
			return localDBServiceFactory.getsetupService();
		else
			return googleEndpointSF.getsetupService();
	}

	//-----------------------------------------------------

	endpointFactory.getStockService = function() {
		if (isTestMode)
			return localDBServiceFactory.getStockService();
		else
			return googleEndpointSF.getStockService();
	};
	// ----------------------------------------------------
	endpointFactory.getTaxService = function() {
		if (isTestMode)
			return localDBServiceFactory.getTaxService();
		else
			return googleEndpointSF.getTaxService();
	};
	// ----------------------------------------------------
	endpointFactory.getInvoiceService = function() {
		if (isTestMode)
			return localDBServiceFactory.getInvoiceService();
		else
			return googleEndpointSF.getInvoiceService();
	};
	// ----------------------------------------------------
	
	endpointFactory.getInternetService = function() {
		if (isTestMode)
			return localDBServiceFactory.getInternetService();
		else
			return googleEndpointSF.getInternetService();
	};
	// ----------------------------------------------------
	endpointFactory.getSalesOrderService = function() {
		if (isTestMode)
			return localDBServiceFactory.getSalesOrderService();
		else
			return googleEndpointSF.getSalesOrderService();
	};
	// ----------------------------------------------------
	endpointFactory.getPurchaseOrderOrderService = function() {
		if (isTestMode)
			return localDBServiceFactory.getPurchaseOrderOrderService();
		else
			return googleEndpointSF.getPurchaseOrderOrderService();
	};
	// ----------------------------------------------------

	endpointFactory.loadAppGoogleServices = function(deferred) {
		$log.debug("###Inside Google appEndpointSF.loadAppGoogleServices###");

		if (isTestMode) {
			$log.debug("isTestMode: " + isTestMode);
			deferred.resolve();
			return deferred.promise;
		}

		if (endpointFactory.is_service_ready) {
			$log.debug("Already Initialized returning back...");
			deferred.resolve();
			return deferred.promise;
		}

		var apiRoot = '//' + window.location.host + '/_ah/api';

		var apisToLoad;

		apisToLoad = 4; // must match number of calls to
		// gapi.client.load()

		gapi.client.load('customerService', 'v0.1', function() {
			$log.debug("customerService Loaded....");

			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('stockService', 'v0.1', function() {
			$log.debug("stockService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('taxService', 'v0.1', function() {
			$log.debug("taxService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		gapi.client.load('invoiceService', 'v0.1', function() {
			$log.debug("invoiceService Loaded....");
			
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('internetService', 'v0.1', function() {
			$log.debug("internetService Loaded....");
			
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('salesOrderService', 'v0.1', function() {
			$log.debug("salesOrderService Loaded....");
			
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('purchaseOrderService', 'v0.1', function() {
			$log.debug("purchaseOrderService Loaded....");
			
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		return deferred.promise;
	};

	return endpointFactory;
}
