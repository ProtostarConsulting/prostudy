angular.module("prostudyApp").factory('googleEndpointSF', googleEndpointSF);

function googleEndpointSF($log, $q, $localStorage, $timeout) {

	var serviceFactory = {};

	// start of UserService
	var UserService = {};

	serviceFactory.getUserService = function() {
		return UserService;
	}

	UserService.addUser = function(user) {

		var deferred = $q.defer();
		gapi.client.userService.addUser(user).execute(function(resp) {
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	UserService.getUser = function() {
		var deferred = $q.defer();
		gapi.client.userService.getUserList().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	UserService.getUserByEmailID = function(email_id) {
		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID({
			'email_id' : email_id
		}).execute(function(resp) {

			deferred.resolve(resp.result);
		});
		return deferred.promise;

	}
	UserService.checkUserAlreadyExist = function(email_id) {
		var deferred = $q.defer();
		gapi.client.userService.checkUserAlreadyExist({
			'email_id' : email_id
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;

	}

	UserService.getUserByRole = function(role, instituteID) {
		var deferred = $q.defer();
		gapi.client.userService.getUserByRole({
			'role' : role,
			'instituteID' : instituteID
		}).execute(function(resp) {

			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	UserService.checkAlreadyExist = function(email_id) {
		var deferred = $q.defer();
		gapi.client.userService.checkAlreadyExist({
			'email_id' : email_id
		}).execute(function(resp) {

			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	UserService.getUserByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.userService.getUserByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	UserService.getUserByClass = function(standard, division, subject) {

		var deferred = $q.defer();

		gapi.client.userService.getUserByClass({
			'standard' : standard,
			'division' : division,
			'subject' : subject
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	UserService.updateUser = function(user) {
		var deferred = $q.defer();
		gapi.client.userService.updateUser(user).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}
	
	UserService.getAllAccountTypes = function() {
		var deferred = $q.defer();
		gapi.client.userService.getAllAccountTypes().execute(function(resp) {
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

	UserService.login = function(email, pass) {

		var deferred = $q.defer();

		gapi.client.userService.login({
			'email_id' : email,
			'password' : pass
		}).execute(function(resp) {
			deferred.resolve(resp);
		});

		return deferred.promise;
	}

	UserService.logout = function() {
		$localStorage.loggedinUser = null;
	}

	UserService.getExamId = function(selectedMyExamId) {

		var deferred = $q.defer();
		gapi.client.userService.getExamId(selectedMyExamId).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	UserService.getMyExamList = function(email_id) {

		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID({
			'email_id' : email_id
		}).execute(function(resp) {
			deferred.resolve(resp.myExams);
		});
		return deferred.promise;
	}

	UserService.getMyBookList = function(email_id) {

		var deferred = $q.defer();
		gapi.client.userService.getUserByEmailID({
			'email_id' : email_id
		}).execute(function(resp) {
			deferred.resolve(resp.myBooks);
		});
		return deferred.promise;
	}

	UserService.addOrUpdateRoleSec = function(roleSec) {

		var deferred = $q.defer();
		gapi.client.userService.addOrUpdateRoleSec(roleSec).execute(
				function(resp) {
					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	UserService.getRoleSecListByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.userService.getRoleSecListByInstitute({
			'instituteID' : instituteID 
			}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	UserService.getCurrentUserRoleByInstitute = function(instituteID, role) {
		var deferred = $q.defer();
		gapi.client.userService.getCurrentUserRoleByInstitute({
			'instituteID' : instituteID  , 'role' : role
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	UserService.getAuthorityByRole = function(role, instituteID) {

		var deferred = $q.defer();

		gapi.client.userService.getAuthorityByRole({
			'role' : role,
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});

		return deferred.promise;
	}
	UserService.getStudentsBySubjectID = function(subId) {
		var deferred = $q.defer();

		gapi.client.userService.getStudentsBySubjectID({
			'subID' : subId
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	UserService.getStudentsByScheduledExamID = function(exam) {
		var deferred = $q.defer();

		gapi.client.userService.getStudentsByScheduledExamID({
			'selectedExam' : exam
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}	
	
	
	UserService.updateUserStatus = function(update) {
		var deferred = $q.defer();
		gapi.client.userService.updateUserStatus(update).execute(function() {
			deferred.resolve({
				"msg" : "User Status Successfully Updated"
			});
		});
		return deferred.promise;
	}
	
	
	// end of UserService
	/*------------------------------------------------------------------------------------------------------*/	
	// start of CertificateService
	var CertificateService = {};

	serviceFactory.getCertificateService = function() {
		return CertificateService;
	}

	CertificateService.addCertificate = function(certificate) {

		var deferred = $q.defer();
		gapi.client.certificateService.addCertificate(certificate).execute(
				function(resp) {
					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	CertificateService.getCertificate = function() {
		var deferred = $q.defer();
		gapi.client.certificateService.getCertificate().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	CertificateService.getCertificateById = function(studID) {
		var deferred = $q.defer();
		gapi.client.certificateService.getCertificateById({
			'studID' : studID
		}).execute(function(resp) {

			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	// End of CertificateService
	/*------------------------------------------------------------------------------------------------------*/	
	// start of StandardService
	var StandardService = {};

	serviceFactory.getStandardService = function() {
		return StandardService;
	}

	StandardService.addStandards = function(std) {

		var deferred = $q.defer();
		gapi.client.standardService.addStandard(std).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	StandardService.getStandards = function() {
		var deferred = $q.defer();
		gapi.client.standardService.getStandard().execute(function(resp) {
			$log.debug("getUser #resp :" + resp);
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StandardService.getStandardByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.standardService.getStandardByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StandardService.editStandard = function(standard) {

		var deferred = $q.defer();
		gapi.client.standardService.editStandard(standard).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	// end of StandardService
	/*------------------------------------------------------------------------------------------------------*/	
	// start of DivisionService
	var DivisionService = {};

	serviceFactory.getDivisionService = function() {
		return DivisionService;
	}

	DivisionService.addDivisions = function(div) {

		var deferred = $q.defer();
		gapi.client.divisionService.addDivision(div).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	DivisionService.getDivisions = function() {
		var deferred = $q.defer();
		gapi.client.divisionService.getDivisions().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	DivisionService.getDivisionByStandard = function(standardID) {
		var deferred = $q.defer();
		gapi.client.divisionService.getDivisionByStandard({
			'standardID' : standardID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	DivisionService.getSubjectsByDivName = function(divName) {
		var deferred = $q.defer();
		gapi.client.divisionService.getSubjectsByDivName({
			'name' : divName
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	DivisionService.editDivision = function(division) {

		var deferred = $q.defer();
		gapi.client.divisionService.editDivision(division).execute(
				function(resp) {
					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	// end of DivisionService
	/*------------------------------------------------------------------------------------------------------*/	
	// start of SubjectService
	var SubjectService = {};

	serviceFactory.getSubjectService = function() {
		return SubjectService;
	}

	SubjectService.addSubjects = function(sub) {

		var deferred = $q.defer();
		gapi.client.subjectService.addSubject(sub).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	SubjectService.getSubjects = function() {
		var deferred = $q.defer();
		gapi.client.subjectService.getSubject().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	SubjectService.getSubjectByDivision = function(divisionID) {
		var deferred = $q.defer();
		gapi.client.subjectService.getSubjectByDivision({
			'divisionID' : divisionID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	SubjectService.editSubject = function(subject) {

		var deferred = $q.defer();
		gapi.client.subjectService.editSubject(subject).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	SubjectService.getSubjectsByStudentID = function(studId) {
		var deferred = $q.defer();
		gapi.client.subjectService.getSubjectsByStudentID({
			'id' : studId
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	// end of SubjectService
	/*------------------------------------------------------------------------------------------------------*/	
	// start of StudSubService
	
	var StudSubService = {};
	serviceFactory.getStudSubService = function() {
		return StudSubService;
	}

	StudSubService.addStudSubject = function(data) {

		var deferred = $q.defer();
		gapi.client.studSubService.addStudSubject(data).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	StudSubService.getAllStudSubList = function() {
		var deferred = $q.defer();
		gapi.client.studSubService.getAllStudSubList().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StudSubService.getSubByStudId = function(studID) {
		var deferred = $q.defer();
		gapi.client.studSubService.getSubByStudId({
			'studID' : studID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StudSubService.getAllSubByStudId = function(studID) {
		var deferred = $q.defer();
		gapi.client.studSubService.getAllSubByStudId({
			'studID' : studID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StudSubService.getStudentBySubject = function(subID) {
		var deferred = $q.defer();
		gapi.client.studSubService.getStudentBySubject({
			'subID' : subID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StudSubService.getStudSubByStudIdAndSubId = function(studID, subID) {

		var deferred = $q.defer();
		gapi.client.studSubService.getStudSubByStudIdAndSubId({
			'studID' : studID,
			'subID' : subID
		}).execute(function(resp) {

			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	StudSubService.removeStudSubject = function(studSubject) {
		var deferred = $q.defer();
		gapi.client.studSubService.addStudSubject(studSubject).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	// End of StudSubService	
	/*------------------------------------------------------------------------------------------------------*/	
	// start of AttendanceService
	
	var AttendanceService = {};

	serviceFactory.getAttendanceService = function() {
		return AttendanceService;
	}

	AttendanceService.addAttendance = function(attendance) {

		var deferred = $q.defer();
		gapi.client.attendanceService.addAttendance(attendance).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	AttendanceService.getAttendance = function() {
		var deferred = $q.defer();
		gapi.client.attendanceService.getAttendance().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	AttendanceService.getAttendanceByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.attendanceService.getAttendanceByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	AttendanceService.getAttendanceByClass = function(instituteID, standard,
			division, subject) {
		var deferred = $q.defer();
		gapi.client.attendanceService.getAttendanceByClass({
			'instituteID' : instituteID,
			'standard' : standard,
			'division' : division,
			'subject' : subject
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	// End of AttendanceService
	/*------------------------------------------------------------------------------------------------------*/
	// Start of ChapterService
	
	var ChapterService = {};

	serviceFactory.getChapterService = function() {
		return ChapterService;
	}

	ChapterService.addChapter = function(chapter) {

		var deferred = $q.defer();
		gapi.client.chapterService.addChapter(chapter).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	ChapterService.getChapters = function() {
		var deferred = $q.defer();
		gapi.client.chapterService.getAllChapters().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	ChapterService.getChaptersByID = function(selectedChapterId) {
		var deferred = $q.defer();
		gapi.client.chapterService.getChaptersByID({
			'id' : selectedChapterId
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	ChapterService.getChaptersByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.chapterService.getChaptersByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	ChapterService.updateChapter = function(chapter) {

		var deferred = $q.defer();
		gapi.client.chapterService.updateChapter(chapter).execute(
				function(resp) {
					deferred.resolve(resp.result);
				});
		return deferred.promise;
	}

	ChapterService.getChaptersByClass = function(instituteID, standard,
			division, subject) {

		var deferred = $q.defer();
		gapi.client.chapterService.getChaptersByClass({
			'instituteID' : instituteID,
			'standard' : standard,
			'division' : division,
			'subject' : subject
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	} 
	
	// end of ChapterService
	/*------------------------------------------------------------------------------------------------------*/	
	// start of BookService
	
	var BookService = {};

	serviceFactory.getBookService = function() {
		return BookService;
	}

	BookService.addBook = function(book) {
		var deferred = $q.defer();
		gapi.client.bookService.addBook(book).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	BookService.getBooks = function(id) {
		var deferred = $q.defer();
		gapi.client.bookService.getBooks({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	BookService.getBookbyID = function(selectedBookId) {
		var deferred = $q.defer();
		gapi.client.bookService.getBookByID({
			'id' : selectedBookId
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	BookService.getBookByStandard = function(selectedStdId) {
		var deferred = $q.defer();
		gapi.client.bookService.getBookByStandard({
			'standard' : selectedStdId
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	BookService.getBooksByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.bookService.getBooksByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	BookService.updateBook = function(book) {

		var deferred = $q.defer();
		gapi.client.bookService.updateBook(book).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	BookService.likeCount = function(book) {
		var deferred = $q.defer();
		gapi.client.bookService.updateBook(book).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	BookService.dislikeCount = function(book) {
		var deferred = $q.defer();
		gapi.client.bookService.updateBook(book).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	//end of BookService
	/*------------------------------------------------------------------------------------------------------*/
	// start of SyllabusService

	var SyllabusService = {};

	serviceFactory.getSyllabusService = function() {
		return SyllabusService;
	}

	SyllabusService.addSyllabus = function(syll) {
		var deferred = $q.defer();
		gapi.client.syllabusService.addSyllabus(syll).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	SyllabusService.getSyllabus = function() {
		var deferred = $q.defer();
		gapi.client.syllabusService.getSyllabus().execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	SyllabusService.getSyllabusByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.syllabusService.getSyllabusByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	SyllabusService.updateSyllabus = function(syllabus) {
		var deferred = $q.defer();
		gapi.client.syllabusService.updateSyllabus(syllabus).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	// End of SyllabusService
	/*------------------------------------------------------------------------------------------------------*/
	// start of PracticeExamService
	var PracticeExamService = {};

	serviceFactory.getPracticeExamService = function() {
		return PracticeExamService;
	}

	PracticeExamService.addPracticeExam = function(exam) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.addPracticeExam(exam).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	PracticeExamService.getPracticeExams = function() {
		var deferred = $q.defer();
		gapi.client.practiceExamService.getPracticeExams().execute(
				function(resp) {
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}

	PracticeExamService.getPracticeExamById = function(selectedExamId) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.getPracticeExamById({
			'examId' : selectedExamId
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	PracticeExamService.getPracticeExamByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.getPracticeExamByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	PracticeExamService.updatePracticeExam = function(exam) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.updatePracticeExam(exam).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	PracticeExamService.likeCount = function(exam) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.updatePracticeExam(exam).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	PracticeExamService.dislikeCount = function(exam) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.updatePracticeExam(exam).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	// End of PracticeExamService
	/*------------------------------------------------------------------------------------------------------*/
	// start of PracticeExamResultService

	var PracticeExamResultService = {};

	serviceFactory.getPracticeExamResultService = function() {
		return PracticeExamResultService;
	}

	PracticeExamResultService.addPracticeExamResult = function(res) {
		var deferred = $q.defer();
		gapi.client.practiceExamResultService.addPracticeExamResult(res)
				.execute(function(resp) {
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

	PracticeExamResultService.getPracticeExamResultbyEmail = function(email_id) {
		var deferred = $q.defer();
		gapi.client.practiceExamResultService.getPracticeExamResultbyEmail({
			'email_id' : email_id
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	PracticeExamResultService.getPracticeExamResultbyID = function(selectedID) {
		var deferred = $q.defer();
		gapi.client.practiceExamResultService.getPracticeExamResultbyID({
			'id' : selectedID
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	// End of PracticeExamResultService
/*------------------------------------------------------------------------------------------------------*/
	// start of ScheduledQuestionService
	var ScheduledQuestionService = {};

	serviceFactory.getScheduledQuestionService = function() {
		return ScheduledQuestionService;
	}
	
	ScheduledQuestionService.addQuestion = function(ques) {
		var deferred = $q.defer();
		gapi.client.scheduledQuestionService.addQuestion(ques).execute(
				function(resp) {
					
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	ScheduledQuestionService.getQuestions = function() {
		var deferred = $q.defer();
		gapi.client.scheduledQuestionService.getQuestions().execute(
				function(resp) {
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}
	ScheduledQuestionService.getQuestionsByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.scheduledQuestionService.getQuestionsByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	ScheduledQuestionService.updateQuestion = function(ques) {
		var deferred = $q.defer();
		gapi.client.scheduledQuestionService.updateQuestion(ques).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	ScheduledQuestionService.getQuestionByID = function(id) {
		var deferred = $q.defer();
		gapi.client.scheduledQuestionService.getQuestionByID({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}
	
	// end of ScheduledQuestionService
	/*------------------------------------------------------------------------------------------------------*/
	// start of ScheduledExamService
	var ScheduledExamService = {};

	serviceFactory.getScheduledExamService = function() {
		return ScheduledExamService;
	}

	ScheduledExamService.addScheduledExam = function(exam) {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.addScheduledExam(exam).execute(
				function(resp) {
					
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	ScheduledExamService.getScheduledExams = function() {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.getScheduledExams().execute(
				function(resp) {
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}
	ScheduledExamService.getScheduledExamByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.getScheduledExamByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	ScheduledExamService.getScheduledExamById = function(selectedExamId) {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.getScheduledExamById({
			'id' : selectedExamId
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	ScheduledExamService.updateScheduledExam = function(exam) {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.updateScheduledExam(exam).execute(
				function(resp) {
				deferred.resolve(resp);
				});
		return deferred.promise;
	}
	ScheduledExamService.getScheduledExamById = function(selectedExamId) {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.getScheduledExamById({
			'id' : selectedExamId
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	
	ScheduledExamService.assignExamToStudent = function(exam) {
		var deferred = $q.defer();
		gapi.client.scheduledExamService.assignExamToStudent(exam).execute(
				function(resp) {
				deferred.resolve(resp);
				});
		return deferred.promise;
	}

	// End of ScheduledExamService
	/*------------------------------------------------------------------------------------------------------*/
	
	// start of scheduledExamResultService

	var ScheduledExamResultService = {};

	serviceFactory.getScheduledExamResultService = function() {
		return ScheduledExamResultService;
	}

	ScheduledExamResultService.addScheduledExamResult = function(res) {
		var deferred = $q.defer();
		gapi.client.scheduledExamResultService.addScheduledExamResult(res)
				.execute(function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	ScheduledExamResultService.getScheduledExamResult = function() {
		var deferred = $q.defer();
		gapi.client.scheduledExamResultService.getScheduledExamResult().execute(
				function(resp) {
					deferred.resolve(resp.items);
				});
		return deferred.promise;
	}

	ScheduledExamResultService.getScheduledExamResultbyEmail = function(email_id) {
		var deferred = $q.defer();
		gapi.client.scheduledExamResultService.getScheduledExamResultbyEmail({
			'email_id' : email_id
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	ScheduledExamResultService.getScheduledExamResultbyID = function(selectedID) {
		var deferred = $q.defer();
		gapi.client.scheduledExamResultService.getScheduledExamResultbyID({
			'id' : selectedID
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	ScheduledExamResultService.getScheduledExamResultListByExamId = function(testID) {
		var deferred = $q.defer();
		gapi.client.scheduledExamResultService.getScheduledExamResultListByExamId({
			'testID' : testID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	// End of ScheduledExamResultService
	/*------------------------------------------------------------------------------------------------------*/
	// start of InstituteService

	var InstituteService = {};

	serviceFactory.getInstituteService = function() {
		return InstituteService;
	}

	InstituteService.addInstitute = function(insti, student, admin, teacher) {
		var deferred = $q.defer();
		gapi.client.instituteService.addInstitute(insti).execute(
				function(resp) {
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

	InstituteService.getInstituteById = function(selectedInstituteId) {
		var deferred = $q.defer();
		$log.debug("selectedInstituteId...."+selectedInstituteId);
		gapi.client.instituteService.getInstituteById({
			'id' : selectedInstituteId
		}).execute(function(resp) {

			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	InstituteService.getInstituteByCurrentUser = function(id) {
		var deferred = $q.defer();
		
		gapi.client.instituteService.getInstituteByCurrentUser({
			'id' : id
		}).execute(function(resp) {

			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}
	
	InstituteService.getInstituteUsers = function(instituteID) {
		var deferred = $q.defer();
		
		gapi.client.instituteService.getInstituteUsers({
			'id' : instituteID
		}).execute(function(resp) {

			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	InstituteService.editInstitute = function(insti) {
		var deferred = $q.defer();
		gapi.client.instituteService.editInstitute(insti).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	InstituteService.updateInstitute = function(insti) {
		var deferred = $q.defer();
		gapi.client.instituteService.updateInstitute(insti).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	
	
	// End of InstituteService
	/*------------------------------------------------------------------------------------------------------*/
	// start of QuestionService
	var QuestionService = {};

	serviceFactory.getQuestionService = function() {
		return QuestionService;
	}

	QuestionService.addQuestion = function(ques) {
		var deferred = $q.defer();

		gapi.client.questionService.addQuestion(ques).execute(function(resp) {
			$log.debug("resp :" + angular.toJson(resp));
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

	QuestionService.getQuestionsByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.questionService.getQuestionsByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	QuestionService.getQuesByClass = function(instituteID, standard, division,
			subject) {

		var deferred = $q.defer();
		gapi.client.questionService.getQuesByClass({
			'instituteID' : instituteID,
			'standard' : standard,
			'division' : division,
			'subject' : subject
		}).execute(function(resp) {
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

	QuestionService.getQuestionByID = function(id) {
		var deferred = $q.defer();
		gapi.client.questionService.getQuestionByID({
			'quesId' : id
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	// End of QuestionService
	/*------------------------------------------------------------------------------------------------------*/
	// start of StudentService
	var StudentService = {};

	serviceFactory.getStudentService = function() {
		return StudentService;
	}

	StudentService.addStudent = function(stud) {

		var deferred = $q.defer();
		gapi.client.studentService.addStudent(stud).execute(function(resp) {
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

	StudentService.updateStudent = function(stud) {
		var deferred = $q.defer();
		gapi.client.studentService.updateStudent(stud).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}

	StudentService.getStudentByInstitute = function(instituteID) {
		var deferred = $q.defer();
		gapi.client.studentService.getStudentByInstitute({
			'instituteID' : instituteID
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	// End of StudentService
	/*------------------------------------------------------------------------------------------------------*/
	// start of PaymentService
	var PaymentService = {};

	serviceFactory.getPaymentService = function() {
		return PaymentService;
	}

	PaymentService.addStudentPayment = function(inst) {

		var deferred = $q.defer();

		gapi.client.paymentService.addStudentPayment(inst).execute(
				function(resp) {
					$log.debug("resp :" + angular.toJson(resp));
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	PaymentService.getPaymentByID = function(id) {
		var deferred = $q.defer();
		gapi.client.paymentService.getPaymentByID({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;

	}
	PaymentService.getPaymentByStudID = function(studId) {
		var deferred = $q.defer();
		gapi.client.paymentService.getPaymentByStudID({
			'studId' : studId
		}).execute(function(resp) {
			deferred.resolve(resp.result);
			$log.debug("resp payment :" + angular.toJson(resp.result));
		});
		return deferred.promise;

	}
	PaymentService.getPayments = function() {
		var deferred = $q.defer();
		gapi.client.paymentService.getPayments().execute(function(resp) {
			deferred.resolve(resp.items);
			$log.debug("resp payment :" + angular.toJson(resp));
		});

		return deferred.promise;
	}

	PaymentService.updatePayment = function(payment) {

		var deferred = $q.defer();
		gapi.client.paymentService.updatePayment(payment).execute(
				function(resp) {
					$log.debug("resp:" + angular.toJson(resp));
					deferred.resolve(resp);
				});

		return deferred.promise;
	}

	// End of PaymentService
	/*------------------------------------------------------------------------------------------------------*/
	// End of PartnerSchoolService
	
	var PartnerSchoolService = {};

	serviceFactory.getPartnerSchoolService = function() {
		return PartnerSchoolService;
	}

	PartnerSchoolService.addPartnerSchool = function(partnerSchool) {
		var deferred = $q.defer();
		gapi.client.partnerSchoolService.addPartnerSchool(partnerSchool).execute(
				function(resp) {					
					deferred.resolve(resp);
				});
		return deferred.promise;
	}	
	
	PartnerSchoolService.getPartnerByInstitute = function(id) {
		var deferred = $q.defer();
		gapi.client.partnerSchoolService.getPartnerByInstitute({'instituteID' : id}).execute(function(resp) {
			deferred.resolve(resp.items);
			
		});
		return deferred.promise;
	}
	
	PartnerSchoolService.getPSchoolByPSID = function(id) {
		var deferred = $q.defer();
		gapi.client.partnerSchoolService.getPSchoolByPSID({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp);
			
		});
		return deferred.promise;
	}
	
		
	//End of PartnerSchoolService
	
	/*------------------------------------------------------------------------------------------------------*/
	//Start of protostarAdminService
	
	var protostarAdminService = {};
	serviceFactory.getProtostarAdminService = function() {
		return protostarAdminService;
	}

	protostarAdminService.addAccountType = function(account) {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.addAccountType(account).execute(function() {
			deferred.resolve({
				"msg" : "Account Added Successfully."
			});

		});
		return deferred.promise;
	}

	protostarAdminService.updateAccountType = function(account) {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.addAccountType(account).execute(function() {
			deferred.resolve({
				"msg" : "Account Update Successfully."
			});

		});
		return deferred.promise;
	}

	protostarAdminService.getallAccountType = function() {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.getallAccountType().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	protostarAdminService.getAccountTypeById = function(id) {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.getAccountTypeById({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	protostarAdminService.initsetup = function() {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.initsetup().execute(function(resp) {
			deferred.resolve({
				"msg" : resp
			});
		});
		return deferred.promise;
	}

	protostarAdminService.initsetupnext = function() {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.initsetupnext().execute(function(resp) {
			deferred.resolve({
				"msg" : resp
			});
		});
		return deferred.promise;
	}
	protostarAdminService.getAllemp = function() {
		var deferred = $q.defer();
		gapi.client.protostarAdminService.getAllemp().execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	//End of protostarAdminService

	/*------------------------------------------------------------------------------------------------------*/
	
	//Start of ScheduledStudentExamService
	
	var ScheduledStudentExamService = {};
	serviceFactory.getScheduledStudentExamService = function() {
		return ScheduledStudentExamService;
	}

	ScheduledStudentExamService.assignScheduledExamToStudent = function(data) {
		var deferred = $q.defer();
		gapi.client.scheduledStudentExamService.assignScheduledExamToStudent(data).execute(function() {
			deferred.resolve({
				"msg" : "Exam Assigned Successfully."
			});

		});
		return deferred.promise;
	}
	
	ScheduledStudentExamService.getScheduledExamListByStudentId = function(id) {
		var deferred = $q.defer();
		gapi.client.scheduledStudentExamService.getScheduledExamListByStudentId({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}
	ScheduledStudentExamService.getStudentListByScheduledExamId = function(id) {
		var deferred = $q.defer();
		gapi.client.scheduledStudentExamService.getStudentListByScheduledExamId({
			'id' : id
		}).execute(function(resp) {
			deferred.resolve(resp.result);
		});
		return deferred.promise;
	}
	
	
	ScheduledStudentExamService.getExamOfStudent = function(selectedExam) {
		var deferred = $q.defer();
		gapi.client.ScheduledStudentExamService.getExamOfStudent({
			'selectedExam' : selectedExam
		}).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	//End of ScheduledStudentExamService

	/*------------------------------------------------------------------------------------------------------*/
	
	//Start of uploadPathService
	
	
	var uploadPathService = {};
	serviceFactory.getuploadURLService = function() {
		return uploadPathService;
	}
	uploadPathService.getLogUploadURL = function() {
		var deferred = $q.defer();
		gapi.client.uploadPathService.getLogUploadURL().execute(function(resp) {
			$log.debug("getURL at enpoint" + angular.toJson(resp));
			deferred.resolve(resp);
		});
		return deferred.promise;
	}
	
	
	/*
	 * PaymentService.getPaymentByStudent = function(studId) { var deferred =
	 * $q.defer(); gapi.client.paymentService.getPaymentByStudent({ 'studId' :
	 * studId }).execute(function(resp) { deferred.resolve(resp.items);
	 * $log.debug("resp payment :" + angular.toJson(resp)); }); return
	 * deferred.promise; }
	 */

	// End of PaymentService

	return serviceFactory;
}
