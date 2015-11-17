angular.module("prostudyApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $q, $timeout, $localStorage) {

	var serviceFactory = {};

	// start of ChapterService
	var ChapterService = {};

	serviceFactory.getChapterService = function() {
		return ChapterService;
	}

	ChapterService.addChapter = function(chapter) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addChapter...");
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];



			chapterList.push(chapter);
			$localStorage.dbAddChapter = angular.toJson(chapterList);

			deferred.resolve({
				"msg" : "Chapter Added Successfully."
			});

			$log.debug("$localStorage.dbAddChapter: " +	 $localStorage.dbAddChapter);
			deferred.resolve({"msg" : "Chapter Added Successfully."});

		}, 1000);

		return deferred.promise;
	}

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getChapters...");
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			$log.debug("getChapters :- $localStorage.dbAddChapter " + $localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];
			deferred.resolve(chapterList);
		}, 1000);

		return deferred.promise;

	} // End of getChapters-ChapterService
	
	
	// start of BookService
	var BookService = {};

	serviceFactory.getBookService = function()
	{
		return BookService;
	}

	BookService.addBook = function(book) 
	{

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addBook...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];
			book.bookId = bookList.length + 1;
		
			bookList.push(book);
			$localStorage.dbAddBook = angular.toJson(bookList);
			$log.debug("$localStorage.dbAddChapter: " +	 $localStorage.dbAddBook);
			deferred.resolve({"msg" : "Book Added Successfully in Local Storage-dbAddBook."});
		}, 1000);

		return deferred.promise;
	}

	BookService.getBooks= function() 
	{
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getBooks...");
			var bookList = angular.fromJson($localStorage.dbAddBook);
			if (typeof bookList === 'undefined')
				bookList = [];
			deferred.resolve(bookList);
		}, 1000);

		return deferred.promise;

	} // End of getBooks-BookService

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
	
	
	// Add Syllabus Service
	var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syll) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			
			syll.syllabusId = syllabusList.length +1;
			syllabusList.push(syll);
			$localStorage.dbSyllabus = angular.toJson(syllabusList);
			deferred.resolve({
				"msg" : "Syllabus Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	// syllabus.syllabusId = syllabusList.length +100;
	// Update of Local Storage Syllabus
	SyllabusService.updateSyllabus = function(editRecord) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side updated local DB updateSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			
			// find index of editRecord in syllabusList
			for(var i=0;i<syllabusList.length;i++)
			{	
				if(editRecord.syllabusId==syllabusList[i].syllabusId)
					syllabusList[i] = editRecord;
			}
			
			$localStorage.dbSyllabus = angular.toJson(syllabusList);
			deferred.resolve({
				"msg" : "Syllabus Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			deferred.resolve(syllabusList);
		}, 1000);

		return deferred.promise;

	} // End of SyllabusService
	
	

	// start of InstituteService
	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(insti) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var studList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			instituteList.push(insti);
			$localStorage.dbInstitutes = angular.toJson(instituteList);
			deferred.resolve({
				"msg" : "Student Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	InstituteService.getInstitutes = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var instituteList = angular.fromJson($localStorage.dbInstitutes);
			if (typeof instituteList === 'undefined')
				instituteList = [];
			deferred.resolve(instituteList);
		}, 1000);

		return deferred.promise;

	} // End of InstituteService

	// start of questionservice

	var QuestionService = {};

	serviceFactory.getQuestionService = function() {
		return QuestionService;
	}

	QuestionService.addQuestion = function(ques) {

		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB addStudent...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];
			ques.quesId = questionList.length;
			questionList.push(ques);
			$localStorage.dbQuestion = angular.toJson(questionList);
			deferred.resolve({
				"msg" : "Question Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	QuestionService.updateQuestion = function(ques) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];

			var result = questionList.filter(function(obj) {
				return obj.quesId == ques.quesId;
			});

			var index = questionList.indexOf(result[0]);
			if (index !== -1) {
				questionList[index] = ques;
			}
			$localStorage.dbQuestion = angular.toJson(questionList);
			deferred.resolve({
				"msg" : "Question Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	QuestionService.getQuestion = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getStudents...");
			var questionList = angular.fromJson($localStorage.dbQuestion);
			if (typeof questionList === 'undefined')
				questionList = [];
			deferred.resolve(questionList);
		}, 1000);

		return deferred.promise;

	}
	// end of questionservice

	// start of SyllabusService

	// var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syll) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			
			syll.syllabusId=syllabusList.length+1;
			syllabusList.push(syll);
			$localStorage.dbSyllabus = angular.toJson(syllabusList);
			deferred.resolve({
				"msg" : "Syllabus Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	
	

	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getSyllabus...");
			var syllabusList = angular.fromJson($localStorage.dbSyllabus);
			if (typeof syllabusList === 'undefined')
				syllabusList = [];
			deferred.resolve(syllabusList);
		}, 1000);

		return deferred.promise;

	}

	// end of SyllabusService

	// end of SyllabusService
	
	// start of UserService
	var UserService = {};



	// start of UserService
	var UserService = {};



	serviceFactory.getUserService = function() {
		return UserService;

	}

	UserService.addUser = function(user) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addLogin...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			user.userId = userList.length +1;
			userList.push(user);
			$localStorage.dbUser = angular.toJson(userList);
			deferred.resolve({
				"msg" : "User added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	UserService.getUsers = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getLogin...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			deferred.resolve(userList);
		}, 1000);

		return deferred.promise;
	}



	UserService.login = function(userName, pwd) {
		var deferred = $q.defer();
		$timeout(function() {
					var loggedin = false;
					var userList = angular.fromJson($localStorage.dbUser);
					if (typeof userList === 'undefined')
						userList = [];
					
					for (i = 0; i < userList.length; i++) {
						if (userList[i].userName === userName
								&& userList[i].pwd === pwd) {
							$localStorage.loggedinUser = userList[i];
							deferred.resolve(true);
						}
					}

					deferred.resolve(false);
				}, 1000);

		return deferred.promise;

	}

	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	}

	UserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}
	

	UserService.updateProfile = function(editProfile) {
		var deferred = $q.defer();
		$timeout(function() {


	UserService.login = function(userName, pwd) {
		var deferred = $q.defer();
		$timeout(function() {
					var loggedin = false;
					var userList = angular.fromJson($localStorage.dbUser);
					if (typeof userList === 'undefined')
						userList = [];
					
					for (i = 0; i < userList.length; i++) {
						if (userList[i].userName === userName
								&& userList[i].pwd === pwd) {
							$localStorage.loggedinUser = userList[i];
							deferred.resolve(true);
						}
					}

			$log.debug("In side updated local DB updateuser...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			
		
			for(var i=0;i<userList.length;i++)
			{	
				if(editProfile.userId==userList[i].userId)
					userList[i] = editProfile;
			}
			
			$localStorage.dbUser = angular.toJson(userList);
			deferred.resolve({
				"msg" : "User data Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	 // End of UserService
	

// start of profile service
	
	var ProfileService = {};


					deferred.resolve(false);
				}, 1000);

		return deferred.promise;

	}

	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	}

	UserService.getLoggedinUser = function() {
		var user = $localStorage.loggedinUser;
		if (user == 'undefined' || user == null)
			return null;
		else
			return $localStorage.loggedinUser;
	}
	
	UserService.updateProfile = function(editProfile) {
		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side updated local DB updateuser...");
			var userList = angular.fromJson($localStorage.dbUser);
			if (typeof userList === 'undefined')
				userList = [];
			
		
			for(var i=0;i<userList.length;i++)
			{	
				if(editProfile.userId==userList[i].userId)
					userList[i] = editProfile;
			}
			
			$localStorage.dbUser = angular.toJson(userList);
			deferred.resolve({
				"msg" : "User data Updated Successfully."
			});

		}, 1000);

		return deferred.promise;
	}
	 // End of UserService

	
	

	return serviceFactory;
}
