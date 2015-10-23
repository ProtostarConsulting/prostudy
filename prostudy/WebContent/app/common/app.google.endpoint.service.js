angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSFFunc);

function googleEndpointSFFunc($log, $q) {

	var serviceFactory = {};

	// Add Student Service
	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {
		var deferred = $q.defer();
		gapi.client.studentService.addStudent(stud).execute(
				function(resp) {
					$log.debug("addStudent#resp:" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	StudentService.getStudents = function() {
		var deferred = $q.defer();
		gapi.client.studentService.getStudents().execute(
				function(resp) {
					$log.debug("addStudent#resp:" + resp);
					deferred.resolve(resp.items);
				});
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
