angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q, $localStorage, $timeout) {

	var serviceFactory = {};

	// start of UserService
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
	 
	UserService.updateUser = function(user) {
		$log
		.debug("No2");	
		var deferred = $q.defer();
		gapi.client.userService.updateUser(user).execute(
				function(resp) {	
					deferred.resolve(resp.result);
				});
		$log.debug("No3");	
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
	}	// End of UserService
	
	//start of ChapterService
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
					deferred.resolve(resp.items);   
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
	
	//end of ChapterService
	
	
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
	
	BookService.getStandard_BookbyID = function(selectedStdId) {
		var deferred = $q.defer();
		gapi.client.bookService.getStandard_BookbyID({'standard':selectedStdId}).execute(
				function(resp) {
			
					$log.debug("getStandard_BookbyID#resp:" +angular.toJson(resp));
					deferred.resolve(resp);
				});
		return deferred.promise;
	}  // End of getStandard_BookbyID

	

			
	// start of SyllabusService
	
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

	// End of SyllabusService
	
	// start of PracticeExamService
	var PracticeExamService = {};

	serviceFactory.getPracticeExamService = function() {
		return PracticeExamService;
	}

	PracticeExamService.addPracticeExam = function(ques) {

		var deferred = $q.defer();
		// ques.examId = practiceExamList.length + 1;
		ques.examId = 2;
		gapi.client.practiceExamService.addPracticeExam(ques).execute(
				function(resp) {

					$log.debug("ques :" + angular.toJson(ques));
					$log.debug("res.result.length :" + resp.result.length);
					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	PracticeExamService.getPracticeExams = function() {
		var deferred = $q.defer();
		gapi.client.practiceExamService.getPracticeExams().execute(
				function(resp) {

					$log.debug("getAllChapters#resp :" + resp);
					deferred.resolve(resp.items);   

				});
		return deferred.promise;

	} 
	
	// Add PracticeExam Service
	var PracticeExamService = {};
	PracticeExamService.getPracticeExamById = function(selectedExamId) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.getPracticeExamById({
			'examId' : selectedExamId
		}).execute(function(resp) {
			$log.debug("resp:" + angular.toJson(resp));
			// deferred.resolve(resp.items); //for list
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	// End of PracticeExamService
	
	
	



	// start of InstituteService

	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(insti, student, admin, teacher) {

		var deferred = $q.defer();
		gapi.client.instituteService.addInstitute(insti).execute(
				function(resp) {
					$log.debug("result123 :" + angular.toJson(resp.result));

					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	InstituteService.getInstitutes = function() {
		var deferred = $q.defer();
		gapi.client.instituteService.getInstitutes().execute(function(resp) {

			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	InstituteService.addInstituteTeachers = function(selectedInstituteId,
			teacher) {

		var deferred = $q.defer();
		gapi.client.instituteService.addInstituteTeachers(teacher).execute(
				function(resp) {

					deferred.resolve(resp);
				});

		return deferred.promise;
	}


	InstituteService.addInstituteAdmins = function(selectedInstituteId, admin) {

		var deferred = $q.defer();
		gapi.client.instituteService.addInstituteAdmins(admin).execute(
				function(resp) {

					deferred.resolve(resp);
				});

		return deferred.promise;
	}  // End of getStandard_BookbyID
	
	


		InstituteService.getInstituteById = function(selectedInstituteId) {
			  var deferred = $q.defer();
			  gapi.client.instituteService.getInstituteById({
			   'instituteId' : selectedInstituteId
			  }).execute(function(resp) {
			   $log.debug("resp:" + angular.toJson(resp));

			   deferred.resolve(resp);
			  });
			  return deferred.promise;                                   
			 }

	
	
	InstituteService.editInstitute = function(insti) {

		var deferred = $q.defer();
		gapi.client.instituteService.editInstitute(insti).execute(
				function(resp) {
			
					$log.debug("getStandard_BookbyID#resp:" +angular.toJson(resp));
					$log.debug("result123 :" + angular.toJson(resp));

					deferred.resolve(resp);
				});
		return deferred.promise;
	}	// End of InstituteService  
	
	
	// start of QuestionService
	var QuestionService = {};

	serviceFactory.getQuestionService = function() {
		return QuestionService;
	}

	QuestionService.addQuestion = function(ques) {

		var deferred = $q.defer();
		gapi.client.questionService.addQuestion(ques).execute(function(resp) {
			$log.debug("result123 :" + angular.toJson(resp));
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	QuestionService.getQuestion = function() {
		var deferred = $q.defer();
		gapi.client.questionService.getQuestion().execute(function(resp) {

			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	// End of QuestionService
	
	// start of StudentService
	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {

		var deferred = $q.defer();
		gapi.client.studentService.addStudent(stud).execute(function(resp) {
			$log.debug("result123 :" + angular.toJson(resp));
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	StudentService.getStudents = function() {
		var deferred = $q.defer();
		gapi.client.studentService.getStudents().execute(function(resp) {

			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}// End of StudentService
	
	return serviceFactory;
}
