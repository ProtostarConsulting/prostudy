angular.module("prostudyApp").factory('localDBServiceFactory',
		localDBServiceFactory);

function localDBServiceFactory($log, $q, $timeout, $localStorage) {

	var serviceFactory = {};
	
	// start of ChapterService
	var ChapterService = {};

	serviceFactory.getChapterService = function()
	{
		return ChapterService;
	}

	ChapterService.addChapter = function(chapter) 
	{

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addChapter...");
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];
		
			chapterList.push(chapter);
			$localStorage.dbAddChapter = angular.toJson(chapterList);
			$log.debug("$localStorage.dbAddChapter: " +	 $localStorage.dbAddChapter);
			deferred.resolve({"msg" : "Chapter Added Successfully."});
		}, 1000);

		return deferred.promise;
	}

	ChapterService.getChapters= function() 
	{
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
			
			//find index of editRecord in syllabusList
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

//start of SyllabusService
	
	//var SyllabusService = {};

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
	//end of SyllabusService
	
	// start of LoginService
	var LoginService = {};

	serviceFactory.getLoginService = function() {
		return LoginService;
	}

	LoginService.addLogin = function(login) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addLogin...");
			var loginList = angular.fromJson($localStorage.dbLogin);
			if (typeof loginList === 'undefined')
				loginList = [];
			loginList.push(login);
			$localStorage.dbLogin = angular.toJson(loginList);
			deferred.resolve({
				"msg" : "User added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	LoginService.getLogin = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getLogin...");
			var loginList = angular.fromJson($localStorage.dbLogin);
			if (typeof loginList === 'undefined')
				loginList = [];
			deferred.resolve(loginList);
		}, 1000);

		return deferred.promise;

	} // End of LoginService
	

//start of profile service
	
	var ProfileService = {};

	serviceFactory.getProfileService = function() {
		return ProfileService;
	}

	ProfileService.addProfile = function(profile) {

		var deferred = $q.defer();
		$timeout(function() {

			$log.debug("In side local DB addStudent...");
			var profileList = angular.fromJson($localStorage.dbProfile);
			if (typeof profileList === 'undefined')
				profileList = [];
			profileList.push(profile);
			$localStorage.dbProfile = angular.toJson(profileList);
			deferred.resolve({
				"msg" : "Question Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	ProfileService.getprofile = function() {
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getprofile...");
			var profileList = angular.fromJson($localStorage.dbProfile);
			if (typeof profileList === 'undefined')
				profileList   = [];
			deferred.resolve(profileList);
		}, 1000);

		return deferred.promise;

	}
	//end of profile service
	
	// Add Exam Service

	serviceFactory.getExamService = function() {
		return null;
	}

	return serviceFactory;
}
