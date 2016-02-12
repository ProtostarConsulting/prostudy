angular
		.module("prostudyApp")
		.controller(
				"attendanceAddCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF,$filter,standardList,$state) {

					$log.debug("Inside attendanceAddCtr");
					$scope.showSavedToast = function() {
						$mdToast.show($mdToast.simple().content(
								'attendance Saved!').position("top").hideDelay(
								3000));
					};

					$scope.standards = [{}];
					$scope.standards = standardList;
				
					$scope.instituteList = [ "mit", "seed", "niit" ];
				
					$scope.curdate = $filter("date")(Date.now(), 'dd-MM-yyyy')
					
					
					
					$scope.student1 = {};
					$scope.IDList = [];
					$scope.isActive = false;
					$scope.selectedID;
					$scope.selectedStud;
					$scope.selectedSubject;
					$scope.selectedClass;
					$scope.selectedInstitute;
					$scope.instiID;
					$scope.firstName;
					$scope.lastName;
					
					$scope.attendanceRecordList = [];
					$scope.newStudentList = [];
					$scope.institute1 = [ "mit", "seed" ];

					$scope.getInstitutes = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService.getInstitutes().then(
								function(instituteList) {
									$log.debug("Inside Ctr getInstitutes");
									$scope.institutes = instituteList;

									$log.debug("$scope.institutes_len :"
											+ $scope.institutes.length);

								});

					}
					$scope.getInstitutes();

					$scope.getStudents = function() {

						var studentService = appEndpointSF.getStudentService();

						// standard, class/subject

						// studentService.getStudentByInst(instID, standard);
						studentService.getStudents().then(function(studList) {
							$log.debug("Inside Ctr getStudents");
							$scope.students = studList;

							/*
							 * for(var i=0; i< studList.length; i++){
							 * $scope.attendanceRecordList.push($scope.getAttendanceRecord(studList[i].id)); }
							 */
						});

					}

					$scope.getStudents();

					$scope.showselectedStudent = function() {
						var StudentService = appEndpointSF.getStudentService();
						StudentService
								.getStudentByInstitute($scope.selectedInstitute)
								.then(
										function(students) {
											$scope.studentList = students;
										
											for (i = 0; i < $scope.studentList.length; i++) {
												if ($scope.studentList[i].standard == $scope.selectedClass) {
													$scope.newStudentList.push($scope.studentList[i]);

												}

											}

											for (i = 0; i < $scope.institutes.length; i++) {
												if ($scope.institutes[i].name == $scope.selectedInstitute) {
													$scope.instiID = $scope.institutes[i].id;
													
												}

											}

											
											for (var i = 0; i < $scope.newStudentList.length; i++) {
												$scope.attendanceRecordList
														.push($scope
																.getAttendanceRecord($scope.newStudentList[i].id));
												$scope.firstName = $scope.newStudentList[i].firstName;
												$scope.lastName = $scope.newStudentList[i].lastName;
												
											}
											
										});
					}

					$scope.getAttendanceRecord = function(studID) {

						return {
							studID : studID,
							firstName : $scope.firstName,
							lastName : $scope.lastName,
							instituteID : $scope.instiID,
							standard : $scope.selectedClass,
							subject : $scope.selectedSubject,
							date : new Date(),
							attendance : true,
						// institute:$scope.instiID

						};
					}

					$scope.toggleAttendance = function(index) {
						$scope.attendanceRecordList[index].attendance = !$scope.attendanceRecordList[index].attendance;
						$log.debug("$scope.attendanceRecordList :"
								+ angular.toJson($scope.attendanceRecordList));
					}

					$scope.submitAttendance = function() {

						var AttendanceService = appEndpointSF
								.getAttendanceService();
						for (i = 0; i < $scope.attendanceRecordList.length; i++) {
							AttendanceService.addAttendance(
									$scope.attendanceRecordList[i]).then(
									function(msgBean) {

										$log.debug("msgBean.msg:"
														+ msgBean.msg);
										

									});
						}
						$scope.showSavedToast();

					}

					$scope.isActive = false;


					$scope.students = [];

					$scope.toggleActive = function() {
						$scope.isActive = !$scope.isActive;
					};
					
					$scope.cancel = function()
					{
						$state.go('attendance');
					}
					

				});