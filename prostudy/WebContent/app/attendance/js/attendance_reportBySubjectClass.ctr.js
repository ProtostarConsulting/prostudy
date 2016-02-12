angular
		.module("prostudyApp")
		.controller(
				"reportBySubjectClassCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state, standardList, $filter) {

					$log.debug("Inside attendanceReportBySubjectClassCtr");
				
				    
					$scope.standards = [{}];
					$scope.standards = standardList;
					$scope.selectedSubject;
					$scope.selectedClass;
					$scope.selectedInstitute;
					$scope.selectedInstituteID;
					$scope.selectedSubject;
					$scope.selected;
					
					$scope.present;
					$scope.absent;
					var presentCount = 0;
					var absentCount = 0;
					var totalStudents;
					
					$scope.newPresentCount = 0;
					$scope.newAbsentCount = 0;

					$scope.newStudList = [];
					
					$scope.instituteList = [ "mit", "seed", "niit" ];
					
					$scope.getReport = function() {
						var InstituteService = appEndpointSF
								.getInstituteService();
						InstituteService
								.getInstitutes()
								.then(
										function(instituteList) {
											$log.debug("Inside Ctr getInstitutes");
											$scope.institutes = instituteList;
											for (i = 0; i < $scope.institutes.length; i++) {
												if ($scope.selectedInstitute == $scope.institutes[i].name) {
													$scope.selectedInstituteID = $scope.institutes[i].id;
													$log.debug("$scope.selectedInstituteID :"
																	+ $scope.selectedInstituteID);
												}
											}

											$scope.getAttendanceByInstitute();

										});

					}

					$scope.getAttendanceByInstitute = function() {

						var AttendanceService = appEndpointSF
								.getAttendanceService();
						AttendanceService
								.getAttendanceByInstitute(
										$scope.selectedInstituteID)
								.then(
										function(students) {
											$scope.studentList = students;
										
											for (var i = 0; i < $scope.studentList.length; i++) {
												if ($scope.studentList[i].subject == $scope.selectedSubject) {
													if ($scope.studentList[i].standard == $scope.selectedClass) {
														$scope.newStudList
																.push($scope.studentList[i]);
														
													}

												}
											}
											totalStudents = $scope.newStudList.length;
											for (var i = 0; i < $scope.newStudList.length; i++) {
												if ($scope.newStudList[i].attendance == true) {
													$scope.present = $scope.newStudList[i];
													presentCount++;

												} else {
													$scope.absent = $scope.newStudList[i];
													absentCount++;

												}
											}
										
											$scope.newPresentCount = ((presentCount / totalStudents) * 100);
											$scope.newAbsentCount = ((absentCount / totalStudents) * 100);
											
										});

					/*	$scope.show = function() {
							$state.go('attendance.reportDisplay', {
								sourceSate : "attendance.report",
								newPresentCount : newPresentCount,
								newAbsentCount : newAbsentCount
							});
						};*/
					}
					
					
					$scope.loadChart = function() {
						google.charts.load('43', {packages: ['corechart']});
						google.charts.setOnLoadCallback(drawChart);						
					} 
					
					$scope.dataListFromServer = [
									          ['Attendance', 'Percentage'],
									          ['Present students',  0],
									          ['Absent students',   0],
									          
									        ];
					
					
					$scope.getNewDataFromServer = function() {
						
						$scope.dataListFromServer = [
											          ['Attendance', 'Percentage'],
											          ['Present students', $scope.newPresentCount],
											          ['Absent students', $scope.newAbsentCount],
											          
											        ];
						
						drawChart();
						$scope.clear();
					}
					 
				      function drawChart() {

				        var data = google.visualization.arrayToDataTable($scope.dataListFromServer);

				        var options = {
				          title: 'Attendance Report',
				          is3D: true,
				        };

				        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
				        chart.draw(data, options);
				      }
				      
				  	
						$scope.clear = function() {
							
							$scope.selectedInstitute = "";
							$scope.selectedClass = "";
							$scope.selectedSubject = "";
							$scope.newStudList.splice(0,$scope.newStudList.length);
							$scope.newPresentCount = 0;
							$scope.newAbsentCount = 0;
							presentCount = 0;
							absentCount = 0;
						
						}
				

				      $scope.loadChart();
			

				});