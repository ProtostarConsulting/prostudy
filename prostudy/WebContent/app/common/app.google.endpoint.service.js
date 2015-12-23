angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q,$localStorage) {

	var serviceFactory = {};
	
	// start of ChapterService
	

	var ChapterService = {};

	serviceFactory.getChapterService = function() {
		return ChapterService;
	}

	ChapterService.addChapter = function(chapter) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.chapterService.addChapter(chapter).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("ChapterService#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}//end of addChapter
	

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		gapi.client.chapterService.getAllChapter().execute(
				function(resp) {
					$log.debug("getChapters#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}  // End of ChapterService
	
	
	// start of BookService
	
	var BookService = {};

	serviceFactory.getBookService = function() {
		return BookService;
	}

	BookService.addBook = function(book) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.BookService.addBook(book).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("BookService#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}//end of addBook
	
	BookService.getBooks = function() {
		var deferred = $q.defer();
		gapi.client.BookService.getBooks().execute(
				function(resp) {
					$log.debug("getBooks#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}  // End of BookService
	
// start of UserService
	
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.UserService.addUser(user).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("UserService#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}//end of addUser
	
	UserService.getUsers = function() {
		var deferred = $q.defer();
		gapi.client.UserService.getUsers().execute(
				function(resp) {
					$log.debug("getUsers#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}  // End of getUsers
	
	UserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}//end of getLoggedinUser

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
