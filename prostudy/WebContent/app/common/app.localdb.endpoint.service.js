angular.module("prostudyApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $q, $timeout, $localStorage) {

	var serviceFactory = {};

	// Add Student Service
	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var studList = angular.fromJson($localStorage.dbStudents);
			if (typeof studList === 'undefined')
				studList = [];
			studList.push(stud);
			$localStorage.dbStudents = angular.toJson(studList);
			deferred.resolve({
				"msg" : "Student Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	StudentService.getStudents = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var studList = angular.fromJson($localStorage.dbStudents);
			if (typeof studList === 'undefined')
				studList = [];
			deferred.resolve(studList);
		}, 1000);

		return deferred.promise;

	} // End of StudentService

	// start of InstituteService
	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(insti) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var studList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			instituteList.push(insti);
			$localStorage.dbInstitutes = angular.toJson(instituteList);
			deferred.resolve({
				"msg" : "Student Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	InstituteService.getInstitutes = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			deferred.resolve(instituteList);
		}, 1000);

		return deferred.promise;

	} // End of InstituteService
	
	//start of question_add service
	
	var QuestionAddService = {};

	serviceFactory.getQuestionAddService = function() {
		return QuestionAddService;
	}

	QuestionAddService.addQuestion = function(ques) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];
			questionList.push(ques);
			$localStorage.dbQuestion = angular.toJson(questionList);
			deferred.resolve({
				"msg" : "Question Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	QuestionAddService.getQuestion = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];
			deferred.resolve(questionList);
		}, 1000);

		return deferred.promise;

	}
	//end of question_add service
	
	// Add Exam Service

	serviceFactory.getExamService = function() {
		return null;
	}

	return serviceFactory;
}
