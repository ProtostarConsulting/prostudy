angular.module("prostudyApp").controller(
		"studentPageCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, objectFactory, appEndpointSF, tableTestDataFactory,
				appEndpointSF) {

			$scope.showSimpleToast = function() {
				$mdToast.show($mdToast.simple().content('Student Data Saved!')
						.position("top").hideDelay(3000));
			};

			$log.debug("Inside studentPageCtr");

			//$scope.text = "Present" ;
			$scope.institutes = [];
			$scope.institute1 = {};

			$scope.getInstitutes = function() {

				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.getInstitutes().then(function(instituteList) {
					$log.debug("Inside Ctr getInstitutes");
					$scope.institutes = instituteList;
				});
			}

			$scope.getInstitutes();
			// end for institute

			// start of student   
			$scope.tempStudent = {
				ID :"",
				firstName : "",
				lastName : "",
				institute : "",
				studClass :"",
				phone_no : "",
				email : "",
				city : "",
				state : "",
				pin : "",
				attendance : ""
			};
			$scope.students = [];

			$scope.addStudent = function() {
				$log.debug("No1");
				var studentService = appEndpointSF.getStudentService();

				studentService.addStudent($scope.tempStudent).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addStudent");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSimpleToast();
							$scope.tempStudent = {
								id :"",
								firstName : "",
								lastName : "",
								institute : "",
								studClass :"",
								phone_no : "",
								email : "",
								city : "",
								state : "",
								pin : "",
								attendance : ""
							};
						});
				$log.debug("No4");
			}

		
			// end of student

		});