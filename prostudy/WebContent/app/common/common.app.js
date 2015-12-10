var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "xeditable", "ui.bootstrap", "ui.router",

		'md.data.table', 'ngResource', 'textAngular', 'ngRoute', 'ngStorage' ]);

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

	})
	.state('exam.viewpracticeexam', {
		templateUrl : '/app/exam/practiceExam_list.html',
		controller : 'practiceExamListCtr'
	})
	.state('exam.editpracticeexam', {
		url : "/editpracticeexam/:selectedExamId",
		templateUrl : '/app/exam/practiceExam_edit.html',
		controller : 'editPracticeExamCtr'
	}).state('exam.practiceexamtest', {
		url : "/practiceexam/:selectedExamId",
		templateUrl : '/app/exam/practiceExamTest.html',
		controller : 'practiceExamTestCtr'

	})
	.state('exam.view', {
		url : "/exam/view",
		templateUrl : '/app/exam/exam_view.html',
		controller : 'examCtr'
	}).state('exam.addmypracticeexam', {
		  url : "/addmypracticeexam/:selectedMyExamId",
		  templateUrl : '/app/exam/myPracticeExam_add.html',
		  controller : 'addMyPracticeExamCtr'
	})
	
	.state('examscore', {
		url : "/examresult/score",
		templateUrl : '/app/exam/exam_score.html',
		controller : 'examScoreCtr'
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
	}).state('institute', {
		url : "/institute",
		templateUrl : '/app/institute/institute_module.html',
		controller : 'instituteModuleCtr'
	}).state('institute.add', {
		url : "/institute/add",
		templateUrl : '/app/institute/institute_add.html',
		controller : 'instituteAddCtr'
	}).state('institute.view', {
		url : "/institute/view",
		templateUrl : '/app/institute/institute_view.html',
		controller : 'instituteViewCtr'
	}).state('institute.edit', {
		url : "/institute/edit",
		templateUrl : '/app/institute/institute_edit.html',
		controller : 'instituteEditCtr'
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
	}).state('book.view', {
		url : "/view/:selectedBookId/:selectedChapterId",
		templateUrl : "/app/book/book_viewChapterContent.html",
		controller : 'book_viewChapterContentCtr'
	}).state('login', {
		url : "/login",
		templateUrl : '/app/login/login_module.html',
		controller : 'loginModuleCtr'
	}).state('newUserTeacher', {
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
		controller : 'syllabusCtr'

	}).state('syllabus.addsyllabus', {

		url : "/addsyllabus",
		templateUrl : '/app/syllabus/syllabus_addsyllabus.html',
		controller : 'syllabusCtr'

  }).state('syllabus.viewsyllabus', {

		url : "/viewsyllabus",
		templateUrl : '/app/syllabus/syllabus_viewsyllabus.html',
		controller : 'syllabusCtr'
	}).state('syllabus.listsyllabus', {
		url : "/listsyllabus",
		templateUrl : '/app/syllabus/syllabus_listsyllabus.html',
		controller : 'syllabusCtr'

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