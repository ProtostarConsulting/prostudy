angular
		.module("prostudyApp")
		.controller(
				"reportBySubjectClassCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state, standardList, $filter, subjectList) {

					$log.debug("Inside attendanceReportBySubjectClassCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
				    
					$scope.standards = [ {} ];
					$scope.standards = standardList;
					$scope.subjects = [ {} ];
					$scope.subjects = subjectList;
					
					$scope.selectedSubject;
					$scope.selectedStandard;
					
					$scope.present;
					$scope.absent;
					var presentCount = 0;
					var absentCount = 0;
					var totalStudents;
					
					$scope.newPresentCount = 0;
					$scope.newAbsentCount = 0;

					$scope.newStudList = [];
					
				
					$scope.getAttendanceByInstitute = function() {

						var AttendanceService = appEndpointSF
								.getAttendanceService();
						AttendanceService
								.getAttendanceByInstitute($scope.curUser.instituteID)
								.then(
										function(students) {
											$scope.studentList = students;
										
											for (var i = 0; i < $scope.studentList.length; i++) {
												if ($scope.studentList[i].subject == $scope.selectedSubject) {
													if ($scope.studentList[i].standard == $scope.selectedStandard) {
														$scope.newStudList.push($scope.studentList[i]);
														
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
							$scope.selectedStandard = "";
							$scope.selectedSubject = "";
							$scope.newStudList.splice(0,$scope.newStudList.length);
							$scope.newPresentCount = 0;
							$scope.newAbsentCount = 0;
							presentCount = 0;
							absentCount = 0;
						
						}
				

				      $scope.loadChart();
			

				});