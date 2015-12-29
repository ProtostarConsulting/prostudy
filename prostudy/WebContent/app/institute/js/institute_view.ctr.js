angular.module("prostudyApp").controller(
		"instituteViewCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, $sce, tableTestDataFactory, appEndpointSF, $state,
				$stateParams, $filter) {
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
			$scope.addStudents = function() {
				$scope.students.push({
					'student_name' : $scope.student_name,
					'student_email_id' : $scope.student_email_id,
					'student_contact_no' : $scope.student_contact_no
				});
				$scope.student_name = '';
				$scope.student_email_id = '';
				$scope.student_contact_no = '';
			};
			$scope.teachers = [];
			$scope.addTeachers = function() {
				$scope.teachers.push({
					'teacher_name' : $scope.teacher_name,
					'teacher_email_id' : $scope.teacher_email_id,
					'teacher_contact_no' : $scope.teacher_contact_no
				});
				$scope.teacher_name = '';
				$scope.teacher_email_id = '';
				$scope.teacher_contact_no = '';
			};
			$scope.admins = [];
			$scope.addToAdminsList = function() {
				$scope.admins.push({
					'admin_name' : $scope.admin_name,
					'admin_email_id' : $scope.admin_email_id,
					'admin_contact_no' : $scope.admin_contact_no
				});
				$scope.admin_name = '';
				$scope.admin_email_id = '';
				$scope.admin_contact_no = '';
			};
			$scope.selectedStudents = [];
			$scope.selectedTeachers = [];
			$scope.selectedAdmins = [];

			$log.debug("$stateParams:", $stateParams);
			$log.debug("$stateParams.selectedInstituteId:",
					$stateParams.selectedInstituteId);

			$scope.selectedInstituteId = $stateParams.selectedInstituteId;
			$scope.addInstituteAdmins = function() {
				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.addInstituteAdmins($scope.Institute.id,
						$scope.selectedAdmins).then(function(msgBean) {
					$log.debug("No3");
					
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showAdminSavedToast();
					$scope.cancelButton();
				});
				$log.debug("No4");
			}
			$scope.addInstituteTeachers = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.addInstituteTeachers($scope.Institute.id,
						$scope.selectedTeachers).then(function(msgBean) {
					$log.debug("No3");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showTeacherSavedToast();
					$scope.cancelButton();
				});

				$log.debug("No4");
							}
			$scope.addInstituteStudents = function() {
				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.addInstituteStudents($scope.Institute.id,
						$scope.selectedStudents).then(function(msgBean) {
					$log.debug("No3");
					$log.debug("msgBean.msg:" + msgBean.msg);
					$scope.showStudentSavedToast();
					$scope.cancelButton();
				});

				$log.debug("No4");
			}
			$scope.showselectedInstitute = function() {
				var InstituteService = appEndpointSF.getInstituteService();
				InstituteService.getInstituteById($scope.selectedInstituteId)
						.then(function(institutes) {
							$scope.Institute = institutes[0];
						});
			}
			$scope.showselectedInstitute();
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
