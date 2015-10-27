angular.module("prostudyApp").controller(
		"instituteEditCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.selected = [];

			$scope.tempInstitute = {name: "", email_id: "", phone_no:"", address:""};
			$scope.institutes = []; 
			
			$scope.addInstitute = function(){
				$log
				.debug("No1");	
				var InstituteService = appEndpointSF.getInstituteService();
				//$scope.students = studentService.addStudent($scope.tempStudent);
										
				InstituteService.addInstitute($scope.tempInstitute)
				.then(
						function(msgBean) {
							$log
							.debug("No6");	
							$log
									.debug("Inside Ctr addInstitute");
							$log
							.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempInstitute = {name: "", email_id: "", phone_no:"", address:""};
						});
				$log
				.debug("No4");	
			}
			
			$scope.getInstitutes = function(){
				//$scope.students = appEndpointSF.getStudentService().getStudents();
				var InstituteService = appEndpointSF.getInstituteService();					
										
				InstituteService.getInstitutes()
				.then(
						function(instituteList) {
							$log
									.debug("Inside Ctr getInstitutes");
							$scope.institutes = instituteList;
						});
			}

			$scope.editingData = [];

			$scope.modify = function(selectedInstitute) {
				$scope.editingData[selectedInstitute.name] = true;
				$scope.institute = selectedInstitute;
			};

			$scope.update = function(institutes) {
				$scope.editingData[institutes.name] = false;
			};// end of update

			$scope.removeInstitute = function(index) {
			
				 $scope.institutes.splice(index, 1);
			}; // end of remove
			
			$scope.getInstitutes();

		});
