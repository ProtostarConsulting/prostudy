angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q,$localStorage,$timeout) {

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
					$log.debug("addChapter#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}//end of addChapter
	

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		gapi.client.chapterService.getAllChapters().execute(
				function(resp) {
					$log.debug("getAllChapters#resp :" + resp);
					deferred.resolve(resp.items);   //resp.items
				});
		return deferred.promise;
	}  // End of getChapters
	
	
	ChapterService.getChaptersByID = function(selectedChapterId) {
		var deferred = $q.defer();
		gapi.client.chapterService.getChaptersByID({'chapterId':selectedChapterId}).execute(
				function(resp) {
			
					$log.debug("getChaptersByID#resp:" +angular.toJson(resp));
					deferred.resolve(resp);
				});
		return deferred.promise;
	} // End of getChaptersByID
	
/*	ChapterService.getChapterById = function(selectedChapterId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempBookItem = [];
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];

			for (i = 0; i < chapterList.length; i++) {
				if (selectedChapterId == chapterList[i].id) {
					tempBookItem.push(chapterList[i]);
					$log.debug("TEMP=getChaptersByID==" + tempBookItem);
				}
			}
			deferred.resolve(tempBookItem);

		}, 1000);
		return deferred.promise;
	}//end of getChapterById
*/	
	
	// start of BookService
	
	var BookService = {};

	serviceFactory.getBookService = function() {
		return BookService;
	}

	BookService.addBook = function(book) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
			
		gapi.client.bookService.addBook(book).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("addBook#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}//end of addBook
	
	BookService.getBooks = function() {
		var deferred = $q.defer();
		gapi.client.bookService.getBooks().execute(
				function(resp) {
					$log.debug("getBooks#resp:" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}  // End of getBooks
	
	
	BookService.getBookbyID = function(selectedBookId) {
		var deferred = $q.defer();
		gapi.client.bookService.getBookbyID({'bookId':selectedBookId}).execute(
				function(resp) {
			
					$log.debug("getBookbyID#resp:" +angular.toJson(resp));
					deferred.resolve(resp);
				});
		return deferred.promise;
	}  // End of getBookbyID
	

	
/*	BookService.getBookbyID = function(selectedBookId) {

		var deferred = $q.defer();
		$timeout(function() {
			var tempBookItem = [];
		
			var bookList = angular.fromJson($localStorage.dbAddBook);

			if (typeof bookList === 'undefined')
				bookList = [];

			for (i = 0; i < bookList.length; i++) {
				if (selectedBookId == bookList[i].bookid) {
					$log.debug("TEMP==" + bookList[i].bookid);
					tempBookItem.push(bookList[i].chapters[0]);
					 $log.debug("TEMP=getBooksByID==" + tempBookItem);
					}
			}
				
			deferred.resolve(tempBookItem);

		}, 1000);
		return deferred.promise;
	}//end of getBookbyID
*/	
	
// start of UserService
	
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {
		$log.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.userService.addUser(user).execute(
				function(resp) {
					$log
					.debug("No5");	
					$log.debug("UserService#resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}//end of addUser
	
	UserService.getUser = function() {
		var deferred = $q.defer();
		gapi.client.userService.getAllUser().execute(
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
		gapi.client.practiceExamService.addPracticeExam(test).execute(
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
		gapi.client.practiceExamService.getAllPracticeExam().execute(
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
		gapi.client.syllabusService.addSyllabus(syllabi).execute(
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
		gapi.client.syllabusService.getSyllabus().execute(
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
		gapi.client.instituteService.addInstitute(insti).execute(
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
		gapi.client.instituteService.getInstitutes().execute(
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
