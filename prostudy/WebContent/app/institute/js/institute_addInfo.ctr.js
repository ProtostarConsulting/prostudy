angular.module("prostudyApp").controller(
		"instituteAddInfoCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF, $state, $stateParams, $mdDialog, objectFactory) {

			$scope.selectedStandard;
			$scope.selectedDivision;
			$scope.selectedSubject;

			$scope.flag1 = true;
			$scope.flag2 = true;
			
			
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

			$scope.flag = false;

			$scope.isGoogleUser = false;

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
						'Institute Teacher Added!').position("top").hideDelay(
						3000));
			};

			$scope.currentInstID = $stateParams.currentInstID;

			$scope.isDisabled = false;
			$scope.disableButton = function() {
				$scope.isDisabled = true;
			}

			$scope.tempStudent = objectFactory.newInstituteUser("Student",$scope.currentInstID,$scope.isGoogleUser);
			$scope.tempTeacher = objectFactory.newInstituteUser("Teacher",$scope.currentInstID,$scope.isGoogleUser);
			$scope.tempAdmin = objectFactory.newInstituteUser("Admin",$scope.currentInstID,$scope.isGoogleUser);

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

				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.addInstitute($scope.tempInstitute,
						$scope.selectedStudents, $scope.selectedAdmins,
						$scope.selectedTeachers).then(function(msgBean) {

					$scope.currentInstID = msgBean.id;
					$scope.name = msgBean.name;
					$scope.showSavedToast();
					$state.go("institute.addAdmins", {
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

			$scope.showConfirm = function(ev) {
				$scope.flag1 = false;
				
				$scope.addInstituteAdmins();
				$scope.flag2 = false;
				var confirm = $mdDialog.confirm().title(
						'Do you want to continue ?').ariaLabel('Lucky day')
						.targetEvent(ev).ok('YES').cancel('NO');
				$mdDialog.show(confirm).then(function() {
					$scope.status = $state.go("institute.addStandards", {
						currentInstID : $scope.currentInstID
					});
				}, function() {
					$scope.flag = true;
					$scope.status = $state.go("institute");
				});
				
			};

			$scope.addInstituteTeachers = function() {
				var UserService = appEndpointSF.getUserService();

				$state.go("institute.addStudents", {
					currentInstID : $scope.currentInstID
				});

				UserService.addUser($scope.tempTeacher).then(function(msgBean) {

				});

				$scope.showTeacherSavedToast();

			}

			$scope.addInstituteAdmins = function() {
				var UserService = appEndpointSF.getUserService();

				if ($scope.flag1 == true) {
					$state.go("institute.addTeachers", {
						currentInstID : $scope.currentInstID
					});

				}

				UserService.addUser($scope.tempAdmin).then(function(msgBean) {

				});
				$scope.showAdminSavedToast();

			}

			$scope.addInstituteStandards = function() {
				var StandardService = appEndpointSF.getStandardService();

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
				var DivisionService = appEndpointSF.getDivisionService();

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
					SubjectService.addSubjects($scope.selectedSubjects[i])
							.then(function(msgBean) {

							});
				}

				$state.go("institute.addAdmins", {
					currentInstID : $scope.currentInstID
				});
			}

			$scope.getInstitutes = function() {

				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstitutes().then(function(instituteList) {
					$scope.institutes = instituteList;
				});
			}
			$scope.getInstitutes();

			$scope.cancelButton = function() {
				$state.go("^", {});
			}

		});
