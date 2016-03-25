angular.module("prostudyApp").controller(
		"instituteListViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$filter, $stateParams) {

			$scope.selectedInstituteID = $stateParams.selectedInstituteID;
			$scope.currentInstID = $stateParams.selectedInstituteID;
			
			$scope.selectedStdID = $stateParams.selectedStdID;
			$scope.flag = false;

			$log.debug("$scope.currentInstID :" + $scope.currentInstID);

			$scope.adminList = [];
			$scope.teacherList = [];
			$scope.studentList = [];
			
			$scope.stdList;
			$scope.divList;
			$scope.subList;
			$scope.std;

			$scope.showUpdateSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Updated!')
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
			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content(
						'Added successfully!').position("top")
						.hideDelay(3000));
			};

			$scope.tempAdmin = {
				'instituteID' : $scope.currentInstID,
				'institute' : $scope.name,
				'firstName' : $scope.firstName,
				'lastName' : $scope.lastName,
				'email_id' : $scope.email_id,
				'address' : $scope.address,
				'contact' : $scope.contact,
				'role' : "Admin",
				'password' : $scope.password,
				'isGoogleUser' : $scope.isGoogleUser,
				'myBooks' : $scope.myBooks,
				'myExams' : $scope.myExams
			};

			$scope.tempTeacher = {
				'instituteID' : $scope.currentInstID,
				'institute' : $scope.name,
				'firstName' : $scope.firstName,
				'lastName' : $scope.lastName,
				'email_id' : $scope.email_id,
				'address' : $scope.address,
				'contact' : $scope.contact,
				'role' : "Teacher",
				'password' : $scope.password,
				'isGoogleUser' : $scope.isGoogleUser,
				'myBooks' : $scope.myBooks,
				'myExams' : $scope.myExams
			};
			$scope.tempStudent = {
				'instituteID' : $scope.currentInstID,
				'institute' : $scope.name,
				'firstName' : $scope.firstName,
				'lastName' : $scope.lastName,
				'email_id' : $scope.email_id,
				'address' : $scope.address,
				'contact' : $scope.contact,
				'role' : "Student",
				'standard' : "",
				'division' : "",
				'subject' : $scope.selected,
				'password' : $scope.password,
				'isGoogleUser' : $scope.isGoogleUser
			};

			$scope.standard = {

				instituteID : $scope.currentInstID,
				name : ""
			};

			$scope.division = {

				standardID : $scope.selectedStdID,
				name : ""
			};

			$scope.subjectList = [];
			$scope.addSubjects = function() {
				$scope.subjectList.push({
					'divisionID' : $scope.selectedDivID,
					'name' : $scope.name,

				});
				$scope.name = '';

			};

			$scope.addInstituteStandards = function() {
				var StandardService = appEndpointSF.getStandardService();

				StandardService.addStandards($scope.standard).then(
						function(msgBean) {
							
							$scope.currentStdID = msgBean.id;
							$scope.showSavedToast();

						});

			}

			$scope.addInstituteDivisions = function() {
				var DivisionService = appEndpointSF.getDivisionService();

				DivisionService.addDivisions($scope.division).then(
						function(msgBean) {
							
							$scope.currentDivID = msgBean.id;
							$scope.division = {};
							$scope.showSavedToast();

						});

			}

			$scope.addInstituteSubjects = function() {
				var SubjectService = appEndpointSF.getSubjectService();
				$scope.currentDivID = $stateParams.currentDivID;

				for (i = 0; i < $scope.selectedSubjects.length; i++) {
					SubjectService.addSubjects($scope.selectedSubjects[i])
							.then(function(msgBean) {

							});
					$scope.showSavedToast();
					$scope.subjectList = [];
					// $scope.selectedSubjects.splice(0,$scope.selectedSubjects.length);
				}

			}

			$scope.addInstituteAdmins = function() {
				var UserService = appEndpointSF.getUserService();

				UserService.addUser($scope.tempAdmin).then(function(msgBean) {
					$log.debug("msgBean.msg:" + msgBean.msg);

				});

				$scope.showAdminSavedToast();
				$scope.cancelButton();

			}

			$scope.addInstituteTeachers = function() {
				var UserService = appEndpointSF.getUserService();

				UserService.addUser($scope.tempTeacher).then(function(msgBean) {
					$log.debug("msgBean.msg:" + msgBean.msg);

				});

				$scope.showTeacherSavedToast();
				$scope.cancelButton();
			}

			$scope.addInstituteStudents = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.addUser($scope.tempStudent).then(function(msgBean) {
					$log.debug("msgBean.id:" + msgBean.id);
					$scope.tempStudSub.studID = msgBean.id;
					$scope.tempStudSub.name = $scope.selected;

				});

				$scope.showStudentSavedToast();
				// $scope.addStudSubject();
				$scope.cancelButton();
			}

			$scope.showselectedInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.selectedInstituteID)
						.then(function(institutes) {
							$scope.Institute = institutes;
						});
			}

			$scope.editInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.editInstitute($scope.Institute).then(
						function(msgBean) {

							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showUpdateSavedToast();
						});

				$state.go("institute.list_view");
			}

			$scope.getUserByInstitute = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.selectedInstituteID)
						.then(function(userList) {
							$scope.users = userList;

							for (var i = 0; i < $scope.users.length; i++) {
								if ($scope.users[i].role == "Admin") {
									$scope.adminList.push($scope.users[i]);

								} else if ($scope.users[i].role == "Teacher") {
									$scope.teacherList.push($scope.users[i]);

								} else if ($scope.users[i].role == "Student") {
									$scope.studentList.push($scope.users[i]);

								}
							}

						});
			}

			$scope.getUserByInstitute();

			$scope.viewStandardByInstitute = function() {

				var StandardService = appEndpointSF.getStandardService();
				StandardService.getStandardByInstitute(
						$scope.selectedInstituteID).then(
						function(standardList) {

							$scope.viewstdList = standardList;

						});
			}

			$scope.viewDivisionByStandard = function() {

				$scope.std = $scope.selectedStdName;
				var DivisionService = appEndpointSF.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID)
						.then(function(divisionList) {
							$scope.viewDivList = divisionList;

						});
			}

			$scope.viewSubjectByDivision = function() {

				var SubjectService = appEndpointSF.getSubjectService();
				SubjectService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							$scope.viewSubList = subjectList;

						});
			}
			
			$scope.getStandardByInstitute = function() {

				var StandardService = appEndpointSF
						.getStandardService();
				StandardService.getStandardByInstitute($scope.currentInstID).then(
						function(standardList) {
							for(var i=0; i< standardList.length; i++)
								{
									$scope.standards.push(standardList[i].name);
									
								}
							$scope.stdList = standardList;
							
						});
			}
			
			$scope.getStandardByInstitute();
			
			$scope.getDivisionByStandard = function() {
			
				for(var i=0;i< $scope.stdList.length;i++)
				{
					if($scope.tempStudent.standard == $scope.stdList[i].name)
					{
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var DivisionService = appEndpointSF
						.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID).then(
						function(divisionList) {
							for(var i=0; i< divisionList.length; i++)
							{
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
			}
			
			$scope.getSubjectByDivision = function() {
				
				for(var i=0;i<$scope.divList.length;i++)
				{
					if($scope.tempStudent.division == $scope.divList[i].name)
					{
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var SubjectService = appEndpointSF.getSubjectService();
				SubjectService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for(var i=0; i< subjectList.length; i++)
							{
								$scope.subjects.push(subjectList[i].name);
							}

						});
				$scope.subjects.splice(0,$scope.subjects.length);
			}
			

			$scope.cancelButton = function() {
				$log.debug("inside cancelButton");
				$state.go('^', {});
			};

		});
