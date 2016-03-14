var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "xeditable", "ui.bootstrap", "ui.router",
		'md.data.table', 'ngResource', 'textAngular', 'ngRoute', 'ngStorage',
		"ngAria", 'directive.g+signin' ]);

app.constant('boardList', [ "State Board", "CBSE", "ICSE" ]);

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette(
			'red').warnPalette('pink').backgroundPalette('grey');
});

app.config(function($logProvider) {
	// $logProvider.debugEnabled(false);
	$logProvider.debugEnabled(true);// this is default
});
app
		.config(function($stateProvider, $urlRouterProvider) {
			// This adds config 2
			// For any unmatched url, redirect to /state1
			$urlRouterProvider.otherwise("/i/home");

			// Now set up the states
			$stateProvider
					.state('index', {
						url : "/i",
						templateUrl : '/index_view.html',
						controller : 'indexCtr'
					})
					.state('index.home', {
						url : "/home",
						templateUrl : '/home.html',
						controller : 'homeCtr'
					})
					.state('index.exam', {
						url : "/exam",
						templateUrl : '/app/exam/exam_module.html',
						controller : 'examModuleCtr'
					})
					.state('index.exam.practiceExamResultView', {
						url : "/practiceExamResultView",
						templateUrl : '/app/exam/practiceExamResult_view.html',
						controller : 'practiceExamResultCtr'
					})
					.state('index.exam.addnewquestion', {
						url : "/addnewquestion",
						templateUrl : '/app/exam/newQuestion_add.html',
						controller : 'addNewQuestionCtr',
						params : {
							sourceSate : null,
							selectedExamId : null
						}
					})
					.state('index.exam.questionlist', {
						url : "/question_list",
						templateUrl : '/app/exam/question_list.html',
						controller : 'questionListCtr'
					})
					.state('index.exam.editquestion', {
						url : "/question_edit",
						templateUrl : '/app/exam/question_edit.html',
						controller : 'editQuestionCtr',
						params : {
							sourceSate : null,
							selectedExamId : null,
							selectedQuestionId : null,
							selectedQuestion : null
						}
					})
					.state('index.exam.addpracticeexam', {
						url : "/addpracticeexam",
						templateUrl : '/app/exam/practiceExam_add.html',
						controller : 'addPracticeExamCtr'
					})
					.state('index.exam.listpracticeexam', {
						url : "/listpracticeexam",
						templateUrl : '/app/exam/practiceExam_list.html',
						controller : 'practiceExamListCtr'
					})
					.state('index.exam.viewpracticeexam', {
						templateUrl : '/app/exam/practiceExam_list.html',
						controller : 'practiceExamListCtr'
					})
					.state('index.exam.editpracticeexam', {
						url : "/editpracticeexam/:selectedExamId",
						templateUrl : '/app/exam/practiceExam_edit.html',
						controller : 'editPracticeExamCtr',
						params : {

							addedQ : null,
							updatedQ : null,
							selectedExamId : null,
							selectedQuestionId : null,
							addFlag : null,
							editFlag : null
						}

					})
					.state('index.exam.practiceexamtest', {
						url : "/practiceexam/:selectedExamId",
						templateUrl : '/app/exam/practiceExamTest.html',
						controller : 'practiceExamTestCtr'
					})
					.state('index.exam.view', {
						url : "/exam/view",
						templateUrl : '/app/exam/exam_view.html',
						controller : 'examCtr'
					})
					.state('index.userQuesAnsView', {
						url : "/userQuesAnsView/:selectedExamId",
						templateUrl : '/app/exam/userQuesAns_view.html',
						controller : 'userQuesAnsViewCtr'
					})
					.state('index.exam.question', {
						url : "/question",
						templateUrl : '/app/question/question_add.html',
						controller : 'questionCtr'
					})
					.state('index.examdemo', {
						url : "/examdemo",
						templateUrl : '/app/examdemo/examdemo_module.html',
						controller : 'examDemoModuleCtr'
					})
					.state('index.examdemo.science', {
						url : "/science",
						templateUrl : '/app/examdemo/examdemo_science.html',
						controller : 'examDemoScienceCtr'
					})
					.state('index.examdemo.math', {
						url : "/math",
						templateUrl : '/app/examdemo/examdemo_math.html',
						controller : 'examDemoMathCtr'
					})
					.state('index.myprofile', {
						url : "/myprofile",
						templateUrl : '/app/myprofile/myprofile.html',
						controller : 'myProfileCtr'
					})
					.state('index.quickstart', {
						url : "/quickstart",
						templateUrl : '/app/myprofile/quickstart.html',
						controller : 'quickstartCtr'
					})
					.state('index.blobstore', {
						url : "/blobstore",
						templateUrl : '/app/blobstore/myCorn.html',
						controller : 'blobstoreCtr'
					})
					.state('index.email', {
						url : "/email",
						templateUrl : '/app/myprofile/testemail.html',
						controller : ''
					})
					.state('index.institute', {
						url : "/institute",
						templateUrl : '/app/institute/institute_module.html',
						controller : 'instituteModuleCtr'
					})
					.state('index.institute.addInfo', {
						url : "/institute/addInfo",
						templateUrl : '/app/institute/institute_addInfo.html',
						controller : 'instituteAddInfoCtr'
					})
					.state(
							'index.institute.addAdmins',
							{
								url : "/institute/addAdmins/:currentInstID",
								templateUrl : '/app/institute/institute_addAdmins.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'index.institute.addTeachers',
							{
								url : "/institute/addTeachers/:currentInstID",
								templateUrl : '/app/institute/institute_addTeachers.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'index.institute.addStudents',
							{
								url : "/institute/addStudents/:currentInstID",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteAddStudCtr'
							})
					.state(
							'index.institute.addStandards',
							{
								url : "/institute/addStandards/:currentInstID",
								templateUrl : '/app/institute/institute_addStandards.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'index.institute.addDivisions',
							{
								url : "/institute/addDivisions/:currentInstID/:currentStdID",
								templateUrl : '/app/institute/institute_addDivisions.html',
								controller : 'instituteAddInfoCtr'
							})
					.state(
							'index.institute.addSubjects',
							{
								url : "/institute/addSubjects/:currentInstID/:currentStdID/:currentDivID",
								templateUrl : '/app/institute/institute_addSubjects.html',
								controller : 'instituteAddInfoCtr'
							})
					.state('index.institute.list', {
						url : "/list",
						templateUrl : '/app/institute/institute_list.html',
						controller : 'instituteListCtr'
					})
					.state('index.institute.view', {
						url : "/view/:currentInstID",
						templateUrl : '/app/institute/institute_view.html',
						controller : 'instituteViewCtr'
					})
					.state(
							'index.institute.view.view_admins',
							{
								url : "/view_admin",
								templateUrl : '/app/institute/institute_view_admins.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_admins.addadmins',
							{
								url : "/addadmins",
								templateUrl : '/app/institute/institute_addAdmins.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_teachers',
							{
								url : "/view_teachers",
								templateUrl : '/app/institute/institute_view_teachers.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_teachers.addteachers',
							{
								url : "/addteachers",
								templateUrl : '/app/institute/institute_addTeachers.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_students',
							{
								url : "/view_students",
								templateUrl : '/app/institute/institute_view_students.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_students.addstudents',
							{
								url : "/addstudents",
								templateUrl : '/app/institute/institute_addStudents.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_standards',
							{
								url : "/view_standards/:selectedStandardId",
								templateUrl : '/app/institute/institute_view_standards.html',
								controller : 'instituteViewCtr',
							})
					.state(
							'index.institute.view.view_standards.addstandards',
							{
								url : "/addstandards/:currentInstID",
								templateUrl : '/app/institute/institute_addStandards.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_divisions',
							{
								url : "/view_divisions/:selectedStdID/:selectedDivisionId/:selectedStdName",
								templateUrl : '/app/institute/institute_view_divisions.html',
								controller : 'instituteViewCtr',
							})
					.state(
							'index.institute.view.view_divisions.adddivisions',
							{
								url : "/adddivisions/:currentInstID/:currentStdID",
								templateUrl : '/app/institute/institute_addDivisions.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.view_subjects',
							{
								url : "/view_subjects/:selectedStdID/:selectedDivID/:selectedSubjectId/:selectedStdName/:selectedDivName/",
								templateUrl : '/app/institute/institute_view_subjects.html',
								controller : 'instituteViewCtr',
							})
					.state(
							'index.institute.view.view_subjects.addsubjects',
							{
								url : "/addsubjects/:currentInstID/:currentStdID/:currentDivID",
								templateUrl : '/app/institute/institute_addSubjects.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.editInstitute',
							{
								url : "/editInstitute",
								templateUrl : '/app/institute/institute_editInstitute.html',
								controller : 'instituteViewCtr'
							})
					.state(
							'index.institute.view.studentByStd',
							{
								url : "/viewStudentByStd/:selectedStdName/:selectedDivName/:selectedSubName",
								templateUrl : '/app/institute/institute_view_studentByStd.html',
								controller : 'instituteViewCtr',

							})
					.state('index.attendance', {
						url : "/attendance",
						templateUrl : '/app/attendance/attendance_module.html',
						controller : 'attendanceModuleCtr'
					})
					.state('index.attendance.add', {
						url : "/addAttendance",
						templateUrl : '/app/attendance/attendance_add.html',
						controller : 'attendanceAddCtr'
					})
					.state(
							'index.attendance.reportByStudent',
							{
								url : "/attendanceReportbyStudent",
								templateUrl : '/app/attendance/attendance_reportByStudent.html',
								controller : 'reportByStudentCtr'
							})
					.state(
							'index.attendance.reportBySubjectClass',
							{
								url : "/attendanceReportbyClass",
								templateUrl : '/app/attendance/attendance_reportBySubjectClass.html',
								controller : 'reportBySubjectClassCtr',
							})
					.state('index.report', {
						url : "/report",
						templateUrl : '/app/report/report_module.html',
						controller : 'reportModuleCtr'
					})
					.state('index.report.display', {
						url : "/report/display",
						templateUrl : '/app/report/display_report.html',
						controller : 'displayReportCtr'
					})
					.state('index.chapter', {
						url : "/chapter",
						templateUrl : "/app/chapter/chapter_module.html",
						controller : 'chapterModuleCtr'
					})
					.state('index.chapter.add', {
						url : "/add",
						templateUrl : "/app/chapter/chapter_add.html",
						controller : 'chapterAddCtr'
					})
					.state('index.chapter.view', {
						url : "/view/:selectedChapterId",
						templateUrl : "/app/chapter/chapter_view.html",
						controller : 'chapterViewCtr'
					})
					.state('index.chapter.edit', {
						url : "/edit/:selectedChapterId",
						templateUrl : "/app/chapter/chapter_edit.html",
						controller : 'chapterEditCtr'
					})
					.state('index.book', {
						url : "/book",
						templateUrl : "/app/book/book_module.html",
						controller : 'bookModuleCtr'
					})
					.state('index.book.add', {
						url : "/add",
						templateUrl : "/app/book/book_add.html",
						controller : 'bookAddCtr'
					})
					.state('index.book.list', {
						url : "/list",
						templateUrl : "/app/book/book_list.html",
						controller : 'bookListCtr'
					})
					.state('index.book.chapterList', {
						url : "/chapterList/:selectedBookId",
						templateUrl : "/app/book/book_chapterList.html",
						controller : 'book_chapterListCtr'
					})
					.state('index.book.chapterList.addcomment', {
						url : "/addcomment/:selectedBookId",
						templateUrl : "/app/book/book_addComments.html",
						controller : 'bookCommentAddCtr'
					})
					.state('index.book.view', {
						url : "/view/:selectedBookId/:selectedChapterId",
						templateUrl : "/app/book/book_viewChapterContent.html",
						controller : 'book_viewChapterContentCtr'
					})
					.state('index.book.standard', {
						url : "/standard",
						templateUrl : "/app/book/standard_book.html",
						controller : 'standardBookCtr'
					})
					.state('index.book.standard_chapterList', {
						url : "/standard_chapterList/:selectedBookId",
						templateUrl : "/app/book/standard_chapterList.html",
						controller : 'standard_chapterListCtr'
					})
					.state(
							'index.book.standard_view',
							{
								url : "/standard_view/:selectedBookId/:selectedChapterId",
								templateUrl : "/app/book/standard_viewChapterContent.html",
								controller : 'standard_viewChapterContentCtr'
							})
					.state('index.login', {
						url : "/login",
						templateUrl : '/app/login/login_module.html',
						controller : 'indexCtr'
					})
					.state('index.updatemyprofile', {
						url : "/updatemyprofile",
						templateUrl : '/app/myprofile/myprofile_update.html',
						controller : 'updateMyProfileCtr'
					})
					.state('index.newUserTeacher', {
						url : "/newUserTeacher",
						templateUrl : '/app/login/newUser.html',
						controller : 'loginModuleCtr'
					})
					.state('index.newUserStudent', {
						url : "/newUserStudent",
						templateUrl : '/app/login/newUser.html',
						controller : 'newUserStudentCtr'
					})
					.state('index.myBooks', {
						url : "/myBooks",
						templateUrl : '/app/myBooks/myBooks_module.html',
						controller : 'myBooksModuleCtr'
					})
					.state(
							'index.myPracticeExams',
							{
								url : "/myPracticeExams",
								templateUrl : '/app/myPracticeExams/myPracticeExams_module.html',
								controller : 'myPracticeExamsModuleCtr'
							})
					.state('index.student', {
						url : "/student",
						templateUrl : '/app/student/student_module.html',
						controller : 'studentModuleCtr'
					})
					.state('index.student.add', {
						url : "/add",
						templateUrl : '/app/student/student_add.html',
						controller : 'studentPageCtr'
					})
					.state('index.student.list', {
						url : "/list",
						templateUrl : '/app/student/student_list.html',
						controller : 'studentListPageCtr'
					})
					.state('index.syllabus', {
						url : "/syllabus",
						templateUrl : '/app/syllabus/syllabus_module.html',
						controller : 'syllabusModuleCtr'

					})
					.state(
							'index.syllabus.addsyllabus',
							{

								url : "/addsyllabus",
								templateUrl : '/app/syllabus/syllabus_addsyllabus.html',
								controller : 'syllabusAddCtr'

							})
					.state(
							'index.syllabus.viewsyllabus',
							{
								url : "/viewsyllabus",
								templateUrl : '/app/syllabus/syllabus_viewsyllabus.html',
								controller : 'syllabusViewCtr'

							})
					.state(
							'index.syllabus.listsyllabus',
							{
								url : "/listsyllabus",
								templateUrl : '/app/syllabus/syllabus_listsyllabus.html',
								controller : 'syllabusListCtr'

							})
					.state('index.book.addselectedbook', {
						url : "/addselectedbook/:addselectedBookId",
						templateUrl : '/app/book/book_list.html',
						controller : 'bookListCtr'

					})
					.state(
							'index.certificateMgmt',
							{
								url : "/certificateMgmt",
								templateUrl : '/app/certificateMgmt/certificate_module.html',
								controller : 'certificateModuleCtr'
							})
					.state(
							'index.certificateMgmt.generateTemplate',
							{
								url : "/generateTemplate/:selectedStudID/:selectedfirstName/:selectedlastName/:selectedExam/:selectedScore",
								templateUrl : '/app/certificateMgmt/generateTemplate.html',
								controller : 'generateTemplateCtr'
							})
					.state(
							'index.certificateMgmt.generateCertificate',
							{
								url : "/generateCertificate",
								templateUrl : '/app/certificateMgmt/generateCertificate.html',
								controller : 'generateCertificateCtr'
							})
					.state(
							'index.certificateMgmt.viewCertificate',
							{
								url : "/viewCertificate",
								templateUrl : '/app/certificateMgmt/viewCertificate.html',
								controller : 'viewCertificateCtr'
							})
					.state(
							'index.admissionMgmt',
							{
								url : "/admissionMgmt",
								templateUrl : '/app/admissionMgmt/admission_module.html',
								controller : 'admissionMgmtModuleCtr'
							}).state('index.applicant.add', {
						url : "/addApplicant",
						templateUrl : '/app/admissionMgmt/applicant_add.html',
						controller : 'applicantAddCtr'
					}).state('index.applicant.list', {
						url : "/applicantList",
						templateUrl : '/app/admissionMgmt/applicant_list.html',
						controller : 'applicantListCtr'
					});

		});

app.filter('unique', function() {
	return function(input, key) {
		var unique = {};
		var uniqueList = [];
		for (var i = 0; i < input.length; i++) {
			if (typeof unique[input[i][key]] == "undefined") {
				unique[input[i][key]] = "";
				uniqueList.push(input[i]);
			}
		}
		return uniqueList;
	};
});