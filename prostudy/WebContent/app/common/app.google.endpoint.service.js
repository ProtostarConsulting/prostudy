angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSFFunc);

function googleEndpointSFFunc($log, $q) {

	var serviceFactory = {};

	// Add Student Service
	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.studentService.addStudent(stud).execute(
				function(resp) {
					$log.debug("No5");	
					$log.debug("addStudent#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
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
	
	
	// Add PracticeExam Service
	var PracticeExamService = {};

	serviceFactory.getPracticeExamService = function() {
		return PracticeExamService;
	}

	PracticeExamService.addPracticeExam = function(test) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.PracticeExamService.addPracticeExam(test).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("addPracticeExam#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}

	PracticeExamService.getPracticeExams = function() {
		var deferred = $q.defer();
		gapi.client.PracticeExamService.getPracticeExams().execute(
				function(resp) {
					$log.debug("addPracticeExam#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} // End of PracticeExamService
	
	
	
	
	
	// Add Syllabus Service
	var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syllabi) {
		$log
		.debug("No2");	
		var deferred = $q.defer();
		$log
		.debug("abc");
		gapi.client.SyllabusService.addSyllabus(syllabi).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("addSyllabus#resp:" + resp);
					deferred.resolve(resp);
				});
		$log
		.debug("No3");	
		return deferred.promise;
	}


	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		gapi.client.SyllabusService.getSyllabus().execute(
				function(resp) {
					$log.debug("addSyllabus#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} // End of SyllabusService

	

	
	
	// start of InstituteService
	

	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(insti) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.InstituteService.addInstitute(insti).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("addInstitute#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}

	InstituteService.getInstitutes = function() {
		var deferred = $q.defer();
		gapi.client.InstituteService.getInstitutes().execute(
				function(resp) {
					$log.debug("getInstitutes#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}  // End of InstituteService

	serviceFactory.getExamService = function() {
		return null;
	}

	return serviceFactory;
}
