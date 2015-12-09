angular.module("prostudyApp").controller(
		"instituteAddCtr",
		function($scope, $window, $mdToast, $timeout, $mdSidenav, $mdUtil,
				$log, $q, appEndpointSF) {

			$scope.showSavedToast = function() {
				$mdToast.show($mdToast.simple().content('Institute Saved!')
						.position("top").hideDelay(3000));
			};

			$scope.tempInstitute = {
				name : "",
				email_id : "",
				phone_no : "",
				address : ""
			};
			$scope.institutes = [];

			$scope.addInstitute = function() {
				$log.debug("No1");
				var InstituteService = appEndpointSF.getInstituteService();
				
				InstituteService.addInstitute($scope.tempInstitute).then(
						function(msgBean) {
							$log.debug("No6");
							$log.debug("Inside Ctr addInstitute");
							$log.debug("msgBean.msg:" + msgBean.msg);
							$scope.showSavedToast();
							$scope.tempInstitute = {
								name : "",
								email_id : "",
								phone_no : "",
								address : ""
							};
						});
				$log.debug("No4");
			}

			$scope.getInstitutes = function() {
				// $scope.students =
				// appEndpointSF.getStudentService().getStudents();
				var InstituteService = appEndpointSF.getInstituteService();

				InstituteService.getInstitutes().then(function(instituteList) {
					$log.debug("Inside Ctr getInstitutes");
					$scope.institutes = instituteList;
				});
			}

		});
