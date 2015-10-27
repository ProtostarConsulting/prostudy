angular.module("prostudyApp").controller(
		"studentPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF,tableTestDataFactory,appEndpointSF) {
			

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!').position(
						"top").hideDelay(3000));
			};


			$log.debug("Inside studentPageCtr");
			
			//code for institute
			$scope.tempInstitute = {name: "", email_id: "", phone_no:"", address:""};
			$scope.institutes = []; 
			
			$scope.addInstitute = function(){
				$log
				.debug("No1");	
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.addInstitute($scope.tempInstitute)
				.then(
						function(msgBean) {
							$log
							.debug("No6");	
							$log
									.debug("Inside Ctr addInstitute");
							$log
							.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempInstitute = {name: "", email_id: "", phone_no:"", address:""};
						});
				$log
				.debug("No4");	
			}
			
			$scope.getInstitutes = function(){
				//$scope.students = appEndpointSF.getStudentService().getStudents();
				var InstituteService = appEndpointSF.getInstituteService();					
										
				InstituteService.getInstitutes()
				.then(
						function(instituteList) {
							$log
									.debug("Inside Ctr getInstitutes");
							$scope.institutes = instituteList;
						});
			}

			$scope.getInstitutes();
			//end for institute
			
			
			//start of student
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
			
		//end of student

			$scope.testGAPICall = function() {
				console.log("in side testGAPICall");
				var cars = appEndpointSF.getQuestionService().getCars().execute(
						function(resp) {
							$log.debug("resp:" + resp);				
							var items = resp.items;
							$log.debug("cars:" + resp.items);

						});
				

			};
			$scope.addStudentToDB = function() {
				$log.debug("in side addStudent. added..."
						+ $scope.studentVM.firstName);
				$scope.showSimpleToast();
			};// end of call to addStudent

			$scope.studentVM = objectFactory.newStudent();

			/* Setup menu */
			$scope.toggleRight = buildToggler('right');
			/**
			 * Build handler to open/close a SideNav; when animation finishes
			 * report completion in console
			 */
			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function() {
					$mdSidenav(navID).toggle().then(function() {
						$log.debug("toggle " + navID + " is done");
					});
				}, 200);
				return debounceFn;
			}

			$scope.close = function() {
				$mdSidenav('right').close().then(function() {
					$log.debug("close RIGHT is done");
				});
			};
			
	

		
		});