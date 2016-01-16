var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "xeditable", "ui.bootstrap", "ui.router",	'md.data.table', 'ngResource', 'textAngular', 'ngRoute', 'ngStorage', 'directive.g+signin' ]);


app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette(
			'red').warnPalette('pink').backgroundPalette('grey');
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
	$stateProvider.state('state1', {
		url : "/state1",
		templateUrl : "/app/demo/state1.html",
		controller : 'statesPageCtr'
	}).state('state1.list', {
		url : "/list",
		templateUrl : "/app/demo/state1.list.html",
		controller : 'statesPageCtr'
	}).state('state2', {
		url : "/state2",
		templateUrl : "/app/demo/state2.html",
		controller : 'statesPageCtr'
	}).state('state2.list', {
		url : "/list",
		templateUrl : "/app/demo/state2.list.html",
		controller : 'statesPageCtr'
	}).state('home', {
		url : "/home",
		templateUrl : '/home.html',
		controller : 'homeCtr'
	}).state('exam', {
		url : "/exam",
		templateUrl : '/app/exam/exam_module.html',
		controller : 'examModuleCtr'
	}).state('exam.practiceExamResultView', {
		url : "/practiceExamResultView",
		templateUrl : '/app/exam/practiceExamResult_view.html',
		controller : 'practiceExamResultCtr'
	}).state('exam.addnewquestion', {
		url : "/addnewquestion",
		templateUrl : '/app/exam/newQuestion_add.html',
		controller : 'addNewQuestionCtr'
	}).state('exam.questionlist', {
		url : "/question_list",
		templateUrl : '/app/exam/question_list.html',
		controller : 'questionListCtr'
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
		controller : 'editPracticeExamCtr'
	}).state('exam.practiceexamtest', {
		url : "/practiceexam/:selectedExamId",
		templateUrl : '/app/exam/practiceExamTest.html',
		controller : 'practiceExamTestCtr'
	})	.state('exam.view', {
		url : "/exam/view",
		templateUrl : '/app/exam/exam_view.html',
		controller : 'examCtr'
	}).state('userQuesAnsView', {
		url : "/userQuesAnsView/:selectedExamId",
		templateUrl : '/app/exam/userQuesAns_view.html',
		controller : 'userQuesAnsViewCtr'
	}).state('examtest', {
		url : "/examtest",
		templateUrl : '/app/exam/examdemo.html',
		controller : 'examDemoCtr'
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
	})
	.state('institute', {
		url : "/institute",
		templateUrl : '/app/institute/institute_module.html',
		controller : 'instituteModuleCtr'
	}).state('institute.addInfo', {
		url : "/institute/addInfo",
		templateUrl : '/app/institute/institute_addInfo.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.addAdmins', {
		url : "/institute/addAdmins/:currentInstID",
		templateUrl : '/app/institute/institute_addAdmins.html',
		controller : 'instituteAddInfoCtr'
	})	.state('institute.addTeachers', {
		url : "/institute/addTeachers/:currentInstID",
		templateUrl : '/app/institute/institute_addTeachers.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.addStudents', {
		url : "/institute/addStudents/:currentInstID",
		templateUrl : '/app/institute/institute_addStudents.html',
		controller : 'instituteAddInfoCtr'
	}).state('institute.list', {
		url : "/list",
		templateUrl : '/app/institute/institute_list.html',
		controller : 'instituteListCtr'
	}).state('institute.view', {
		url : "/view/:selectedInstituteId",
		templateUrl : '/app/institute/institute_view.html',
		controller : 'instituteViewCtr'
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
	}).state('institute.view.editInstitute', {
		url : "/editInstitute",
		templateUrl : '/app/institute/institute_editInstitute.html',
		controller : 'instituteViewCtr'
	}).state('attendance', {
		url : "/attendance",
		templateUrl : '/app/attendance/attendance_module.html',
		controller : 'attendanceModuleCtr'
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
	}).state('chapter.view', {
		url : "/view/:selectedChapterId",
		templateUrl : "/app/chapter/chapter_view.html",
		controller : 'chapterViewCtr'
	}).state('chapter.edit', {
		url : "/edit",
		templateUrl : "/app/chapter/chapter_edit.html",
		controller : 'chapterEditCtr'
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
		controller : 'bookListCtr'
	}).state('book.chapterList', {
		url : "/chapterList/:selectedBookId",
		templateUrl : "/app/book/book_chapterList.html",
		controller : 'book_chapterListCtr'
	})
	.state('book.chapterList.addcomment', {
		url : "/addcomment/:selectedBookId",
		templateUrl : "/app/book/book_addComments.html",
		controller : 'bookCommentAddCtr'
	})	.state('book.view', {
		url : "/view/:selectedBookId/:selectedChapterId",
		templateUrl : "/app/book/book_viewChapterContent.html",
		controller : 'book_viewChapterContentCtr'
	}).state('login', {
		url : "/login",
		templateUrl : '/app/login/login_module.html',
		controller : 'loginModuleCtr'
	})	
	.state('updatemyprofile', {
		url : "/updatemyprofile",
		templateUrl : '/app/myprofile/myprofile_update.html',
		controller : 'updateMyProfileCtr'
	})
	.state('newUserTeacher', {
		url : "/newUserTeacher",
		templateUrl : '/app/login/newUser.html',
		controller : 'loginModuleCtr'
	}).state('newUserStudent', {
		url : "/newUserStudent",
		templateUrl : '/app/login/newUser.html',
		controller : 'newUserStudentCtr'
	}).state('myBooks', {
		url : "/myBooks",
		templateUrl : '/app/myBooks/myBooks_module.html',
		controller : 'myBooksModuleCtr'
	}).state('myPracticeExams', {
		url : "/myPracticeExams",
		templateUrl : '/app/myPracticeExams/myPracticeExams_module.html',
		controller : 'myPracticeExamsModuleCtr'
	}).state('student', {
		url : "/student",
		templateUrl : '/app/student/student_module.html',
		controller : 'studentModuleCtr'
	}).state('student.add', {
		url : "/add",
		templateUrl : '/app/student/student_add.html',
		controller : 'studentPageCtr'
	}).state('student.list', {
		url : "/list",
		templateUrl : '/app/student/student_list.html',
		controller : 'studentListPageCtr'
	}).state('student.listtest', {
		url : "/listtest",
		templateUrl : '/app/demo/table_demo3_view.html',
		controller : 'nutritionController'
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