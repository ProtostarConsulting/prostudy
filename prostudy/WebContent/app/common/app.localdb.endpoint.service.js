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
			deferred.resolve({
				"msg" : "Chapter Added Successfully."
			});

		}, 1000);

		return deferred.promise;
	}

	ChapterService.getChapters= function() 
	{
		var deferred = $q.defer();
		$timeout(function() {
			$log.debug("In side local DB getChapters...");
			var chapterList = angular.fromJson($localStorage.dbAddChapter);
			if (typeof chapterList === 'undefined')
				chapterList = [];
			deferred.resolve(chapterList);
		}, 1000);

		return deferred.promise;

	} // End of getChapters-ChapterService

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

	// start of question_add service

	var QuestionAddService = {};

	serviceFactory.getQuestionAddService = function() {
		return QuestionAddService;
	}

	QuestionAddService.addQuestion = function(ques) {

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
	QuestionAddService.updateQuestion = function(ques) {

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

	QuestionAddService.getQuestion = function() {
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
	// end of question_add service

	// Add Exam Service

	serviceFactory.getExamService = function() {
		return null;
	}

	return serviceFactory;
}
