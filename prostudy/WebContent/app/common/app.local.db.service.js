angular.module("prostudyApp").factory('localDBServiceFactory', localDBServiceFactory);

function localDBServiceFactory($log, $localStorage) {

	var serviceFactory = {};
	
	
	// Add Student Service
	var StudentService = {};
	
	serviceFactory.getStudentService = function(){
		return StudentService;
	}
	
	
	StudentService.addStudent = function(stud){
		var existinStuds = angular.fromJson($localStorage.dbStudents);
		existinStuds.push(stud);
		$localStorage.dbStudents = angular.toJson(existinStuds);
		return existinStuds;
	}
	
	StudentService.getStudents = function(){
		return angular.fromJson($localStorage.dbStudents);
	}
	
	// Add Exam Service 

	serviceFactory.getExamService = function(){
		return null;
	}

	return serviceFactory;
}
