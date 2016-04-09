angular
		.module("prostudyApp")
		.controller(
				"reportBySubjectClassCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state, $filter) {

					$log.debug("Inside attendanceReportBySubjectClassCtr");
					$scope.curUser = appEndpointSF.getLocalUserService()
					.getLoggedinUser();
				
					
					$scope.standards = [];
					$scope.divisions = []; 
					$scope.subjects = []; 
					
					$scope.selectedStdID;
					$scope.stdList;
					$scope.divList;
					$scope.subList;
					
					$scope.selectedSubject;
					$scope.selectedStandard;
					$scope.selectedDivision;
					
					$scope.present;
					$scope.absent;
					var presentCount = 0;
					var absentCount = 0;
					var totalStudents;
					
					$scope.newPresentCount = 0;
					$scope.newAbsentCount = 0;

					$scope.newStudList = [];
					
					$scope.getStandardByInstitute = function() {

						var StandardService = appEndpointSF
								.getStandardService();
						StandardService.getStandardByInstitute($scope.curUser.instituteID).then(
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
							if($scope.selectedStandard == $scope.stdList[i].name)
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
							if($scope.selectedDivision == $scope.divList[i].name)
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
					
					
					
				
					$scope.getAttendanceByInstitute = function() {

						var AttendanceService = appEndpointSF
								.getAttendanceService();
						AttendanceService
								.getAttendanceByInstitute($scope.curUser.instituteID)
								.then(
										function(students) {
											$scope.studentList = students;
											$log.debug("$scope.studentList :"+angular.toJson($scope.studentList));
											for (var i = 0; i < $scope.studentList.length; i++) {
												
													if ($scope.studentList[i].standard == $scope.selectedStandard) {
														if($scope.studentList[i].division == $scope.selectedDivision){
															if($scope.studentList[i].subject == $scope.selectedSubject){
																
																$scope.newStudList.push($scope.studentList[i]);
																}
															
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
						$scope.attendanceReportClassForm.$setPristine();
						$scope.attendanceReportClassForm.$setValidity();
						$scope.attendanceReportClassForm.$setUntouched();
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
							$scope.selectedDivision = "";
							$scope.selectedSubject = "";
							$scope.newStudList.splice(0,$scope.newStudList.length);
							$scope.newPresentCount = 0;
							$scope.newAbsentCount = 0;
							presentCount = 0;
							absentCount = 0;
						
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
				

				      $scope.loadChart();
			

				});