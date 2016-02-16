angular.module("prostudyApp").controller(
		"instituteViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$stateParams, $filter, standardList) {
			
			$scope.standards = [{}];
			$scope.standards = standardList;
			$scope.selectedStandard;
			$scope.isGoogleUser;
			
			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedInstituteId:",
					$stateParams.selectedInstituteId);

			$scope.selectedInstituteId = $stateParams.selectedInstituteId;
			
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
			$scope.showUpdateSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Updated!')
						.position("top").hideDelay(3000));
			};

			$scope.students = [];
			$scope.adminList = [];
			$scope.teacherList = [];
			$scope.studentList = [];
			
			$scope.addStudents = function() {
				$scope.students.push({
					'instituteID' : $scope.selectedInstituteId,
					'institute' : $scope.name,
					'firstName' : $scope.firstName,
					'lastName' : $scope.lastName,
					'email_id' : $scope.email_id,
					'address' : $scope.address,
					'contact' : $scope.contact,
					'role' : "Student",
					'standard' : $scope.selectedStandard,
					'password' : $scope.password,
					'isGoogleUser' : $scope.isGoogleUser
				});
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email_id = '';
				$scope.address = '';
				$scope.contact = '';
				$scope.role = '';
				$scope.selectedStandard = '';
				$scope.password = '';
			};
			
			$scope.teachers = [];
			$scope.addTeachers = function() {
				$scope.teachers.push({
					'instituteID' : $scope.selectedInstituteId,
					'institute' : $scope.name,
					'firstName' : $scope.firstName,
					'lastName' : $scope.lastName,
					'email_id' : $scope.email_id,
					'address' : $scope.address,
					'contact' : $scope.contact,
					'role' : "Teacher",
					'password' : $scope.password,
					'isGoogleUser' : $scope.isGoogleUser
				});
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email_id = '';
				$scope.address = '';
				$scope.contact = '';
				$scope.role = '';
				$scope.password = '';
			};
			
			
			$scope.admins = [];
			$scope.addToAdminsList = function() {
				$scope.admins.push({
					'instituteID' : $scope.selectedInstituteId,
					'institute' : $scope.name,
					'firstName' : $scope.firstName,
					'lastName' : $scope.lastName,
					'email_id' : $scope.email_id,
					'address' : $scope.address,
					'contact' : $scope.contact,
					'role' : "Admin",
					'password' : $scope.password,
					'isGoogleUser' : $scope.isGoogleUser
				});
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email_id = '';
				$scope.address = '';
				$scope.contact = '';
				$scope.role = '';
				$scope.password = '';
			};
			
			
			$scope.selectedStudents = [];
			$scope.selectedTeachers = [];
			$scope.selectedAdmins = [];

			
			$scope.addInstituteAdmins = function() {
				var UserService = appEndpointSF.getUserService();
				for (i = 0; i < $scope.selectedAdmins.length; i++) 
				{
						UserService.addUser($scope.selectedAdmins[i]).then(function(msgBean) {
							$log.debug("msgBean.msg:" + msgBean.msg);
							
						});
				}
				$scope.showAdminSavedToast();
				$scope.cancelButton();
				
			}
			
			
			$scope.addInstituteTeachers = function() {
				var UserService = appEndpointSF.getUserService();
				for (i = 0; i < $scope.selectedTeachers.length; i++) 
				{
					UserService.addUser($scope.selectedTeachers[i]).then(function(msgBean) {
					$log.debug("msgBean.msg:" + msgBean.msg);
					
					});
				}
				$scope.showTeacherSavedToast();
				$scope.cancelButton();
		 }
			
			
			$scope.addInstituteStudents = function() {
				var UserService = appEndpointSF.getUserService();
				for (i = 0; i < $scope.selectedStudents.length; i++) 
				{
					UserService.addUser($scope.selectedStudents[i]).then(function(msgBean) {
					$log.debug("msgBean.msg:" + msgBean.msg);
					
					});
				}

				$scope.showStudentSavedToast();
				$scope.cancelButton();
			}
			
			
			$scope.showselectedInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.selectedInstituteId)
						.then(function(institutes) {
							$scope.Institute = institutes;
						});
			}
			
			$scope.getUserByInstitute = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.selectedInstituteId)
						.then(
								function(userList) {
									$scope.users = userList;
									$log.debug("$scope.users :"+angular.toJson($scope.users));
									for(var i=0;i<$scope.users.length;i++)
									{
										if($scope.users[i].role == "Admin")
										{
											$scope.adminList.push($scope.users[i]);
											
										}
										else if($scope.users[i].role == "Teacher")
										{
											$scope.teacherList.push($scope.users[i]);
											
										}
										else if($scope.users[i].role == "Student")
										{
											$scope.studentList.push($scope.users[i]);
											
										}
									}		
											
									
								});
			}
			
			
			$scope.showselectedInstitute();
			$scope.getUserByInstitute();
			
			$scope.editInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.editInstitute($scope.Institute).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr EditInstitute");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showUpdateSavedToast();
						});

				$state.go("institute.view");
			}
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
			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};
			$scope.selected = [];

		});
