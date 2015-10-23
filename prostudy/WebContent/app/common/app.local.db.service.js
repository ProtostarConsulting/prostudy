angular.module("prostudyApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $localStorage) {

	var serviceFactory = {};

	// Add Student Service
	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {
		var existinStuds = angular.fromJson($localStorage.dbStudents);
		existinStuds.push(stud);
		$localStorage.dbStudents = angular.toJson(existinStuds);
		return existinStuds;
	}

	StudentService.getStudents = function() {
		return angular.fromJson($localStorage.dbStudents);
	} // End of StudentService

	// Start of InstituteService
	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(inst) {
		var existinInst = angular.fromJson($localStorage.dbInstitutes);
		if(typeof existinInst === 'undefined')
			existinInst = [];
		existinInst.push(inst);
		$localStorage.dbInstitutes = angular.toJson(existinInst);
		return existinInst;
	}

	InstituteService.getInstitutes = function() {
		var existinInst = angular.fromJson($localStorage.dbInstitutes);
		if(typeof existinInst === 'undefined')
			existinInst = [];
		return existinInst;
	} // End of InstituteService

	// Add Exam Service

	serviceFactory.getExamService = function() {
		return null;
	}

	return serviceFactory;
}
