angular.module("prostudyApp").controller(
		"instituteAddInfoCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,$log, $q, appEndpointSF,$state, $stateParams) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};
			$scope.showAdminSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Institute Admin Added!').position("top").hideDelay(
						3000));
			};
			$scope.showTeacherSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Institute Teacher Added!').position("top").hideDelay(
						3000));
			};
			$scope.showStudentSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Institute Student Added!').position("top").hideDelay(
						3000));
			};
		$scope.currentInstID = $stateParams.currentInstID;
			
			 $scope.isDisabled = false;
			   $scope.disableButton = function() {
			        $scope.isDisabled = true;
			    }

			$scope.students=[];
				$scope.addStudents = function(){		
				$scope.students.push({ 'student_name':$scope.student_name, 'student_email_id': $scope.student_email_id, 'student_contact_no':$scope.student_contact_no});
				$scope.student_name='';
				$scope.student_email_id='';
				$scope.student_contact_no='';
			};
			$scope.teachers=[];
			$scope.addTeachers = function(){		
			$scope.teachers.push({ 'teacher_name':$scope.teacher_name, 'teacher_email_id': $scope.teacher_email_id, 'teacher_contact_no':$scope.teacher_contact_no});
			$scope.teacher_name='';
			$scope.teacher_email_id='';
			$scope.teacher_contact_no='';
		};
			$scope.admins=[];
				$scope.addToAdminsList = function(){		
				$scope.admins.push({ 'admin_name':$scope.admin_name, 'admin_email_id': $scope.admin_email_id, 'admin_contact_no':$scope.admin_contact_no});
				$scope.admin_name='';
				$scope.admin_email_id='';
				$scope.admin_contact_no='';
			};
			$scope.selectedStudents = [];
			$scope.selectedTeachers= [];
			$scope.selectedAdmins=[];
			$scope.query = {
				order : 'description',
				limit : 5,
				page : 1
			};

			$scope.onpagechange = function(page, limit) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

			$scope.onorderchange = function(order) {
				var deferred = $q.defer();

				$timeout(function() {
					deferred.resolve();
				}, 2000);

				return deferred.promise;
			};

				$scope.tempInstitute = {
					id:"",
					name : "",
					desc:"",
					address:"",
					phone_no:"",
					user_fname:"",
					user_lname:"",
					user_email_id:"",
					user_contact_no:"",
					books:[],
					students: [],
					teachers: [],
					practiceExams: [],
					admins:[]
				};
				$scope.institutes = [];
		
				$scope.addInstitute = function() {
		
				var InstituteService = appEndpointSF.getInstituteService();
				
				InstituteService.addInstitute($scope.tempInstitute,$scope.selectedStudents,$scope.selectedAdmins,$scope.selectedTeachers).then(
						function(msgBean) {
						
							$log.debug("Inside Ctr addInstitute");
							$scope.currentInstID = msgBean.instId;
							$scope.showSavedToast();
							$state.go("institute.addAdmins", {currentInstID: $scope.currentInstID});
							$scope.tempInstitute = {
									id:"",
									name : "",
									desc:"",
									address:"",
									phone_no:"",
									user_fname:"",
									user_lname:"",
									user_email_id:"",
									user_contact_no:"",
									books:[],
									students: [],
									teachers: [],
									practiceExams: [],
									admins:[]
								};
						});
				
			}
			$scope.addInstituteTeachers = function() 
				{
					var InstituteService = appEndpointSF.getInstituteService();
					$state.go("institute.addStudents", {currentInstID: $scope.currentInstID});
				
					InstituteService.addInstituteTeachers($scope.currentInstID,$scope.selectedTeachers).then(
							function(msgBean) {
								$log.debug("msgBean.msg:" + msgBean.msg);
								$scope.showTeacherSavedToast();
								
							});
					}
				$scope.addInstituteAdmins = function() 
				{
					var InstituteService = appEndpointSF.getInstituteService();
			
					$state.go("institute.addTeachers", {currentInstID: $scope.currentInstID});
					InstituteService.addInstituteAdmins($scope.currentInstID,$scope.selectedAdmins).then(
							function(msgBean) {
								$log.debug("msgBean.msg:" + msgBean.msg);
								$scope.showAdminSavedToast();
								
							});				
				}
				$scope.addInstituteStudents = function() 
				{
					var InstituteService = appEndpointSF.getInstituteService();
					
					InstituteService.addInstituteStudents($scope.currentInstID,$scope.selectedStudents).then(
							function(msgBean) {
								$log.debug("msgBean.msg:" + msgBean.msg);
								$scope.showStudentSavedToast();
								
							});
					$state.go("institute.list");
				}
			
			$scope.getPracticeExams = function() {

				var PracticeExamService = appEndpointSF.getPracticeExamService();
				PracticeExamService.getPracticeExams()	.then(function(practiceExamList) {
									$log.debug("Inside Ctr getPracticeExam");
									$scope.practiceTest = practiceExamList;
									
								});
			}

			$scope.getPracticeExams();		
			$scope.getBooks = function() {

				var BookService = appEndpointSF.getBookService();

				BookService.getBooks().then(
						function(bookList) {
						
							$scope.books = bookList;
							
						});
			}
			$scope.getBooks();
			$scope.getInstitutes = function() {
				
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstitutes().then(function(instituteList) {
					$scope.institutes = instituteList;
				});
			}
			$scope.getInstitutes();
		

		});
