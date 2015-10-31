angular.module("prostudyApp").controller(
		"syllabusAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state ,appEndpointSF) {
			
			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Syllabus Data Saved!').position(
						"top").hideDelay(3000));
			};
			
			$scope.tempSyllabus = {board: "", standard: "", subject:"", chapter:"", chapterContent: ""};
			$scope.syllabus = []; 
		    $scope.syllabus1 = {};
		    $scope.syllabus2 = {};
		    $scope.syllabus3 = {};
			$scope.addSyllabus = function(){
				$log
				.debug("No1");	
				var SyllabusService = appEndpointSF.getSyllabusService();
				SyllabusService.addSyllabus($scope.tempSyllabus)
				.then(
						function(msgBean) {
							$log.debug("No6");	
							$log.debug("Inside Ctr addSyllabus");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
							$scope.tempSyllabus = {board: "", standard: "", subject:"", chapter:"", chapterContent: ""};
						});
				$log.debug("No4");	
			}
			
			$scope.getSyllabus = function(){
				//$scope.students = appEndpointSF.getStudentService().getStudents();
				var SyllabusService = appEndpointSF.getSyllabusService();					
										
				SyllabusService.getSyllabus()
				.then(
						function(syllabusList) {
							$log
									.debug("Inside Ctr getSyllabus");
							$scope.syllabus = syllabusList;
						});
			}

		
			$scope.getSyllabus();
			
			//$log.debug("len:" +$scope.syllabus.length);
			
			$scope.show = function()
			{
					if($scope.tempSyllabus.board== $scope.syllabus1 && $scope.tempSyllabus.standard== $scope.syllabus2 && $scope.tempSyllabus.subject== $scope.syllabus3)
					{
						return $scope.tempSyllabus.chapterContent;
					}	
				
			}
		
			$scope.tempStudent = {firstName: "", lastName: "",phone_no:"",email:"",city:"",state:"",pin:""};
			$scope.students = []; 
			
			$scope.addStudent = function(){
				$log
				.debug("No1");	
				var studentService = appEndpointSF.getStudentService();
				//$scope.students = studentService.addStudent($scope.tempStudent);
										
				studentService.addStudent($scope.tempStudent)
				.then(
						function(msgBean) {
							$log
							.debug("No6");	
							$log
									.debug("Inside Ctr addStudent");
							$log
							.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
							$scope.tempStudent = {firstName: "", lastName: "",phone_no:"",email:"",city:"",state:"",pin:""};
						});
				$log
				.debug("No4");	
			}
			
			$scope.getStudents = function(){
				//$scope.students = appEndpointSF.getStudentService().getStudents();
				var studentService = appEndpointSF.getStudentService();					
										
				studentService.getStudents()
				.then(
						function(studList) {
							$log
									.debug("Inside Ctr getStudents");
							$scope.students = studList;
						});
			}

		});
