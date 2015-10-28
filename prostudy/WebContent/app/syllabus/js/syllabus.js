angular.module("prostudyApp").controller(
		"syllabusCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, tableTestDataFactory, $state) {

			$scope.addSyllabus = function() {
				$state.go("syllabus.addsyllabus", {});
			}
			$scope.syllabus="";
		
			$scope.addContent=function(){
				$log.debug("value: "+ $scope.syllabus);
			}
			
			
			
			$scope.view = function() {
				if ($scope.board == 1 && $scope.std == 1 && $scope.sbj == 1) {

					$state.go("syllabus.cbse8thenglish", {});

				} else if ($scope.board == 1 && $scope.std == 1
						&& $scope.sbj == 2) {

					$state.go("syllabus.cbse8thmath", {});

				} else if ($scope.board == 1 && $scope.std == 1
						&& $scope.sbj == 3) {

					$state.go("syllabus.cbse8thscience", {});
				}

				else if ($scope.board == 1 && $scope.std == 2
						&& $scope.sbj == 1) {

					$state.go("syllabus.cbse9thenglish", {});

				} else if ($scope.board == 1 && $scope.std == 2
						&& $scope.sbj == 2) {

					$state.go("syllabus.cbse9thmath", {});

				} else if ($scope.board == 1 && $scope.std == 2
						&& $scope.sbj == 3) {

					$state.go("syllabus.cbse9thscience", {});
				}

				else if ($scope.board == 1 && $scope.std == 3
						&& $scope.sbj == 1) {

					$state.go("syllabus.cbse10thenglish", {});

				} else if ($scope.board == 1 && $scope.std == 3
						&& $scope.sbj == 2) {

					$state.go("syllabus.cbse10thmath", {});

				} else if ($scope.board == 1 && $scope.std == 3
						&& $scope.sbj == 3) {

					$state.go("syllabus.cbse10thscience", {});
				}

				else if ($scope.board == 2 && $scope.std == 1
						&& $scope.sbj == 1) {

					$state.go("syllabus.sb8thenglish", {});

				} else if ($scope.board == 2 && $scope.std == 1
						&& $scope.sbj == 2) {

					$state.go("syllabus.sb8thmath", {});

				} else if ($scope.board == 2 && $scope.std == 1
						&& $scope.sbj == 3) {

					$state.go("syllabus.sb8thscience", {});
				}

				else if ($scope.board == 2 && $scope.std == 2
						&& $scope.sbj == 1) {

					$state.go("syllabus.sb9thenglish", {});

				} else if ($scope.board == 2 && $scope.std == 2
						&& $scope.sbj == 2) {

					$state.go("syllabus.sb9thmath", {});

				}else if ($scope.board == 2 && $scope.std == 2
						&& $scope.sbj == 3) {

					$state.go("syllabus.sb9thscience", {});
				}

				else if ($scope.board == 2 && $scope.std == 3
						&& $scope.sbj == 1) {

					$state.go("syllabus.sb10thenglish", {});

				} else if ($scope.board == 2 && $scope.std == 3
						&& $scope.sbj == 2) {

					$state.go("syllabus.sb10thmath", {});

				} else if ($scope.board == 2 && $scope.std == 3
						&& $scope.sbj == 3) {

					$state.go("syllabus.sb10thscience", {});
				}

				else if ($scope.board == 3 && $scope.std == 1
						&& $scope.sbj == 1) {

					$state.go("syllabus.icse8thenglish", {});

				} else if ($scope.board == 3 && $scope.std == 1
						&& $scope.sbj == 2) {

					$state.go("syllabus.icse8thmath", {});

				} else if ($scope.board == 3 && $scope.std == 1
						&& $scope.sbj == 3) {

					$state.go("syllabus.icse8thscience", {});
				} else if ($scope.board == 3 && $scope.std == 2
						&& $scope.sbj == 1) {

					$state.go("syllabus.icse9thenglish", {});

				} else if ($scope.board == 3 && $scope.std == 2
						&& $scope.sbj == 2) {

					$state.go("syllabus.icse9thmath", {});

				} else if ($scope.board == 3 && $scope.std == 2
						&& $scope.sbj == 3) {

					$state.go("syllabus.icse9thscience", {});
				} else if ($scope.board == 3 && $scope.std == 3
						&& $scope.sbj == 1) {

					$state.go("syllabus.icse10thenglish", {});

				} else if ($scope.board == 3 && $scope.std == 3
						&& $scope.sbj == 2) {

					$state.go("syllabus.icse10thmath", {});

				} else if ($scope.board == 3 && $scope.std == 3
						&& $scope.sbj == 3) {

					$state.go("syllabus.icse10thscience", {});
				}

			}
			
			$scope.tempStudent = {firstName: "", lastName: "",phone_no:"",email:"",city:"",state:"",pin:""};
			$scope.students = []; 
			
			$scope.addStudent = function(){
				$log
				.debug("No1");	
				var studentService = appEndpointSF.getStudentService();
				//$scope.students = studentService.addStudent($scope.tempStudent);
										
				studentService.addStudent($scope.tempStudent)
				.then(
						function(msgBean) {
							$log
							.debug("No6");	
							$log
									.debug("Inside Ctr addStudent");
							$log
							.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
							$scope.tempStudent = {firstName: "", lastName: "",phone_no:"",email:"",city:"",state:"",pin:""};
						});
				$log
				.debug("No4");	
			}
			
			$scope.getStudents = function(){
				//$scope.students = appEndpointSF.getStudentService().getStudents();
				var studentService = appEndpointSF.getStudentService();					
										
				studentService.getStudents()
				.then(
						function(studList) {
							$log
									.debug("Inside Ctr getStudents");
							$scope.students = studList;
						});
			}

		});
