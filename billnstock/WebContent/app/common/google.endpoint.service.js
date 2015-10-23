angular.module("stockApp").factory('appEndpointSF', appEndpointSFFn);

function appEndpointSFFn($log, localDBServiceFactory) {
	
	// When app is in test mode, it will return service from local db store.
	// Else actual google end points.
	var isTestMode = true;
	
	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services

	endpointFactory.getCustomerService = function() {
		if(isTestMode)
			return localDBServiceFactory.getCustomerService();
		else	
		    return gapi.client.customerService;
	};


	endpointFactory.getStockService = function() {
		if(isTestMode)
			return localDBServiceFactory.getStockService();
		else	
		     return gapi.client.stockService;
	};

	endpointFactory.getTaxService = function() {
		if(isTestMode)
			return localDBServiceFactory.getTaxService();
		else	
		     return gapi.client.taxService;
	};
	endpointFactory.loadAppGoogleServices = function(deferred) {
		$log.debug("###Inside Google appEndpointSF.loadAppGoogleServices###");

		if (endpointFactory.is_service_ready) {
			$log.debug("Already Initialized returning back...");
			deferred.resolve();			
			return deferred.promise;
		}

		var apiRoot = '//' + window.location.host + '/_ah/api';

		var apisToLoad;

		apisToLoad = 2; // must match number of calls to
		// gapi.client.load()


		gapi.client.load('customerservice', 'v0.1', function() {
			console.log("customerservice Loaded....");

			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);


		gapi.client.load('stockService', 'v0.1', function() {
			console.log("stockService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('taxService', 'v0.1', function() {
			console.log("taxService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);

		return deferred.promise;
	};	


	return endpointFactory;
}
