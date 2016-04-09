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

			$log.debug("resp# #:" + angular.toJson(resp));

			deferred.resolve(resp.result);
		});
		return deferred.promise;

	}	
	
	UserService.getUserByRole = function(role,instituteID) {
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
		gapi.client.userService.addOrUpdateRoleSec(roleSec).execute(function(resp) {
			deferred.resolve(resp);		
		});

		return deferred.promise;
	}
	
	UserService.getRoleSecList = function() {
		var deferred = $q.defer();
		gapi.client.userService.getRoleSecList().execute(function(resp) {
				deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	UserService.getAuthorityByRole = function(role) {
		
		var deferred = $q.defer();

		gapi.client.userService.getAuthorityByRole({
			'role' : role
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		
		return deferred.promise;
	}

	// end of
	// UserService-----------------------------------------------------------------------------------------------------------------

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
	
	// start of StudSubService
	var StudSubService = {};
	serviceFactory.getStudSubService = function() {
		return StudSubService;
	}	
	
	StudSubService.addStudSubject = function(data) {

		var deferred = $q.defer();
		gapi.client.studSubService.addStudSubject(data).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}
	
	StudSubService.getSubByStudId = function(studID) {
		var deferred = $q.defer();
		gapi.client.studSubService.getSubByStudId({'studID' : studID}).execute(function(resp)
			{
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}

	
	StudSubService.getStudentBySubject = function(subID) {
		var deferred = $q.defer();
		gapi.client.studSubService.getStudentBySubject({'subID' : subID}).execute(function(resp)
			{
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}
	
	

	StudSubService.getStudSubByStudIdAndSubId = function(studID,subID) {

		var deferred = $q.defer();
		gapi.client.studSubService.getStudSubByStudIdAndSubId({'studID' : studID,'subID':subID}).execute(function(resp)
			{
			$log.debug("(resp.items:"+ angular.toJson(resp));
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}	
	
	StudSubService.removeStudSubject = function(studSubject) {
		var deferred = $q.defer();
		gapi.client.studSubService.removeStudSubject(studSubject).execute(
				function(resp) {
					deferred.resolve(resp);
				});
		return deferred.promise;
	}

	// End of StudSubService
	

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

	// End of AttendanceService

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
	
	ChapterService.getChaptersByClass = function(standard, division, subject) {

		var deferred = $q.defer();
		gapi.client.chapterService.getChaptersByClass({
			'standard' : standard,
			'division' : division,
			'subject' : subject
		}).execute(function(resp) {
			deferred.resolve(resp.items);
		});
		return deferred.promise;
	}	// end of ChapterService-----------------------------------------------------------------------------------
	
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
	}// -------end of BookService-------------------------------------------------------------------------------------------------

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
		gapi.client.practiceExamService.updatePracticeExam(exam).execute(function(resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	}

	PracticeExamService.dislikeCount = function(exam) {
		var deferred = $q.defer();
		gapi.client.practiceExamService.updatePracticeExam(exam).execute(function(resp) {
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

	PracticeExamResultService.getPracticeExamResultbyID = function(email_id) {
		var deferred = $q.defer();
		gapi.client.practiceExamResultService.getPracticeExamResultbyID({
			'email_id' : email_id
		}).execute(function(resp) {
			deferred.resolve(resp.items);
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
					deferred.resolve(resp);
					$log.debug("resp :" + angular.toJson(resp));
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
		gapi.client.instituteService.getInstituteById({
			'id' : selectedInstituteId
		}).execute(function(resp) {
			$log.debug("resp:" + angular.toJson(resp));
			deferred.resolve(resp.result);
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

	// End of InstituteService

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

	QuestionService.updateQuestion = function(ques) {
		var deferred = $q.defer();
		gapi.client.questionService.updateQuestion(ques)
				.execute(
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

	return serviceFactory;
}
