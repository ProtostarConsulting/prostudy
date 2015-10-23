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

	// Start of InstituteService
	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(inst) {
		var existinInst = angular.fromJson($localStorage.dbInstitutes);
		if (typeof existinInst === 'undefined')
			existinInst = [];
		existinInst.push(inst);
		$localStorage.dbInstitutes = angular.toJson(existinInst);
		return existinInst;
	}

	InstituteService.getInstitutes = function() {
		var existinInst = angular.fromJson($localStorage.dbInstitutes);
		if (typeof existinInst === 'undefined')
			existinInst = [];
		return existinInst;
	} // End of InstituteService

	// Add Exam Service

	serviceFactory.getExamService = function() {
		return null;
	}

	return serviceFactory;
}
