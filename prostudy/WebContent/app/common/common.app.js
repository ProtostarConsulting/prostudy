var app = angular.module("prostudyApp", [ 'ngMaterial', 'ngMdIcons',
		'ngMessages', "xeditable", "ui.bootstrap", "ui.router",

		'md.data.table', 'ngResource', 'textAngular','ngRoute' ,'ngStorage']);


		

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('indigo')
			.accentPalette('red')
			  .warnPalette('pink')
              .backgroundPalette('grey');
});

app.config(function($logProvider) {
	//$logProvider.debugEnabled(false);	
	$logProvider.debugEnabled(true);//this is default	
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
	}).state('chapter', {
		url : "/chapter",
		templateUrl : "/app/chapter/chapter_module.html",
		controller : 'chapterModuleCtr'
	}).state('chapter.add', {
		url : "/add",
		templateUrl : "/app/chapter/chapter_add.html",
		controller : 'chapterAddCtr'
	}).state('chapter.view', {
		url : "/view",
		templateUrl : "/app/chapter/chapter_view.html",
		controller : 'chapterViewCtr'
	}).state('chapter.edit', {
		url : "/edit",
		templateUrl : "/app/chapter/chapter_edit.html",
		controller : 'chapterEditCtr'
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
	}).state('exam.view', {
		url : "/exam/view",
		templateUrl : '/app/exam/exam_view.html',
		controller : 'examCtr'
	}).state('examtest', {
		url : "/exam/examtest",
		templateUrl : '/app/exam/examdemo.html',
		controller : 'examDemoCtr'
	}).state('exam.question', {
		url : "/exam/question",
		templateUrl : '/app/question/question_add.html',
		controller : 'questionCtr'
	}).state('exam.questionlist', {
		url : "/exam/question/list",
		templateUrl : '/app/question/question_list.html',
		controller : 'questionListCtr'
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
	})/*.state('login', {
		url : "/login",
		templateUrl : '/app/login/login_module.html',
		controller : 'loginModuleCtr'
	})*/.state('student', {
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
	}).state('examresult', {
		url : "/examresult",
		templateUrl : '/app/examresult/examresult.html',
		controller : 'examResultCtr'
	})
	
	.state('syllabus.cbse8thenglish', {
		url : "/cbse8thenglish",
		templateUrl : '/app/syllabus/syllabus_cbse_8th_english.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse9thenglish', {
		url : "/cbse9thenglish",
		templateUrl : '/app/syllabus/syllabus_cbse_9th_english.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse10thenglish', {
		url : "/cbse10thenglish",
		templateUrl : '/app/syllabus/syllabus_cbse_10th_english.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse8thmath', {
		url : "/cbse8thmath",
		templateUrl : '/app/syllabus/syllabus_cbse_8th_math.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse9thmath', {
		url : "/cbse9thmath",
		templateUrl : '/app/syllabus/syllabus_cbse_9th_math.html',
		controller : 'syllabusCtr'
	}).state('syllabus.cbse10thmath', {
		url : "/cbse10thmath",
		templateUrl : '/app/syllabus/syllabus_cbse_10th_math.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse8thscience', {
		url : "/cbse8thscience",
		templateUrl : '/app/syllabus/syllabus_cbse_8th_science.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse9thscience', {
		url : "/cbse9thscience",
		templateUrl : '/app/syllabus/syllabus_cbse_9th_science.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.cbse10thscience', {
		url : "/cbse10thscience",
		templateUrl : '/app/syllabus/syllabus_cbse_10th_science.html',
		controller : 'syllabusCtr'
	})
	
	.state('syllabus.sb8thenglish', {
		url : "/sb8thenglish",
		templateUrl : '/app/syllabus/syllabus_sb_8th_english.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.sb9thenglish', {
		url : "/sb9thenglish",
		templateUrl : '/app/syllabus/syllabus_sb_9th_english.html',
		controller : 'syllabusCtr'
	}).state('syllabus.sb10thenglish', {
		url : "/sb10thenglish",
		templateUrl : '/app/syllabus/syllabus_sb_10th_english.html',
		controller : 'syllabusCtr'
	})
	
	.state('syllabus.sb8thmath', {
		url : "/sb8thmath",
		templateUrl : '/app/syllabus/syllabus_sb_8th_math.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.sb9thmath', {
		url : "/sb9thmath",
		templateUrl : '/app/syllabus/syllabus_sb_9th_math.html',
		controller : 'syllabusCtr'
	}).state('syllabus.sb10thmath', {
		url : "/sb10thmath",
		templateUrl : '/app/syllabus/syllabus_sb_10th_math.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.sb8thscience', {
		url : "/sb8thscience",
		templateUrl : '/app/syllabus/syllabus_sb_8th_science.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.sb9thscience', {
		url : "/sb9thscience",
		templateUrl : '/app/syllabus/syllabus_sb_9th_science.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.sb10thscience', {
		url : "/sb10thscience",
		templateUrl : '/app/syllabus/syllabus_sb_10th_science.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.icse8thenglish', {
		url : "/icse8thenglish",
		templateUrl : '/app/syllabus/syllabus_icse_8th_english.html',
		controller : 'syllabusCtr'
	}).state('syllabus.icse9thenglish', {
		url : "/icse9thenglish",
		templateUrl : '/app/syllabus/syllabus_icse_9th_english.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.icse10thenglish', {
		url : "/icse10thenglish",
		templateUrl : '/app/syllabus/syllabus_icse_10th_english.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.icse8thmath', {
		url : "/icse8thmath",
		templateUrl : '/app/syllabus/syllabus_icse_8th_math.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.icse9thmath', {
		url : "/icse9thmath",
		templateUrl : '/app/syllabus/syllabus_icse_9th_math.html',
		controller : 'syllabusCtr'
	}).state('syllabus.icse10thmath', {
		url : "/icse10thmath",
		templateUrl : '/app/syllabus/syllabus_icse_10th_math.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.icse8thscience', {
		url : "/icse8thscience",
		templateUrl : '/app/syllabus/syllabus_icse_8th_science_phisics.html',
		controller : 'syllabusCtr'
	})
	.state('syllabus.addsyllabus', {
		url : "/addsyllabus",
		templateUrl : '/app/syllabus/syllabus_addsyllabus.html',
		controller : 'syllabusCtr'
	})
	
	.state('syllabus.viewsyllabus', {
		url : "/viewsyllabus",
		templateUrl : '/app/syllabus/syllabus_viewsyllabus.html',
		controller : 'syllabusCtr'
	})
	
	;
});

app.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});