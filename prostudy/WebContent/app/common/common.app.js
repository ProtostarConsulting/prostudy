var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "xeditable", "ui.bootstrap", "ui.router",
		'md.data.table', 'ngResource', 'textAngular', 'ngRoute', 'ngStorage', "ngAria",
		'directive.g+signin' ]);

app.constant('boardList', ["State Board", "CBSE", "ICSE"]);
app.constant('installmentList', [1,2,3]);
app.constant('partnerSchoolLevels', ["Primary", "Secondary", "Higher-Secondary", "School", "College"]);
/*app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette(
			'red').warnPalette('pink').backgroundPalette('grey');
});*/

app.config(function($mdThemingProvider) {

	/*
	 * Available palettes: red, pink, purple, deep-purple, indigo, blue,
	 * light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange,
	 * deep-orange, brown, grey, blue-grey
	 */
	$mdThemingProvider.theme('default').primaryPalette('light-blue')
			.accentPalette('pink').warnPalette('red');;
	$mdThemingProvider.theme('red').primaryPalette('red').accentPalette(
			'orange').warnPalette('blue');
	$mdThemingProvider.theme('pink').primaryPalette('pink').accentPalette(
			'orange').warnPalette('red');
	$mdThemingProvider.theme('purple').primaryPalette('purple').accentPalette(
			'grey').warnPalette('red');
	$mdThemingProvider.theme('deep-purple').primaryPalette('deep-purple').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('indigo').primaryPalette('indigo').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('blue').primaryPalette('blue').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('light-blue').primaryPalette('light-blue').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('cyan').primaryPalette('cyan').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('teal').primaryPalette('teal').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('green').primaryPalette('green').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('light-green').primaryPalette('light-green').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('lime').primaryPalette('lime').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('yellow').primaryPalette('yellow').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('amber').primaryPalette('amber').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('deep-orange').primaryPalette('deep-orange').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('brown').primaryPalette('brown').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('grey').primaryPalette('grey').accentPalette(
	'grey').warnPalette('red');
	$mdThemingProvider.theme('blue-grey').primaryPalette('blue-grey').accentPalette(
	'grey').warnPalette('red');
	

	// This is the absolutely vital part, without this, changes will not cascade
	// down through the DOM.
	$mdThemingProvider.alwaysWatchTheme(true);
});

