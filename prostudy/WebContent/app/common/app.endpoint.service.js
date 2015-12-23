angular.module("prostudyApp").factory('appEndpointSF', appEndpointSF);

function appEndpointSF($log, localDBServiceFactory, googleEndpointSF) {
	//When app is in test mode, it will return service from local db store. Else actual google end points.
  
	 //var isTestMode = true;
	var isTestMode = false;
	
	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services
	
	
	endpointFactory.getChapterService = function() 
	{
		if(isTestMode)
			return localDBServiceFactory.getChapterService();
		else	
			return googleEndpointSF.getChapterService();
	};//end of getChapterService
	
	endpointFactory.getBookService = function() 
	{
		if(isTestMode)
			return localDBServiceFactory.getBookService();
		else	
			return googleEndpointSF.getBookService();
	};//end of getBookService
	
	endpointFactory.getUserService = function() {

		if(isTestMode)
			return localDBServiceFactory.getUserService();
		else	
			return googleEndpointSF.getUserService();
	};//end of getUserService
	
	endpointFactory.getPracticeExamService = function() 
	{
		if(isTestMode)
			return localDBServiceFactory.getPracticeExamService();
		else	
			return googleEndpointSF.getPracticeExamService();
	};//end of getPracticeExamService
	


	endpointFactory.getStudentService = function() {
		if(isTestMode)
			return localDBServiceFactory.getStudentService();
		else	
			return googleEndpointSF.getStudentService();
	};
	
	endpointFactory.getInstituteService = function() {
		if(isTestMode)
			return localDBServiceFactory.getInstituteService();
		else	
			return googleEndpointSF.getInstituteService();
	};
	
	endpointFactory.getQuestionService = function() {
		if(isTestMode)
			return localDBServiceFactory.getQuestionService();
		else	
			return googleEndpointSF.getQuestionService();
	};
	
	endpointFactory.getSyllabusService = function() {
		if(isTestMode)
			return localDBServiceFactory.getSyllabusService();
		else	
			return googleEndpointSF.getSyllabusService();
	};

	endpointFactory.loadAppGoogleServices = function(deferred) {
		$log.debug("###Inside Google appEndpointSF.loadAppGoogleServices###");
		
		if(isTestMode) {
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

		apisToLoad = 2; // must match number of calls to

		gapi.client.load('chapterService', 'v0.1', function() {
			$log.debug("chapterService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		gapi.client.load('bookService', 'v0.1', function() {
			$log.debug("bookService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);
		
		return deferred.promise;

	};

	return endpointFactory;
}
