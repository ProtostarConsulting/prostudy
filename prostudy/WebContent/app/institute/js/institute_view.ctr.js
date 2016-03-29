
angular.module("prostudyApp").controller(
		"instituteViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$stateParams, $filter, objectFactory, $mdDialog) {

			$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
				
					$scope.currentInstID = $scope.curUser.instituteID;
					$scope.checkConfirmPassword = appEndpointSF.getUtilityService().checkConfirmPassword;
					
					$scope.selectedStandard;
					$scope.selectedDivision;
					$scope.selectedSubject;
					
					$scope.selectedStdName = $stateParams.selectedStdName;
					$scope.selectedDivName = $stateParams.selectedDivName;
					$scope.selectedSubName = $stateParams.selectedSubName;
					
					$scope.isGoogleUser = false;
					$scope.flag=true;
					
					$scope.newField = {};
			        $scope.editingStd = false;
			        
			        $scope.newDiv = {};
			        $scope.editingDiv = false;

			$scope.currentInstID = $scope.curUser.instituteID;

			$scope.selectedStandard;
			$scope.selectedDivision;
			$scope.selectedSubject;

			$scope.selectedStdName = $stateParams.selectedStdName;
			$scope.selectedDivName = $stateParams.selectedDivName;
			$scope.selectedSubName = $stateParams.selectedSubName;

			$scope.isGoogleUser = false;
			$scope.flag = true;
			$scope.flag3 = false;

			$scope.newField = {};
			$scope.editingStd = false;

			$scope.newDiv = {};
			$scope.editingDiv = false;

			$scope.newSub = {};
			$scope.editingSub = false;
			$scope.newSubject = {};
			$scope.standards = [];
			$scope.divisions = [];
			$scope.subjects = [];
			$scope.newStandards = [];
			$scope.newDivisions = [];
			$scope.newSubjects = [];
			$scope.selectedSubjects = [];

			$scope.stdList;
			$scope.divList;
			$scope.subList;
			$scope.std;

			$scope.viewstdList = [];
			$scope.myBooks = [];
			$scope.myExams = [];
			$scope.selected = [ {} ];

			$scope.selectedStdID = $stateParams.selectedStdID;
			$scope.selectedDivID = $stateParams.selectedDivID;

			$scope.currentStdID = $stateParams.currentStdID;
			$scope.currentDivID = $stateParams.currentDivID;

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
				$mdToast.show($mdToast.simple().content('Added successfully!')
						.position("top").hideDelay(3000));
			};
			$scope.showUpdateSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Updated!')
						.position("top").hideDelay(3000));
			};

			$scope.students = [];
			$scope.adminList = [];
			$scope.teacherList = [];
			$scope.studentList = [];
			$scope.subject = [];

			$scope.standard = {

				instituteID : $scope.curUser.instituteID,
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

			$scope.tempStudSub = {
				studID : "",
				name : $scope.selected
			}

			$scope.tempStudent = objectFactory.newInstituteUser("Student",
					$scope.currentInstID, $scope.isGoogleUser);
			$scope.tempTeacher = objectFactory.newInstituteUser("Teacher",
					$scope.currentInstID, $scope.isGoogleUser);
			$scope.tempAdmin = objectFactory.newInstituteUser("Admin",
					$scope.currentInstID, $scope.isGoogleUser);

			$scope.selectedStudents = [];
			$scope.selectedTeachers = [];
			$scope.selectedAdmins = [];

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

			$scope.addStudSubject = function() {
				var StudSubService = appEndpointSF.getStudSubService();

				StudSubService.addStudSubject($scope.tempStudSub).then(
						function(msgBean) {
							$log.debug("msgBean.msg:" + msgBean.msg);

						});

			}

			$scope.addInstituteStudents = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.addUser($scope.tempStudent).then(function(msgBean) {
					$log.debug("msgBean.id:" + msgBean.id);
					

				});

				$scope.showStudentSavedToast();
			
				$scope.cancelButton();
			}

			$scope.addInstituteStandards = function() {
				var StandardService = appEndpointSF.getStandardService();

				StandardService.addStandards($scope.standard).then(
						function(msgBean) {
							$log
									.debug("msgBean.msg:"
											+ angular.toJson(msgBean));
							$scope.currentStdID = msgBean.id;
							$scope.showSavedToast();

						});

			}

			$scope.addInstituteDivisions = function() {
				var DivisionService = appEndpointSF.getDivisionService();

				DivisionService.addDivisions($scope.division).then(
						function(msgBean) {
							$log
									.debug("msgBean.msg:"
											+ angular.toJson(msgBean));
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

			$scope.showselectedInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.curUser.instituteID)
						.then(function(institutes) {
							$scope.Institute = institutes;
						});
			}

			$scope.getUserByInstitute = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByInstitute($scope.curUser.instituteID)
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
						$scope.curUser.instituteID).then(
						function(standardList) {

							$scope.viewstdList = standardList;

						});
			}

			$scope.viewDivisionByStandard = function() {

				$scope.std = $scope.selectedStdName;
				var DivisionService = appEndpointSF.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID)
						.then(
								function(divisionList) {
									$log.debug("$scope.selectedStdID :"
											+ $scope.selectedStdID);
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

				var StandardService = appEndpointSF.getStandardService();
				StandardService.getStandardByInstitute($scope.currentInstID)
						.then(function(standardList) {
							for (var i = 0; i < standardList.length; i++) {
								$scope.standards.push(standardList[i].name);

							}
							$scope.stdList = standardList;

						});
			}

			$scope.getStandardByInstitute();

			$scope.getDivisionByStandard = function() {

				for (var i = 0; i < $scope.stdList.length; i++) {
					if ($scope.tempStudent.standard == $scope.stdList[i].name) {
						$scope.selectedStdID = $scope.stdList[i].id;
					}
				}
				var DivisionService = appEndpointSF.getDivisionService();
				DivisionService.getDivisionByStandard($scope.selectedStdID)
						.then(function(divisionList) {
							for (var i = 0; i < divisionList.length; i++) {
								$scope.divisions.push(divisionList[i].name);
							}
							$scope.divList = divisionList;
						});
			}

			$scope.getSubjectByDivision = function() {

				for (var i = 0; i < $scope.divList.length; i++) {
					if ($scope.tempStudent.division == $scope.divList[i].name) {
						$scope.selectedDivID = $scope.divList[i].id;
					}
				}
				var SubjectService = appEndpointSF.getSubjectService();
				SubjectService.getSubjectByDivision($scope.selectedDivID).then(
						function(subjectList) {
							for (var i = 0; i < subjectList.length; i++) {
								$scope.subjects.push(subjectList[i].name);
							}

						});
				$scope.subjects.splice(0, $scope.subjects.length);
			}

			$scope.toggle = function(subject, list) {
				var idx = list.indexOf(subject);
				if (idx > -1)
					list.splice(idx, 1);
				else
					list.push(subject);
			};
			$scope.exists = function(subject, list) {
				return list.indexOf(subject) > -1;
			};

			// Update Standard

			$scope.editStd = function(field) {
				$scope.editingStd = $scope.viewstdList.indexOf(field);
				$scope.newField = angular.copy(field);

			}

			$scope.saveField = function(index) {
				if ($scope.editingStd !== false) {
					$scope.viewstdList[$scope.editingStd] = $scope.newField;
					$scope.editingStd = false;
				}
			};

			$scope.cancel = function(index) {

				if ($scope.editingStd !== false) {
					$scope.viewstdList[$scope.editingStd] = $scope.newField;
					$scope.editingStd = false;
				}
			};

			$scope.updateStandard = function() {

				var StandardService = appEndpointSF.getStandardService();

				$log.debug("$scope.selectedStdID :" + $scope.selectedStdID);
				for (var i = 0; i < $scope.viewstdList.length; i++) {
					if ($scope.selectedStdID == $scope.viewstdList[i].id) {
						$scope.updatedval = $scope.viewstdList[i]
					}

				}
				StandardService.editStandard($scope.updatedval).then(
						function(msgBean) {
							$log.debug("msgBean :" + angular.toJson(msgBean));

						});

			}

			// End of Update Standard

			// Update Division

			$scope.editDiv = function(field) {
				$scope.editingDiv = $scope.viewDivList.indexOf(field);
				$scope.newDIv = angular.copy(field);

			}

			$scope.saveDiv = function(index) {
				if ($scope.editingDiv !== false) {
					$scope.viewDivList[$scope.editingDiv] = $scope.newDIv;
					$scope.editingDiv = false;
				}
			};

			$scope.cancelDiv = function(index) {

				if ($scope.editingDiv !== false) {
					$scope.viewDivList[$scope.editingDiv] = $scope.newDIv;
					$scope.editingDiv = false;
				}
			};

			$scope.updateDivision = function() {

				var DivisionService = appEndpointSF.getDivisionService();

				$scope.selectedDivisionId = $stateParams.selectedDivisionId;
				for (var i = 0; i < $scope.viewDivList.length; i++) {
					if ($scope.selectedDivisionId == $scope.viewDivList[i].id) {
						$scope.updatedval = $scope.viewDivList[i]
					}

				}

				DivisionService.editDivision($scope.updatedval).then(
						function(msgBean) {
							$log.debug("msgBean :" + angular.toJson(msgBean));
							$log.debug("Inside Ctr updateDivision");

						});

			}

			// End of Update Division

			// Update Subject

			$scope.editSub = function(field) {
				$scope.editingSub = $scope.viewSubList.indexOf(field);
				$scope.newSub = angular.copy(field);
				$log.debug("$scope.newSub :" + angular.toJson($scope.newSub));
			}

			$scope.saveSub = function(index) {
				if ($scope.editingSub !== false) {
					$scope.viewSubList[$scope.editingSub] = $scope.newSub;
					$scope.editingSub = false;
				}
			};

			$scope.cancelSub = function(index) {
				$log.debug("$scope.newSub :" + angular.toJson($scope.newSub));
				if ($scope.editingSub !== false) {
					$scope.viewSubList[$scope.editingSub] = $scope.newSub;
					$scope.editingSub = false;
				}
			};

			$scope.updateSubject = function() {

				var SubjectService = appEndpointSF.getSubjectService();

				$scope.selectedSubjectId = $stateParams.selectedSubjectId;
				for (var i = 0; i < $scope.viewSubList.length; i++) {
					if ($scope.selectedSubjectId == $scope.viewSubList[i].id) {
						$scope.updatedval = $scope.viewSubList[i]
					}

				}
				SubjectService.editSubject($scope.updatedval).then(
						function(msgBean) {
							$log.debug("msgBean :" + angular.toJson(msgBean));
							$log.debug("Inside Ctr updatesubject");

						});

			}

			// End of Update Subject

			$scope.editInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.editInstitute($scope.Institute).then(
						function(msgBean) {

							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showUpdateSavedToast();
						});

				$state.go("institute.view");
			}

			$scope.getUserByClass = function() {

				var UserService = appEndpointSF.getUserService();
				UserService.getUserByClass($scope.selectedStdName,
						$scope.selectedDivName, $scope.selectedSubName).then(
						function(studentList) {
							$scope.students = studentList;

						});
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