app.config(function($logProvider) {
	// $logProvider.debugEnabled(false);
	$logProvider.debugEnabled(true);// this is default
});
app.config(function($stateProvider, $urlRouterProvider) {
	// This adds config 2
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");

	// Now set up the states
	$stateProvider.state('home', {
		url : "/home",
		templateUrl : '/home.html',
		controller : 'homeCtr'
	}).state('welcome', {
		url : "/welcome",
		templateUrl : '/welcome.html',
		controller : 'homeCtr'
	}).state('setup', {
		url : "/setup",
		templateUrl : '/app/setup/setup_module.html',
		controller : 'setupModuleCtr'
	}).state('setup.authorityView', {
		url : "/viewauthority",
		templateUrl : '/app/authority/authority_view.html',
		controller : 'authorityViewCtr'
	}).state('setup.changeTheme', {
		url : "/changeTheme/:currentInstID",
		templateUrl : '/app/setup/setup_changetheme.html',
		controller : 'changeThemeCtr1'
	}).state('setup.instituteView', {
		url : "/instituteView/:currentInstID",
		templateUrl : '/app/institute/institute_view.html',
		controller : 'instituteViewCtr'	
	})
	
	.state('setup.addInstituteUser', {
		url : "/addInstituteUser",
		templateUrl : '/app/setup/addInstituteUser.html',
		controller : 'addInstituteUserCtr'	
	})
	.state('setup.editInstitute', {
		url : "/editInstitute",
		templateUrl : '/app/setup/editInstitute.html',
		controller : 'editInstituteCtr'	
	})
	.state('setup.instituteUsersList', {
		url : "/instituteUsersList",
		templateUrl : '/app/setup/InstituteUserList.html',
		controller : 'instituteUserListCtr'	
	})
	.state('setup.changePlan', {
		url : "/changePlan",
		templateUrl : '/app/setup/changeplan.html',
		controller : 'changePlanCtr'	
	})
	.state('setup.setLogo', {
		url : "/setLogo",
		templateUrl : '/app/setup/setLogo.html',
		controller : 'setLogoCtr'	
	})
	.state('exam', {
		url : "/exam",
		templateUrl : '/app/exam/exam_module.html',
		controller : 'examModuleCtr'
	}).state('exam.addnewquestion', {
		url : "/addnewquestion/:flag",
		templateUrl : '/app/exam/newQuestion_add.html',
		controller : 'addNewQuestionCtr',
		params : {
			sourceSate : null,
			selectedExamId : null,
			selectedStd : null,
			selectedDiv : null,
			selectedSub : null,
			selectedBoard : null
		}
	}).state('exam.questionlist', {
		url : "/question_list",
		templateUrl : '/app/exam/question_list.html',
		controller : 'questionListCtr'
	}).state('exam.editquestion', {
		url : "/question_edit",
		templateUrl : '/app/exam/question_edit.html',
		controller : 'editQuestionCtr',
		params : {
			sourceSate : null,
			selectedExamId : null,
			selectedQuestionId : null,
			selectedQuestion : null
			
		}
	}).state('exam.addpracticeexam', {
		url : "/addpracticeexam",
		templateUrl : '/app/exam/practiceExam_add.html',
		controller : 'addPracticeExamCtr'
	}).state('exam.listpracticeexam', {
		url : "/listpracticeexam",
		templateUrl : '/app/exam/practiceExam_list.html',
		controller : 'practiceExamListCtr'
	}).state('exam.viewpracticeexam', {
		templateUrl : '/app/exam/practiceExam_list.html',
		controller : 'practiceExamListCtr'
	}).state('exam.editpracticeexam', {
		url : "/editpracticeexam/:selectedExamId",
		templateUrl : '/app/exam/practiceExam_edit.html',
		controller : 'editPracticeExamCtr',
		params : {
			
			addedQ : null,
			updatedQ : null,
			selectedExamId : null,
			selectedQuestionId : null,
			addFlag : null,
			editFlag : null,
			selectedStd : null,
			selectedDiv : null,
			selectedSub : null,
			selectedBoard :null
		}
	
	}).state('exam.practiceexamtest', {
		url : "/practiceexam/:selectedExamId",
		templateUrl : '/app/exam/practiceExamTest.html',
		controller : 'practiceExamTestCtr'
	}).state('exam.view', {
		url : "/exam/view",
		templateUrl : '/app/exam/exam_view.html',
		controller : 'examCtr'
	}).state('userQuesAnsView', {
		url : "/userQuesAnsView/:selectedExamId/:selectedResultId/:flag",
		templateUrl : '/app/exam/userQuesAns_view.html',
		controller : 'userQuesAnsViewCtr'
	}).state('exam.question', {
		url : "/question",
		templateUrl : '/app/question/question_add.html',
		controller : 'questionCtr'
	}).state('examdemo', {
		url : "/examdemo",
		templateUrl : '/app/examdemo/examdemo_module.html',
		controller : 'examDemoModuleCtr'
	}).state('examdemo.science', {
		url : "/science",
		templateUrl : '/app/examdemo/examdemo_science.html',
		controller : 'examDemoScienceCtr'
	}).state('examdemo.math', {
		url : "/math",
		templateUrl : '/app/examdemo/examdemo_math.html',
		controller : 'examDemoMathCtr'
	}).state('myprofile', {
		url : "/myprofile",
		templateUrl : '/app/myprofile/myprofile.html',
		controller : 'myProfileCtr'
	}).state('quickstart', {
		url : "/quickstart",
		templateUrl : '/app/myprofile/quickstart.html',
		controller : 'quickstartCtr'
	}).state('email', {
		url : "/email",
		templateUrl : '/app/myprofile/testemail.html',
		controller : ''
	}).state('institute', {
		url : "/institute",
		templateUrl : '/app/institute/institute_module.html',
		controller : 'instituteModuleCtr'
	}).state('institute.addauthority', {
		url : "/addauthority/:currentInstID",
		templateUrl : '/app/institute/authority_add.html',
		controller : 'authorityAddCtr'
	})
/*	.state('institute.addInfo', {
		url : "/institute/addInfo",
		templateUrl : '/app/institute/institute_addInfo.html',
		controller : 'instituteAddInfoCtr'
	})
*/	
	.state('institute.addAdmins', {
		url : "/institute/addAdmins/:currentInstID",
		templateUrl : '/app/institute/institute_addAdmins.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.addTeachers', {
		url : "/institute/addTeachers/:currentInstID",
		templateUrl : '/app/institute/institute_addTeachers.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.addStudents', {
		url : "/institute/addStudents",
		templateUrl : '/app/institute/institute_addStudents.html',
		controller : 'instituteAddStudCtr',
		params : {
			currentInstID : null		
		}
	}).state('institute.studFillbasics', {
		url : "/institute/fillbasics",
		templateUrl : '/app/institute/institute_student_fillbasics.html',
		controller : 'instituteStudentFillbasicsCtr',
		params : {
			currstud : null	,
			currentInstID: null
		}
	})
	.state('institute.addStandards', {
		url : "/institute/addStandards/:currentInstID",
		templateUrl : '/app/institute/institute_addStandards.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.addDivisions', {
		url : "/institute/addDivisions/:currentInstID/:currentStdID",
		templateUrl : '/app/institute/institute_addDivisions.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.addSubjects', {
		url : "/institute/addSubjects/:currentInstID/:currentStdID/:currentDivID",
		templateUrl : '/app/institute/institute_addSubjects.html',
		controller : 'instituteAddInfoCtr'
	})
/*	.state('institute.list', {
		url : "/list",
		templateUrl : '/app/institute/institute_list.html',
		controller : 'instituteListCtr'
	})
*/	
	.state('institute.view', {
		url : "/view",
		templateUrl : '/app/institute/institute_view.html',
		controller : 'instituteViewCtr'			
	}).state('institute.list_view', {
		url : "/list_view/:selectedInstituteID",
		templateUrl : '/app/institute/institute_list_view.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.editInstitute', {
		url : "/editInstitute",
		templateUrl : '/app/institute/institute_editInstitute.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.studentBySubject', {
		url : "/viewstudentBySubject/:selectedStdName/:selectedDivName/:selectedSubName/:selectedSubId",
		templateUrl : '/app/institute/institute_view_studentsBySubject.html',
		controller : 'instituteListViewCtr',
	}).state('institute.list_view.view_admin', {
		url : "/view_admin",
		templateUrl : '/app/institute/institute_view_admins.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_admin.addadmins', {
		url : "/addadmins",
		templateUrl : '/app/institute/institute_addAdmins.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_teachers', {
		url : "/view_teachers",
		templateUrl : '/app/institute/institute_view_teachers.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_teachers.addteachers', {
		url : "/addteachers",
		templateUrl : '/app/institute/institute_addTeachers.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_students', {
		url : "/view_students",
		templateUrl : '/app/institute/institute_view_students.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_students.addstudents', {
		url : "/addstudents",
		templateUrl : '/app/institute/institute_addStudents.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_standards', {
		url : "/view_standards/:selectedStdID",
		templateUrl : '/app/institute/institute_view_standards.html',
		controller : 'instituteListViewCtr',
	}).state('institute.list_view.view_standards.addstandards', {
		url : "/addstandards/:currentInstID",
		templateUrl : '/app/institute/institute_addStandards.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.view_divisions', {
		url : "/view_divisions/:selectedStdID/:selectedDivisionId/:selectedStdName",
		templateUrl : '/app/institute/institute_view_divisions.html',
		controller : 'instituteListViewCtr',
	}).state('institute.list_view.view_divisions.adddivisions', {
		url : "/adddivisions/:currentInstID/:currentStdID",
		templateUrl : '/app/institute/institute_addDivisions.html',
		controller : 'instituteListViewCtr'
	})		
	.state('institute.list_view.view_subjects', {
		url : "/view_subjects/:selectedDivID/:selectedStdName/:selectedDivName/:selectedSubName",
		templateUrl : '/app/institute/institute_view_subjects.html',
		controller : 'instituteListViewCtr',
	}).state('institute.list_view.view_subjects.addsubjects', {
		url : "/addsubjects/:currentInstID/:selectedDivID",
		templateUrl : '/app/institute/institute_addSubjects.html',
		controller : 'instituteListViewCtr'
	}).state('institute.list_view.editUser', {
		url : "/editUser/:selectedEmailID/:currentInstID",
		templateUrl : '/app/institute/institute_editUser.html',
		controller : 'userEditCtr',
	}).state('institute.view.view_admins', {
		url : "/view_admin",
		templateUrl : '/app/institute/institute_view_admins.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_admins.addadmins', {
		url : "/addadmins",
		templateUrl : '/app/institute/institute_addAdmins.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_teachers', {
		url : "/view_teachers",
		templateUrl : '/app/institute/institute_view_teachers.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_teachers.addteachers', {
		url : "/addteachers",
		templateUrl : '/app/institute/institute_addTeachers.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_students', {
		url : "/view_students",
		templateUrl : '/app/institute/institute_view_students.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_students.addstudents', {
		url : "/addstudents",
		templateUrl : '/app/institute/institute_addStudents.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_standards', {
		url : "/view_standards/:selectedStdID",
		templateUrl : '/app/institute/institute_view_standards.html',
		controller : 'instituteViewCtr',
	}).state('institute.view.view_standards.addstandards', {
		url : "/addstandards/:currentInstID",
		templateUrl : '/app/institute/institute_addStandards.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_divisions', {
		url : "/view_divisions/:selectedStdID/:selectedDivisionId/:selectedStdName",
		templateUrl : '/app/institute/institute_view_divisions.html',
		controller : 'instituteViewCtr',
	}).state('institute.view.view_divisions.adddivisions', {
		url : "/adddivisions/:currentInstID/:currentStdID",
		templateUrl : '/app/institute/institute_addDivisions.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.view_subjects', {
		url : "/view_subjects/:selectedStdID/:selectedDivID/:selectedSubjectId/:selectedStdName/:selectedDivName/:selectedSubId",
		templateUrl : '/app/institute/institute_view_subjects.html',
		controller : 'instituteViewCtr',
	}).state('institute.view.view_subjects.addsubjects', {
		url : "/addsubjects/:currentInstID/:selectedDivID",
		templateUrl : '/app/institute/institute_addSubjects.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.editInstitute', {
		url : "/editInstitute",
		templateUrl : '/app/institute/institute_editInstitute.html',
		controller : 'instituteViewCtr'
	}).state('institute.view.studentBySubject', {
		url : "/viewstudentBySubject/:selectedStdName/:selectedDivName/:selectedSubName/:selectedSubId",
		templateUrl : '/app/institute/institute_view_studentsBySubject.html',
		controller : 'instituteViewCtr'	
	}).state('institute.view.studentBySubject.addstudentsByStd', {
		url : "/addstudentsByStd",
		templateUrl : '/app/institute/institute_addStudents.html',
		controller : 'instituteViewCtr',
	}).state('institute.view.editUser', {
		url : "/editUser/:selectedEmailID/:currentInstID",
		templateUrl : '/app/institute/institute_editUser.html',
		controller : 'userEditCtr',
	})	.state('institute.view.viewUser', {
		url : "/viewUser/:selectedID/:selectedInstituteID",
		templateUrl : '/app/institute/institute_viewUser.html',
		controller : 'userViewCtr',
	}).state('attendance', {
		url : "/attendance",
		templateUrl : '/app/attendance/attendance_module.html',
		controller : 'attendanceModuleCtr'
	}).state('attendance.add', {
		url : "/addAttendance",
		templateUrl : '/app/attendance/attendance_add.html',
		controller : 'attendanceAddCtr'
	}).state('attendance.reportByStudent', {
		url : "/attendanceReportbyStudent",
		templateUrl : '/app/attendance/attendance_reportByStudent.html',
		controller : 'reportByStudentCtr'
	}).state('attendance.reportBySubjectClass', {
		url : "/attendanceReportbyClass",
		templateUrl : '/app/attendance/attendance_reportBySubjectClass.html',
		controller : 'reportBySubjectClassCtr',  
	}).state('report', {
		url : "/report",
		templateUrl : '/app/report/report_module.html',
		controller : 'reportModuleCtr'
	}).state('report.display', {
		url : "/report/display",
		templateUrl : '/app/report/display_report.html',
		controller : 'displayReportCtr'
	}).state('chapter', {
		url : "/chapter",
		templateUrl : "/app/chapter/chapter_module.html",
		controller : 'chapterModuleCtr'
	}).state('chapter.add', {
		url : "/add",
		templateUrl : "/app/chapter/chapter_add.html",
		controller : 'chapterAddCtr'
	}).state('chapter.list', {
		url : "/list",
		templateUrl : "/app/chapter/chapter_list.html",
		controller : 'chapterListCtr'
	}).state('chapter.edit', {
		url : "/edit/:selectedChapterId",
		templateUrl : "/app/chapter/chapter_edit.html",
		controller : 'chapterListCtr'
	}).state('chapter.view', {
		url : "/view/:selectedChapterId",
		templateUrl : "/app/chapter/chapter_view.html",
		controller : 'chapterViewCtr'
	}).state('book', {
		url : "/book",
		templateUrl : "/app/book/book_module.html",
		controller : 'bookModuleCtr'
	}).state('book.add', {
		url : "/add",
		templateUrl : "/app/book/book_add.html",
		controller : 'bookAddCtr'
	}).state('book.list', {
		url : "/list",
		templateUrl : "/app/book/book_list.html",
		controller : 'bookListCtr',
		params : {
			standard : null	,
			division : null,
			subject : null
		}
	}).state('book.edit', {
		url : "/edit/:selectedBookId",
		templateUrl : "/app/book/book_edit.html",
		controller : 'bookEditCtr',
		params : {
			standard : null	,
			division : null,
			subject : null
		}
	}).state('book.chapterList', {
		url : "/chapterList/:selectedBookId/:flag",
		templateUrl : "/app/book/book_chapterList.html",
		controller : 'book_chapterListCtr'
	}).state('book.chapterList.addcomment', {
		url : "/addcomment/:selectedBookId",
		templateUrl : "/app/book/book_addComments.html",
		controller : 'bookCommentAddCtr'
	}).state('book.view', {
		url : "/view/:selectedBookId/:selectedChapterId",
		templateUrl : "/app/book/book_viewChapterContent.html",
		controller : 'book_viewChapterContentCtr'
	}).state('book.standard', {
		url : "/standard",
		templateUrl : "/app/book/standard_book.html",
		controller : 'standardBookCtr'
	}).state('book.standard_chapterList', {
		url : "/standard_chapterList/:selectedBookId",
		templateUrl : "/app/book/standard_chapterList.html",
		controller : 'standard_chapterListCtr'
	}).state('book.standard_view', {
		url : "/standard_view/:selectedBookId/:selectedChapterId",
		templateUrl : "/app/book/standard_viewChapterContent.html",
		controller : 'standard_viewChapterContentCtr'
	}).state('login', {
		url : "/login",
		templateUrl : '/app/login/login_module.html',
		controller : 'loginModuleCtr'
	}).state('updatemyprofile', {
		url : "/updatemyprofile/:flag",
		templateUrl : '/app/myprofile/myprofile_update.html',
		controller : 'updateMyProfileCtr'
	}).state('newUserTeacher', {
		url : "/newUserTeacher",
		templateUrl : '/app/login/newUser.html',
		controller : 'loginModuleCtr'
	}).state('newUserStudent', {
		url : "/newUserStudent",
		templateUrl : '/app/login/newUser.html',
		controller : 'newUserStudentCtr'
	}).state('favourite', {
		url : "/favourite",
		templateUrl : '/app/favourite/favourite_module.html',
		controller : 'favouriteModuleCtr'
	}).state('favourite.myBooks', {
		url : "/myBooks",
		templateUrl : '/app/favourite/myBooks.html',
		controller : 'myBooksCtr'
	}).state('favourite.myPracticeExams', {
		url : "/myPracticeExams",
		templateUrl : '/app/favourite/myPracticeExams.html',
		controller : 'myPracticeExamsCtr'
	}).state('favourite.practiceExamResultView', {
		url : "/practiceExamResultView/:selectedStudEmail",
		templateUrl : '/app/favourite/practiceExamResult_view.html',
		controller : 'practiceExamResultCtr'
	}).state('student', {
		url : "/student",
		templateUrl : '/app/student/student_module.html',
		controller : 'studentModuleCtr'
	}).state('student.add', {
		url : "/addstudent",
		templateUrl : '/app/institute/institute_addStudents.html',
		controller : 'instituteAddStudCtr'
	}).state('student.list', {
		url : "/list",
		templateUrl : '/app/student/student_list.html',
		controller : 'studentListPageCtr'
	}).state('student.edit', {
		url : "/edit",
		templateUrl : '/app/institute/institute_editUser.html',
		controller : 'userEditCtr',
		params : {
			selectedEmailID : null	,
			currentInstID : null			
		}
	}).state('student.view', {
		url : "/view",
		templateUrl : '/app/student/student_view.html',
		controller : 'studentViewCtr',
		params : {
			selectedStudEmailId : null,
			selectedID : null
		}	
	}).state('student.addstudentpayment', {
		url : "/addstudentpayment",
		templateUrl : '/app/student/student_addpayment.html',
		controller : 'studentAddPaymentCtr',
		params : {
			selectedStud : null
		}
	}).state('student.studentpaymentlist', {
		url : "/studentPaymentlist",
		templateUrl : '/app/student/student_paymentlist.html',
		controller : 'studentPaymentListCtr',
	}).state('student.studentInstallmentedit', {
		url : "/studentInstallmentedit",
		templateUrl : '/app/student/student_installmentedit.html',
		controller : 'studentInstallmentEditCtr',
		params : {
			selectedInstallment : null,
			selectedPaymentId : null
		}
	}).state('student.studentinstallmentlist', {
		url : "/studentinstallmentlist/:selectedPaymentId",
		templateUrl : '/app/student/student_installmentlist.html',
		controller : 'studentInstallmentListCtr',
	
	}).state('student.scheduleStudentExam', {
		url : "/scheduleStudentExam",
		templateUrl : '/app/student/student_scheduleExam.html',
		controller : 'studentListPageCtr',
	
	}).state('syllabus', {
		url : "/syllabus",
		templateUrl : '/app/syllabus/syllabus_module.html',
		controller : 'syllabusModuleCtr'
	}).state('syllabus.addsyllabus', {
		url : "/addsyllabus",
		templateUrl : '/app/syllabus/syllabus_addsyllabus.html',
		controller : 'syllabusAddCtr'

	}).state('syllabus.viewsyllabus', {
		url : "/viewsyllabus",
		templateUrl : '/app/syllabus/syllabus_viewsyllabus.html',
		controller : 'syllabusViewCtr'

	}).state('syllabus.listsyllabus', {
		url : "/listsyllabus",
		templateUrl : '/app/syllabus/syllabus_listsyllabus.html',
		controller : 'syllabusListCtr'

	}).state('book.addselectedbook', {
		url : "/addselectedbook/:addselectedBookId",
		templateUrl : '/app/book/book_list.html',
		controller : 'bookListCtr'

	}).state('certificateMgmt', {
		url : "/certificateMgmt",
		templateUrl : '/app/certificateMgmt/certificate_module.html',
		controller : 'certificateModuleCtr'
	}).state('certificateMgmt.generateTemplate', {
		url : "/generateTemplate/:selectedStudID/:selectedfirstName/:selectedlastName/:selectedExam/:selectedScore",
		templateUrl : '/app/certificateMgmt/generateTemplate.html',
		controller : 'generateTemplateCtr'
	}).state('certificateMgmt.generateCertificate', {
		url : "/generateCertificate",
		templateUrl : '/app/certificateMgmt/generateCertificate.html',
		controller : 'generateCertificateCtr'
	}).state('certificateMgmt.viewCertificate', {
		url : "/viewCertificate",
		templateUrl : '/app/certificateMgmt/viewCertificate.html',
		controller : 'viewCertificateCtr'
	}).state('admissionMgmt', {
		url : "/admissionMgmt",
		templateUrl : '/app/admissionMgmt/admission_module.html',
		controller : 'admissionMgmtModuleCtr'
	}).state('applicant.add', {
		url : "/addApplicant",
		templateUrl : '/app/admissionMgmt/applicant_add.html',
		controller : 'applicantAddCtr'
	}).state('applicant.list', {
		url : "/applicantList",
		templateUrl : '/app/admissionMgmt/applicant_list.html',
		controller : 'applicantListCtr'
	}).state('gfe', {
		url : "/gfe",
		templateUrl : '/app/gfe/gfe_module.html',
		controller : 'gfeModuleCtr'
	})	.state('gfe.classroomNewCourse', {
		url : "/classroomNewCourse",
		templateUrl : '/app/gfe/classroom_new_course.html',
		controller : 'classroomNewCourseCtr'
	}).state('gfe.classroomCourseList', {
		url : "/classroomCourseList",
		templateUrl : '/app/gfe/classroom_list.html',
		controller : 'classroomCourseListCtr'
	}).state('gfe.classroomCourseUserList', {
		url : "/classroomCourseUserList",
		templateUrl : '/app/gfe/classroom_list_users.html',
		controller : 'classroomCourseUserListCtr',
		params : {
			userType : null,
			selectedCourseId : null	,
			courseName: null
		}
	}).state('gfe.classroomCourseAddNewUser', {
		url : "/classroomCourseAddNewUser/:selectedCourseId",
		templateUrl : '/app/gfe/classroom_new_user.html',
		controller : 'classroomNewUserCtr',
		params : {
			userType : null,
			selectedCourseId : null,
			courseName: null
		}
	}).state('gfe.classroomCourseViewUser', {
		url : "/classroomCourseViewUser",
		templateUrl : '/app/gfe/classroom_course_viewUser.html',
		controller : 'classroomViewUserCtr'	,
		params : {
			selectedUserId : null,
			selectedCourseId : null,
			userType:null ,
			selectedCourse:null
		}
	})
	.state('gfe.classroomCourseEdit', {
		url : "/classroomCourseEdit",
		templateUrl : '/app/gfe/classroom_course_edit.html',
		controller : 'classroomCourseEditCtr'	,	
		params : {			
			selectedCourse:null
		}
	}).state('gfe.classroomCourseView', {
		url : "/classroomCourseView",
		templateUrl : '/app/gfe/classroom_course_view.html',
		controller : 'classroomCourseViewCtr'	,	
		params : {			
			selectedCourse:null
		}
	}).state('gfe.directoryNewUser', {
		url : "/directoryNewUser",
		templateUrl : '/app/gfe/directory_new_userAccount.html',
		controller : 'directoryNewUserAccountCtr',
		params : {
			currentUserDomain : null			
		}
	})
	.state('gfe.directoryViewUser', {
		url : "/directoryViewUser",
		templateUrl : '/app/gfe/directory_view_userAccount.html',
		controller : 'directoryViewUserAccountCtr',
		params : {
			selectedUserPrimaryEmail:null
		}		
	})
	.state('gfe.directoryEditUser', {
		url : "/directoryEditUser",
		templateUrl : '/app/gfe/directory_edit_userAccount.html',
		controller : 'directoryEditUserAccountCtr',
			params : {
				selectedUser:null				
			}			
	})
	.state('gfe.directoryUserList', {
		url : "/directoryUserList",
		templateUrl : '/app/gfe/directory_user_list.html',
		controller : 'directoryUserListCtr'	
	})		
	.state('partnerSchool', {
		url : "/partnerSchool",
		templateUrl : '/app/partnerSchool/partnerSchool_module.html',
		controller : 'partnerSchoolModuleCtr'
	}).state('partnerSchool.addPartnerSchool', {
		url : "/addPartnerSchool/:selectedPSchoolId",
		templateUrl : '/app/partnerSchool/partnerSchool_add.html',
		controller : 'partnerSchoolAddCtr'
	}).state('partnerSchool.listPartnerSchool', {
		url : "/listPartnerSchool",
		templateUrl : '/app/partnerSchool/partnerSchool_list.html',
		controller : 'partnerSchoolListCtr'	
	}).state('partnerSchool.listPartnerSchoolStudent', {
		url : "/listPartnerSchoolStudent",
		templateUrl : '/app/partnerSchool/partnerSchool_studentList.html',
		controller : 'studentListPageCtr'	
	}).state('scheduledExam', {
		url : "/scheduledExam",
		templateUrl : '/app/scheduledExam/scheduledExam_module.html',
		controller : 'scheduledExamModuleCtr'				
	})	
	.state('scheduledExam.addQuestion', {
		url : "/addQuestion",
		templateUrl : '/app/scheduledQuestion/scheduledQuestion_new.html',
		controller : 'scheduledQuestionNewCtr'	,
			params : {
				sourceSate : null,
				selectedExamId : null,
				flag : null				
			}
	}).state('scheduledExam.questionList', {
		url : "/questionList",
		templateUrl : '/app/scheduledQuestion/scheduledQuestion_list.html',
		controller : 'scheduledQuestionListCtr'				
	})
	.state('scheduledExam.questionEdit', {
		url : "/questionEdit",
		templateUrl : '/app/scheduledQuestion/scheduledQuestion_edit.html',
		controller : 'scheduledQuestionEditCtr'	,
		params : {
			sourceSate : null,
			selectedExamId : null,
			selectedQuestion : null,
			selectedQuestionId:null				
		}
	
	}).state('scheduledExam.add', {
		url : "/add",
		templateUrl : '/app/scheduledExam/scheduledExam_add.html',
		controller : 'scheduledExamAddCtr'				
	})
	.state('scheduledExam.edit', {
		url : "/edit",
		templateUrl : '/app/scheduledExam/scheduledExam_edit.html',
		controller : 'editScheduledExamCtr'	,
		params : {
			selectedExamId:null,
			addedQ : null,
			updatedQ : null,		
			selectedQuestionId : null,
			addFlag : null,
			editFlag : null
		}		
	}).state('scheduledExam.list', {
		url : "/scheduledexamlist",
		templateUrl : '/app/scheduledExam/scheduledExam_list.html',
		controller : 'scheduledExamListCtr'				
	}).state('scheduledExam.liveexams', {
		url : "/liveexams",
		templateUrl : '/app/scheduledExam/live_scheduledExamlist.html',
		controller : 'liveScheduledExamListCtr'				
	})	.state('scheduledExam.scheduledtest', {
		url : "/scheduledtest",
		templateUrl : '/app/scheduledExam/scheduledExamTest.html',
		controller : 'scheduledExamTestCtr'	,
		params : {
			selectedExamId:null				
		}			
	})
	.state('scheduledExam.userQuesAnsView', {
		url : "/userQuesAnsView",
		templateUrl : '/app/scheduledExam/scheduledUserQuesAns_view.html',
		controller : 'scheduledUserQuesAnsViewCtr',
		params : {			
			selectedExamId:null,
			selectedEmailId:null			
		}	
		
	})
	.state('scheduledExam.scheduledExamResultView', {
		url : "/scheduledExamResultView/:selectedStudEmail",
		templateUrl : '/app/scheduledExam/schduledExamResult_view.html',
		controller : 'scheduledExamResultCtr'
	})	
	.state('initsetup', {
		url : "/initsetup",
		templateUrl : '/app/Initsetup/initsetup.html',
		controller : 'initsetup',
	})	
	.state('proadmin', {
		url : "/proadmin",
		templateUrl : '/app/proadmin/proadmin_module.html',
		controller : 'proAdminModuleCtr'
	})
	.state('proadmin.instituteAddInfo', {
		url : "/addInfo",
		templateUrl : '/app/institute/institute_addInfo.html',
		/*templateUrl : '/app/institute/institute_addNewInstitute.html',*/
		controller : 'instituteAddInfoCtr'
	})
	.state('proadmin.instituteList', {
		url : "/list",
		templateUrl : '/app/institute/institute_list.html',
		controller : 'instituteListCtr'
	})
	.state('scheduledExam.resultlist', {
		url : "/resultlist/:selectedExamId",
		templateUrl : '/app/scheduledExam/schduledExamResult_list.html',
		controller : 'scheduledExamResultListCtr'
	})
	.state('scheduledExam.studentlist', {
		url : "/studentlist/:selectedExamId",
		templateUrl : '/app/scheduledExam/scheduledExam_studentList.html',
		controller : 'scheduledExamStudentListCtr'
	})
	
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
app.filter('formatDate', function($filter) {
	 return function(inputDate) {
	  return $filter('date')(inputDate, 'dd-MM-yyyy');
	 };
});