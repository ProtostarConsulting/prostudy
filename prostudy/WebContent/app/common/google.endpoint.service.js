angular.module("prostudyApp").factory('appEndpointSF', appEndpointSFFn);

function appEndpointSFFn($log, localDBServiceFactory) {
	//When app is in test mode, it will return service from local db store. Else actual google end points.
	var isTestMode = true;
	//var isTestMode = false;
	
	var endpointFactory = {};
	endpointFactory.is_service_ready = false;
	// This will call the function to load services

	endpointFactory.getStudentService = function() {
		if(isTestMode)
			return localDBServiceFactory.getStudentService();
		else	
			return gapi.client.StudentService;
	};
	
	endpointFactory.getInstituteService = function() {
		if(isTestMode)
			return localDBServiceFactory.getInstituteService();
		else	
			return gapi.client.InstituteService;
	};
	
	endpointFactory.getExamService = function() {
		return gapi.client.examService;
	};
	
	

	endpointFactory.getQuestionService = function() {
		$log.debug("###Inside getQuestionService");		
		return gapi.client.questionService;
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

		/*gapi.client.load('examService', 'v0.1', function() {
			$log.debug("exameService Loaded....");
			// $scope.addTaxToDB();
		}, apiRoot);

		gapi.client.load('questionService', 'v0.1', function() {
			$log.debug("questionService Loaded....");
			endpointFactory.is_service_ready = true;
			deferred.resolve();

		}, apiRoot);*/
		
		return deferred.promise;

	};

	return endpointFactory;
}
