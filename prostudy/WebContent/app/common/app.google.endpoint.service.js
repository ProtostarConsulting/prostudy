angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q, $localStorage, $timeout) {

	var serviceFactory = {};

	// start of UserService
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.userService.addUser(user).execute(function(resp) {
			// $log.debug("addUser... #resp:" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		$log.debug("No3");
		return deferred.promise;
	}

	UserService.getUser = function() {
		var deferred = $q.defer();
		gapi.client.userService.getUser().execute(function(resp) {
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
		$log.debug("No2");
		var deferred = $q.defer();
		gapi.client.userService.updateUser(user).execute(function(resp) {
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
		gapi.client.userService.login(userName, pwd).execute(function(resp) {
			$log.debug("login #resp :" + resp);
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	} 
	
	UserService.getExamId = function(selectedMyExamId) {
		$log
		.debug("No2");	
		var deferred = $q.defer();
		gapi.client.userService.getExamId(selectedMyExamId).execute(
				function(resp) {	
					$log.debug("getExamId... #resp:" + angular.toJson(resp));
					deferred.resolve(resp);
				});
		$log.debug("No3");	
		return deferred.promise;
	}
	UserService.getMyExamList = function(email_id) {

		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID({'email_id' : email_id}).execute(function(resp) {
			$log.debug("getMyExamList #resp :" + resp.myExams);
			deferred.resolve(resp.myExams);
		});
		return deferred.promise;
	}
	UserService.getMyBookList = function(email_id) {

		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID({'email_id' : email_id}).execute(function(resp) {
			$log.debug("getMyBookList #resp :" + resp.myBooks);
			deferred.resolve(resp.myBooks);
		});
		return deferred.promise;
	}
	
		
	// End of UserService

//end of UserService-----------------------------------------------------------------------------------------------------------------
	
	var ChapterService = {};

	serviceFactory.getChapterService = function() {
		return ChapterService;
	}

	ChapterService.addChapter = function(chapter) {
		$log.debug("No2");
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.chapterService.addChapter(chapter).execute(function(resp) {
			$log.debug("No5");
			$log.debug("addChapter#resp:" + resp);
			deferred.resolve(resp);
		});
		$log.debug("No3");
		return deferred.promise;
	}

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		gapi.client.chapterService.getAllChapters().execute(function(resp) {
			$log.debug("getAllChapters#resp :" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	ChapterService.getChaptersByID = function(selectedChapterId) {
		var deferred = $q.defer();
		gapi.client.chapterService.getChaptersByID({
			'chapterId' : selectedChapterId
		}).execute(function(resp) {

			$log.debug("getChaptersByID#resp:" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	} // End of getChaptersByID

//end of ChapterService----------------------------------------------------------------------------------------------------------
	
	var BookService = {};

	serviceFactory.getBookService = function() {
		return BookService;
	}

	BookService.addBook = function(book) {
		$log.debug("No2");
		var deferred = $q.defer();
		$log.debug("abc");

		gapi.client.bookService.addBook(book).execute(function(resp) {
			$log.debug("No5");
			$log.debug("addBook#resp:" + resp);
			deferred.resolve(resp);
		});
		$log.debug("No3");
		return deferred.promise;
	}// end of addBook

	BookService.getBooks = function() {
		var deferred = $q.defer();
		gapi.client.bookService.getBooks().execute(function(resp) {
			$log.debug("getBooks#resp:" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} // End of getBooks

	BookService.getBookbyID = function(selectedBookId) {
		var deferred = $q.defer();
		gapi.client.bookService.getBookByID({
			'bookId' : selectedBookId
		}).execute(function(resp) {

			$log.debug("getBookbyID#resp:" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	} // End of getBookbyID

	BookService.getBookByStandard = function(selectedStdId) {
		var deferred = $q.defer();
		gapi.client.bookService.getBookByStandard({
			'standard' : selectedStdId
		}).execute(function(resp) {

			$log.debug("getBookByStandard#resp:" + angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} // End of getBookByStandard
	
//-------end of BookService------------------------------------------------------------------------------------------------------
	
	// start of SyllabusService

	var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syll) {
		$log.debug("No2");
		var deferred = $q.defer();
		$log.debug("abc");
		gapi.client.syllabusService.addSyllabus(syll).execute(function(resp) {
			$log.debug("No5");
			$log.debug("addSyllabus #resp:" + resp);
			deferred.resolve(resp);
		});
		$log.debug("No3");
		return deferred.promise;
	}

	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		gapi.client.syllabusService.getSyllabus().execute(function(resp) {
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

					deferred.resolve(resp.items);
					$log.debug("resp.items123:" + angular.toJson(resp.items));
				});
		return deferred.promise;
	}

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

	PracticeExamService.updatePracticeExam = function(exam, selected) {

		var deferred = $q.defer();

		gapi.client.practiceExamService.updatePracticeExam(exam).execute(
				function(resp) {

					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	PracticeExamService.likeCount = function(selectedExamId) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.likeCount({
			'examId' : selectedExamId
		}).execute(function(resp) {

			resp.likes = resp.likes + 1;

			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	PracticeExamService.dislikeCount = function(selectedExamId) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.dislikeCount({
			'examId' : selectedExamId
		}).execute(function(resp) {

			resp.dislikes = resp.dislikes + 1;

			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	// End of PracticeExamService

	// start of PracticeExamResultService

	var PracticeExamResultService = {};

	serviceFactory.getPracticeExamResultService = function() {
		return PracticeExamResultService;
	}

	PracticeExamResultService.addPracticeExamResult = function(res) {

		var deferred = $q.defer();

		gapi.client.practiceExamResultService.addPracticeExamResult(res)
				.execute(function(resp) {
					$log.debug("res123 :" + angular.toJson(resp));
					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	PracticeExamResultService.getPracticeExamResult = function() {
		var deferred = $q.defer();
		gapi.client.practiceExamResultService.getPracticeExamResult().execute(
				function(resp) {

					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}

	PracticeExamResultService.getPracticeExamResultbyID = function(selectedId) {
		var deferred = $q.defer();
		gapi.client.practiceExamResultService.getPracticeExamResultbyID({
			'userId' : selectedId
		}).execute(function(resp) {

			deferred.resolve(resp.items);
			$log.debug("resp.items:" + angular.toJson(resp.items));
		});
		return deferred.promise;
	}

	// End of PracticeExamResultService

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
	}

	InstituteService.addInstituteStudents = function(selectedInstituteId, stud) {

		var deferred = $q.defer();
		gapi.client.instituteService.addInstituteStudents(stud).execute(
				function(resp) {

					deferred.resolve(resp);
				});

		return deferred.promise;
	}

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
					$log.debug("result123 :" + angular.toJson(resp));

					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	// End of InstituteService

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

	QuestionService.updateQuestion = function(ques) {

		var deferred = $q.defer();
		gapi.client.questionService.updateQuestion(ques).execute(
				function(resp) {

					deferred.resolve(resp);
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
	}
	// End of StudentService

	return serviceFactory;
}
