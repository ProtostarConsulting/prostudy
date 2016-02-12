angular
		.module("prostudyApp")
		.controller(
				"reportByStudentCtr",
				function($scope, $window, $mdToast, $timeout, $mdSidenav,
						$mdUtil, $log, objectFactory, appEndpointSF, $state, $filter) {

					$log.debug("Inside reportByStudentCtr");
				
				
					
					$scope.selectedInstitute;
					$scope.selectedInstituteID;
				
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
					
					$scope.fromDate = new Date();
					$scope.toDate = new Date();
					
					$scope.showDateValue = function() {
						console.log("in side showDateValue");
						
					}
					
					$scope.getAllDates = function()
					{
						
						 Date.prototype.addDays = function(days) {
						       var dat = new Date(this.valueOf())
						       dat.setDate(dat.getDate() + days);
						       return dat;
						   }

						   function getDates(startDate, stopDate) {
						      var dateArray = new Array();
						      var currentDate = startDate;
						      while (currentDate <= stopDate) {
						        dateArray.push(currentDate)
						        currentDate = currentDate.addDays(1);
						      }
						      return dateArray;
						    }

						var dateArray = getDates($scope.fromDate,$scope.toDate);
					    $log.debug("dateArray :" + dateArray);
					}
					
		
					
					
				
					$scope.getInstituteStudents = function() {
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

											$scope.getAllDates();
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
										
											var date = new Date($scope.fromDate).toDateString("dd-mm-yyyy");
											$log.debug("date111 :"+date);
											var date = $filter($scope.fromDate)(Date.parse('dd-MM-yyyy'));
											$log.debug("date222 :"+date);
											/*var date = $filter($scope.fromDate)(Date.now(), 'dd-MM-yyyy')
											$log.debug("date333 :"+date);*/
											if($scope.fromDate == "2016-02-09T13:22:07.931Z")
											{
												$log.debug("True");
											}
											
										});
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