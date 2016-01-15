angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q,$localStorage,$timeout) {

	var serviceFactory = {};

	
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {
		$log
		.debug("No2");	
		var deferred = $q.defer();
		gapi.client.userService.addUser(user).execute(
				function(resp) {	
					//$log.debug("addUser... #resp:" + angular.toJson(resp));
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}
	
		
	UserService.getUser = function() {
		var deferred = $q.defer();
		gapi.client.userService.getUser().execute(
				function(resp) {
					$log.debug("getUser #resp :" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} 

/*	UserService.getUserByEmailID = function(email_id) {
		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID('email_id' : email_id).execute(
				function(resp) {
					$log.debug("getUserByEmailID #resp :" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;
	} 
	*/
	UserService.getUserByEmailID = function(email_id) {
		  var deferred = $q.defer();
		  gapi.client.userService.getUserByEmailID({
		   'email_id' : email_id
		  }).execute(function(resp) {
		   $log.debug("resp:" + angular.toJson(resp));
		   
		   deferred.resolve(resp.result);
		  });
		  return deferred.promise;
		 }
	 
	 
	 
	UserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}
	
	UserService.login = function(userName, pwd) {
		
		var deferred = $q.defer();
		gapi.client.userService.login(userName, pwd).execute(
				function(resp) {
					$log.debug("login #resp :" + resp);
					deferred.resolve(resp);
				});
		return deferred.promise;

	}
	
	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	}
			
	var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syll) {
		$log
		.debug("No2");	
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.syllabusService.addSyllabus(syll).execute(
				function(resp) {$log.debug("No5");	
					$log.debug("addSyllabus #resp:" + resp);
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}
	
	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		gapi.client.syllabusService.getSyllabus().execute(
				function(resp) {
					$log.debug("Syllabus.....Service#resp :" + resp);
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	} 

	
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
	}

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		gapi.client.chapterService.getAllChapters().execute(
				function(resp) {
					$log.debug("getAllChapters#resp :" + resp);
					deferred.resolve(resp.items);   //resp.items
				});
		return deferred.promise;
	} 
	
	
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
	}
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
	/*
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;

	}

	/*var StudentService = {};

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
	*/
	
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
