angular
		.module("prostudyApp")
		.controller(
				"studentListPageCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, $q, $mdDialog, $mdMedia,
						tableTestDataFactory, appEndpointSF) {
					console.log("Inside studentListPageCtr");

					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'Scheduled Exam Assigned to Student!').position("top").hideDelay(
								3000));
					};
					$scope.query = {
						order : 'description',
						limit : 5,
						page : 1
					};

					// $scope.curUser=appEndpointSF.getLocalUserService().getLoggedinUser();
					$scope.students = [];

					$scope.getStudentsByInstitute = function() {

						var UserService = appEndpointSF.getUserService();
						UserService
								.getUserByInstitute($scope.curUser.instituteID)
								.then(
										function(studentList) {
											$scope.newStudents = studentList;

											for (var i = 0; i < $scope.newStudents.length; i++) {
												if ($scope.newStudents[i].role == "Student") {
													$scope.students
															.push($scope.newStudents[i]);
													;

												}
											}

										});
					}

					$scope.getPartnerSchoolByInstitute = function() {
						var PartnerSchoolService = appEndpointSF
								.getPartnerSchoolService();

						PartnerSchoolService.getPartnerSchoolByInstitute(
								$scope.curUser.instituteID).then(
								function(pSchoolList) {

									$scope.pSchoolList = pSchoolList;
								});
					}

					$scope.getScheduledExamByInstitute = function() {

						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService.getScheduledExamByInstitute(
								$scope.curUser.instituteID).then(
								function(scheduledExamList) {
									$scope.scheduledExams = scheduledExamList;

								});
					}
					$scope.examtitle;
					$scope.getStudentByExam = function() {

						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService.getStudentByExam(
								$scope.examStudent).then(
								function(examStudentList) {
									$scope.examStudentList = examStudentList;

								});
					}

					$scope.assignExamToStudentObj = {
						selectedStudents : '',
						selectedExam : ''
					}

					$scope.selected = "";
					$scope.selectedExam = "";

					$scope.assignExamToStudent = function() {
						// $("studentListDiv").hide();
						// $("assignExamDiv").show();
						$scope.assignExamToStudentObj.selectedExam = $scope.selectedExam[0].id;
						var ScheduledExamService = appEndpointSF
								.getScheduledExamService();
						ScheduledExamService.assignExamToStudent(
								$scope.assignExamToStudentObj).then(
								function(msgBean) {

								});
						$scope.tempScheduledExam = {};
						$scope.showSavedToast();
						// $state.go("", {});

					}

					$scope.waitForServiceLoad = function() {
						if (appEndpointSF.is_service_ready) {

							if ($scope.examStudent != undefined) {
								$scope.getStudentByExam();
							} else {
								$scope.getStudentsByInstitute();
								$scope.getPartnerSchoolByInstitute();
								$scope.getScheduledExamByInstitute();
							}
						} else {
							$log.debug("Services Not Loaded, watiting...");
							$timeout($scope.waitForServiceLoad, 1000);
						}
					}

					$scope.waitForServiceLoad();

					$scope.openPopUp = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogController,
											templateUrl : '/app/student/uploadFile.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen,
											locals : {

											}
										})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});
					};

					function DialogController($scope, $mdDialog) {
						$scope.loding = false;
						$scope.uplodeFile = function() {
							$scope.loding = true;
							document.uploadFileForm.action = $scope.StudentCSVUploadURL;
							document.uploadFileForm.submit();
						}

						$scope.getStudentCSVUploadURL = function() {
							var uploadUrlService = appEndpointSF
									.getuploadURLService();
							uploadUrlService.getStudentCSVUploadURL().then(
									function(url) {
										$scope.StudentCSVUploadURL = url.msg;
										$scope.bizID = curuser.business.id;
									});

						}
						$scope.StudentCSVUploadURL;

						$scope.waitForServiceLoadCSV = function() {
							if (appEndpointSF.is_service_ready) {
								$scope.getStudentCSVUploadURL();
							} else {
								$log.debug("Services Not Loaded, watiting...");
								$timeout($scope.waitForServiceLoadCSV, 1000);
							}
						}
						$scope.waitForServiceLoadCSV();

						$scope.hide = function() {
							$mdDialog.hide();
						};
					}
				});