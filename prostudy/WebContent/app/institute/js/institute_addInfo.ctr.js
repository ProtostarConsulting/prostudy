angular
		.module("prostudyApp")
		.controller(
				"instituteAddInfoCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, appEndpointSF, $state, $stateParams,
						$mdDialog) {

					$scope.selectedStandard;
					$scope.selectedDivision;
					$scope.selectedSubject;

					$scope.isGoogleUser;
					$scope.myExams = [];
					$scope.selectedStudents = [];
					$scope.selectedTeachers = [];
					$scope.selectedAdmins = [];
					$scope.selectedStandards = [];
					$scope.selectedDivisions = [];
					$scope.selectedSubjects = [];

					$scope.standards = [];
					$scope.divisions = [];
					$scope.subjects = [];
					$scope.myBooks = [];

					$scope.selectedStdID;
					$scope.stdList;
					$scope.divList;
					$scope.subList;

					$scope.isGoogleUser = false;

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Saved!').position("top").hideDelay(
								3000));
					};
					$scope.showAdminSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Admin Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showTeacherSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Teacher Added!').position("top")
								.hideDelay(3000));
					};
					$scope.showStudentSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Institute Teacher Added!').position("top")
								.hideDelay(3000));
					};

					$scope.currentInstID = $stateParams.currentInstID;

					$scope.isDisabled = false;
					$scope.disableButton = function() {
						$scope.isDisabled = true;
					}

					$scope.teachers = [];
					$scope.addTeacherList = function() {
						$scope.teachers.push({
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
						});
						$scope.firstName = '';
						$scope.lastName = '';
						$scope.email_id = '';
						$scope.address = '';
						$scope.contact = '';
						$scope.role = '';
						$scope.password = '';

						$scope.flag1 = false;
						$scope.flag2 = true;

					};

					$scope.admins = [];
					$scope.addToAdminsList = function() {
						$scope.admins.push({
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
						});
						$scope.firstName = '';
						$scope.lastName = '';
						$scope.email_id = '';
						$scope.address = '';
						$scope.contact = '';
						$scope.role = '';
						$scope.password = '';
						$scope.flag1 = false;
						$scope.flag2 = true;
					};

					$scope.standard = {

						instituteID : $scope.currentInstID,
						name : ""
					};

					$scope.division = {

						standardID : $scope.currentStdID,
						name : ""
					};

					$scope.subjectList = [];
					$scope.addSubjects = function() {
						$scope.subjectList.push({
							'divisionID' : $scope.currentDivID,
							'name' : $scope.name,

						});
						$scope.name = '';

					};

					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					$scope.currentStdID = $stateParams.currentStdID;
					$scope.currentDivID = $stateParams.currentDivID;

					$scope.isDisabled = false;
					$scope.disableButton = function() {
						$scope.isDisabled = true;
					}

					$scope.standard = {

						instituteID : $scope.currentInstID,
						name : ""
					};

					$scope.division = {

						standardID : $scope.currentStdID,
						name : ""
					};

					$scope.subjectList = [];
					$scope.addSubjects = function() {
						$scope.subjectList.push({
							'divisionID' : $scope.currentDivID,
							'name' : $scope.name,

						});
						$scope.name = '';

					};

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
						id : "",
						instituteId : "",
						name : "",
						desc : "",
						address : "",
						phone_no : "",

					};
					$scope.institutes = [];

					$scope.addInstitute = function() {

						var InstituteService = appEndpointSF
								.getInstituteService();

						InstituteService.addInstitute($scope.tempInstitute,
								$scope.selectedStudents, $scope.selectedAdmins,
								$scope.selectedTeachers).then(
								function(msgBean) {

									$scope.currentInstID = msgBean.id;
									$scope.name = msgBean.name;
									$scope.showSavedToast();
									$state.go("institute.addStandards", {
										currentInstID : $scope.currentInstID
									});
									$scope.tempInstitute = {
										id : "",
										instituteId : "",
										name : "",
										desc : "",
										address : "",
										phone_no : "",

									};
								});

					}

					$scope.showAlert = function(ev) {
						$scope.addInstitute();

						$mdDialog
								.show($mdDialog
										.alert()
										.parent(
												angular
														.element(document
																.querySelector('#popupContainer')))
										.clickOutsideToClose(true)
										.textContent(
												'INSTITUTE REGISTERED SUCCESSFULLLY...\n PLEASE ADD FURTHER DETAILS..')
										.ariaLabel('Alert Dialog Demo')
										.ok('OK').targetEvent(ev));
					};

					$scope.addInstituteTeachers = function() {
						var UserService = appEndpointSF.getUserService();

						$state.go("institute.addStudents", {
							currentInstID : $scope.currentInstID
						});
						for (i = 0; i < $scope.selectedTeachers.length; i++) {
							UserService.addUser($scope.selectedTeachers[i])
									.then(function(msgBean) {

									});
						}

						$scope.showTeacherSavedToast();

					}

					$scope.addInstituteAdmins = function() {
						var UserService = appEndpointSF.getUserService();

						$state.go("institute.addTeachers", {
							currentInstID : $scope.currentInstID
						});

						for (i = 0; i < $scope.selectedAdmins.length; i++) {
							UserService.addUser($scope.selectedAdmins[i]).then(
									function(msgBean) {

									});
						}

						$scope.showAdminSavedToast();

					}

					$scope.addInstituteStudents = function() {
						var UserService = appEndpointSF.getUserService();

						for (i = 0; i < $scope.selectedStudents.length; i++) {
							UserService.addUser($scope.selectedStudents[i])
									.then(function(msgBean) {

									});
						}
						$scope.showStudentSavedToast();

					}

					$scope.addInstituteStandards = function() {
						var StandardService = appEndpointSF
								.getStandardService();

						StandardService.addStandards($scope.standard).then(
								function(msgBean) {

									$scope.currentStdID = msgBean.id;
									$state.go('institute.addDivisions', {
										currentInstID : $scope.currentInstID,
										currentStdID : $scope.currentStdID
									});

								});

					}

					$scope.addInstituteDivisions = function() {
						var DivisionService = appEndpointSF
								.getDivisionService();

						$scope.currentStdID = $stateParams.currentStdID;

						DivisionService.addDivisions($scope.division).then(
								function(msgBean) {

									$scope.currentDivID = msgBean.id;
									$state.go("institute.addSubjects", {
										currentInstID : $scope.currentInstID,
										currentStdID : $scope.currentStdID,
										currentDivID : $scope.currentDivID
									});

								});

					}

					$scope.addMoreStd = function() {
						$state.go("institute.addStandards", {
							currentInstID : $scope.currentInstID
						});
					}

					$scope.addInstituteSubjects = function() {
						var SubjectService = appEndpointSF.getSubjectService();
						$scope.currentDivID = $stateParams.currentDivID;

						for (i = 0; i < $scope.selectedSubjects.length; i++) {
							SubjectService.addSubjects(
									$scope.selectedSubjects[i]).then(
									function(msgBean) {

									});
						}

						$state.go("institute.addAdmins", {
							currentInstID : $scope.currentInstID
						});
					}

					$scope.getInstitutes = function() {

						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.getInstitutes().then(
								function(instituteList) {
									$scope.institutes = instituteList;
								});
					}
					$scope.getInstitutes();

					$scope.cancelButton = function() {
						$state.go("^", {});
					}

				});
